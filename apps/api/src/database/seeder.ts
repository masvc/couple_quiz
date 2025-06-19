import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsersService } from '../users/users.service';
import { CouplesService } from '../couples/couples.service';
import { QuestionsService } from '../questions/questions.service';
import { ResponsesService } from '../responses/responses.service';
import { Gender } from '../users/entities/user.entity';
import { QuestionType } from '../questions/entities/question.entity';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  const usersService = app.get(UsersService);
  const couplesService = app.get(CouplesService);
  const questionsService = app.get(QuestionsService);
  const responsesService = app.get(ResponsesService);

  console.log('🌱 サンプルデータを投入開始...');

  try {
    // 1. ユーザー作成
    console.log('👥 ユーザーを作成中...');
    const users = await Promise.all([
      // カップル1
      usersService.create({
        name: '田中太郎',
        age: 28,
        gender: Gender.MALE,
        location: '東京都渋谷区'
      }),
      usersService.create({
        name: '佐藤花子',
        age: 26,
        gender: Gender.FEMALE,
        location: '東京都新宿区'
      }),
      
      // カップル2
      usersService.create({
        name: '山田健一',
        age: 32,
        gender: Gender.MALE,
        location: '大阪府大阪市北区'
      }),
      usersService.create({
        name: '鈴木美咲',
        age: 29,
        gender: Gender.FEMALE,
        location: '大阪府大阪市中央区'
      }),
    ]);

    console.log(`✅ ${users.length}人のユーザーを作成しました`);

    // 2. カップル作成
    console.log('💕 カップルを作成中...');
    const couples = await Promise.all([
      couplesService.create({
        male_user_id: users[0].id,
        female_user_id: users[1].id,
        start_date: '2024-06-01',
        current_day: 3
      }),
      couplesService.create({
        male_user_id: users[2].id,
        female_user_id: users[3].id,
        start_date: '2024-05-15',
        current_day: 20
      }),
    ]);

    console.log(`✅ ${couples.length}組のカップルを作成しました`);

    // 3. マニュアル質問作成
    console.log('❓ マニュアル質問を作成中...');
    const questions = await Promise.all([
      questionsService.create({
        question_text: '好きな食べ物は何ですか？',
        question_type: QuestionType.MANUAL,
        category: '基本情報',
        manual_order: 1
      }),
      questionsService.create({
        question_text: '休日の過ごし方を教えてください',
        question_type: QuestionType.MANUAL,
        category: 'ライフスタイル',
        manual_order: 2
      }),
      questionsService.create({
        question_text: '子供の頃の夢は何でしたか？',
        question_type: QuestionType.MANUAL,
        category: '過去・思い出',
        manual_order: 3
      }),
      questionsService.create({
        question_text: '最も大切にしている価値観は？',
        question_type: QuestionType.MANUAL,
        category: '価値観',
        manual_order: 4
      }),
      questionsService.create({
        question_text: 'ストレス発散方法は？',
        question_type: QuestionType.MANUAL,
        category: 'メンタルヘルス',
        manual_order: 5
      }),
    ]);

    console.log(`✅ ${questions.length}個の質問を作成しました`);

    // 4. AI生成質問作成
    console.log('🤖 AI生成質問を作成中...');
    const aiQuestions = await Promise.all([
      questionsService.create({
        question_text: '東京でのデートで、渋谷と新宿どちらが好みですか？その理由も教えてください',
        question_type: QuestionType.AI_GENERATED,
        category: 'AI-地域密着',
        ai_context: '田中太郎&佐藤花子の住所情報（渋谷区・新宿区）を基に生成'
      }),
      questionsService.create({
        question_text: '大阪のお好み焼きと東京のもんじゃ焼き、どちらがお互いに食べさせたいですか？',
        question_type: QuestionType.AI_GENERATED,
        category: 'AI-地域密着',
        ai_context: '山田健一&鈴木美咲の関西在住情報を基に生成'
      }),
    ]);

    console.log(`✅ ${aiQuestions.length}個のAI生成質問を作成しました`);

    // 5. サンプル回答作成
    console.log('💬 サンプル回答を作成中...');
    const responses = await Promise.all([
      // カップル1の回答
      responsesService.create({
        couple_id: couples[0].id,
        question_id: questions[0].id,
        user_id: users[0].id,
        answer: 'ラーメンと寿司が大好きです！特に豚骨ラーメンと新鮮なサーモンの寿司がたまりません。',
        comment: '花子ちゃんとグルメ巡りしたいな♪',
        response_date: '2024-06-01'
      }),
      responsesService.create({
        couple_id: couples[0].id,
        question_id: questions[0].id,
        user_id: users[1].id,
        answer: 'パスタとスイーツが好きです。特にカルボナーラとティラミスは絶品です♡',
        comment: '今度一緒にイタリアンレストラン行こう！',
        response_date: '2024-06-01'
      }),

      // カップル2の回答
      responsesService.create({
        couple_id: couples[1].id,
        question_id: questions[0].id,
        user_id: users[2].id,
        answer: 'お好み焼きとたこ焼きは関西人の魂です！あと、牛肉も大好きです。',
        comment: '美咲ちゃんと大阪グルメ巡りしよう',
        response_date: '2024-05-15'
      }),
      responsesService.create({
        couple_id: couples[1].id,
        question_id: questions[0].id,
        user_id: users[3].id,
        answer: '和食全般が好きです。特に煮物とお味噌汁は心が落ち着きます。',
        comment: '健一さんと一緒に料理したいです',
        response_date: '2024-05-15'
      }),
    ]);

    console.log(`✅ ${responses.length}個のサンプル回答を作成しました`);

    console.log(`
🎉 サンプルデータの投入が完了しました！

📊 作成されたデータ:
- ユーザー: ${users.length}人
- カップル: ${couples.length}組
- マニュアル質問: ${questions.length}個
- AI生成質問: ${aiQuestions.length}個
- 回答: ${responses.length}個

🔗 生成されたID:
- ユーザーID: ${users.map(u => u.id).join(', ')}
- カップルID: ${couples.map(c => c.id).join(', ')}
- 質問ID: ${questions.map(q => q.id).join(', ')}
    `);

  } catch (error) {
    console.error('❌ エラーが発生しました:', error);
  } finally {
    await app.close();
  }
}

seed().catch(console.error);
