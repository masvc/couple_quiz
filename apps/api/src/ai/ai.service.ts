
// src/ai/ai.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OpenAI } from 'openai';
import { Couple } from '../couples/entities/couple.entity';
import { Question, QuestionType } from '../questions/entities/question.entity';
import { Response } from '../responses/entities/response.entity';
import { User } from '../users/entities/user.entity';

export interface AIQuestionContext {
  couple: Couple;
  responses: Response[];
  currentDay: number;
}

@Injectable()
export class AiService {
  private openai: OpenAI;

  constructor(
    private configService: ConfigService,
    @InjectRepository(Question)
    private questionsRepository: Repository<Question>,
    @InjectRepository(Response)
    private responsesRepository: Repository<Response>,
  ) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  async generateQuestion(context: AIQuestionContext): Promise<Question> {
    const prompt = this.buildPrompt(context);
    
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'あなたはカップル向けのパーソナライズされた質問を生成するAIです。カップルの情報と過去の回答を基に、関係を深める質問を作成してください。',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 200,
        temperature: 0.7,
      });

      const questionText = response.choices[0]?.message?.content?.trim();
      if (!questionText) {
        throw new Error('AI応答が空です');
      }

      // AI生成質問をデータベースに保存
      const question = this.questionsRepository.create({
        question_text: questionText,
        question_type: QuestionType.AI_GENERATED,
        category: this.determineCategory(context),
        ai_context: this.buildAIContext(context),
      });

      return await this.questionsRepository.save(question);
    } catch (error) {
      console.error('AI質問生成エラー:', error);
      throw new Error('AI質問の生成に失敗しました');
    }
  }

  private buildPrompt(context: AIQuestionContext): string {
    const { couple, responses, currentDay } = context;
    
    let prompt = `カップル情報:
- 男性: ${couple.maleUser.name} (${couple.maleUser.age}歳, ${couple.maleUser.location})
- 女性: ${couple.femaleUser.name} (${couple.femaleUser.age}歳, ${couple.femaleUser.location})
- 交際${currentDay}日目

`;

    if (responses.length > 0) {
      prompt += `過去の回答履歴:\n`;
      responses.slice(-5).forEach((response, index) => {
        const userName = response.user.name;
        prompt += `${index + 1}. 質問: ${response.question.question_text}\n`;
        prompt += `   ${userName}: ${response.answer}\n`;
        if (response.comment) {
          prompt += `   コメント: ${response.comment}\n`;
        }
        prompt += '\n';
      });
    }

    prompt += `
上記の情報を基に、このカップルに適した質問を1つ生成してください。以下の点を考慮してください:

1. 住んでいる地域の特性を活かした質問
2. 年齢に適した内容
3. 交際期間に適した深さの質問
4. 過去の回答から読み取れる興味関心
5. お互いの理解を深められる内容

質問文のみを回答してください。`;

    return prompt;
  }

  private determineCategory(context: AIQuestionContext): string {
    const { currentDay, couple } = context;
    
    // 地域が違う場合
    if (couple.maleUser.location !== couple.femaleUser.location) {
      return 'AI-地域密着';
    }
    
    // 交際期間による分類
    if (currentDay <= 30) {
      return 'AI-関係性深化';
    } else if (currentDay <= 60) {
      return 'AI-相互理解';
    } else {
      return 'AI-将来計画';
    }
  }

  private buildAIContext(context: AIQuestionContext): string {
    const { couple, currentDay } = context;
    
    return `${couple.maleUser.name}(${couple.maleUser.age}歳, ${couple.maleUser.location})&${couple.femaleUser.name}(${couple.femaleUser.age}歳, ${couple.femaleUser.location})の交際${currentDay}日目に生成`;
  }

  async analyzeCompatibility(coupleId: number): Promise<any> {
    const responses = await this.responsesRepository.find({
      where: { couple_id: coupleId },
      relations: ['question', 'user'],
    });

    // 簡単な相性分析ロジック
    const analysis = {
      totalQuestions: new Set(responses.map(r => r.question_id)).size,
      responseCount: responses.length,
      commentRate: responses.filter(r => r.comment).length / responses.length,
      categories: this.analyzeCategoryPreferences(responses),
    };

    return analysis;
  }

  private analyzeCategoryPreferences(responses: Response[]): any {
    const categoryStats = {};
    
    responses.forEach(response => {
      const category = response.question.category;
      if (!categoryStats[category]) {
        categoryStats[category] = { count: 0, totalLength: 0 };
      }
      categoryStats[category].count++;
      categoryStats[category].totalLength += response.answer.length;
    });

    return Object.entries(categoryStats).map(([category, stats]: [string, any]) => ({
      category,
      count: stats.count,
      averageLength: Math.round(stats.totalLength / stats.count),
    }));
  }
}
