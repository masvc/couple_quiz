// apps/web/src/pages/AIAnalysis.tsx
import { useState } from 'react'
import { ArrowLeft, Brain, Heart, TrendingUp, Star, Target, Lightbulb, Award } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface CompatibilityScore {
  category: string
  score: number
  description: string
  color: string
}

interface Insight {
  type: 'strength' | 'opportunity' | 'recommendation'
  title: string
  description: string
  icon: string
}

export function AIAnalysis() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'overview' | 'detailed' | 'recommendations'>('overview')

  // TODO: APIから分析結果を取得
  const analysisData = {
    overallScore: 87,
    totalQuestions: 15,
    answeredQuestions: 8,
    generatedDate: '2024-06-19',
    compatibilityScores: [
      { category: '価値観', score: 92, description: '非常に高い相性', color: 'bg-green-500' },
      { category: 'ライフスタイル', score: 85, description: '良好な相性', color: 'bg-blue-500' },
      { category: 'コミュニケーション', score: 78, description: '良好な相性', color: 'bg-purple-500' },
      { category: '将来設計', score: 90, description: '非常に高い相性', color: 'bg-pink-500' },
      { category: '趣味・嗜好', score: 82, description: '良好な相性', color: 'bg-indigo-500' }
    ] as CompatibilityScore[],
    insights: [
      {
        type: 'strength' as const,
        title: '価値観の一致',
        description: 'お二人は人生において大切にしたいことが非常に似ています。この共通の価値観が、強固な関係の基盤となっています。',
        icon: '🎯'
      },
      {
        type: 'opportunity' as const,
        title: 'コミュニケーションの向上',
        description: '日常の些細なことから将来の夢まで、もう少し積極的に話し合う時間を作ることで、さらに深い絆を築けるでしょう。',
        icon: '💬'
      },
      {
        type: 'recommendation' as const,
        title: '新しい共通体験',
        description: 'お二人とも新しいことに興味がある傾向があります。一緒に新しい趣味や体験にチャレンジしてみることをお勧めします。',
        icon: '✨'
      }
    ] as Insight[]
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-blue-600'
    if (score >= 70) return 'text-purple-600'
    return 'text-orange-600'
  }

  const getScoreBackground = (score: number) => {
    if (score >= 90) return 'from-green-500 to-emerald-500'
    if (score >= 80) return 'from-blue-500 to-indigo-500'
    if (score >= 70) return 'from-purple-500 to-pink-500'
    return 'from-orange-500 to-red-500'
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate('/app')}
          className="p-2 rounded-full hover:bg-pink-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">AI相性分析レポート</h1>
          <p className="text-gray-600">あなたたちの関係性を詳しく分析しました</p>
        </div>
      </div>

      {/* Overall Score Card */}
      <div className={`bg-gradient-to-r ${getScoreBackground(analysisData.overallScore)} rounded-2xl p-8 text-white mb-8`}>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white/20 p-3 rounded-full">
                <Brain className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">総合相性スコア</h2>
                <p className="text-lg opacity-90">
                  {analysisData.answeredQuestions}問中{analysisData.totalQuestions}問を分析 • {analysisData.generatedDate}
                </p>
              </div>
            </div>
            <div className="text-6xl font-bold mb-2">{analysisData.overallScore}%</div>
            <p className="text-xl opacity-90">
              {analysisData.overallScore >= 90 ? '素晴らしい相性です！' :
               analysisData.overallScore >= 80 ? '良好な相性です！' :
               analysisData.overallScore >= 70 ? 'バランスの取れた関係です' :
               '改善の余地があります'}
            </p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/20 p-6 rounded-full">
              <Heart className="w-16 h-16" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-4 text-sm font-semibold border-b-2 transition-colors ${
                activeTab === 'overview'
                  ? 'border-pink-500 text-pink-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              概要
            </button>
            <button
              onClick={() => setActiveTab('detailed')}
              className={`px-6 py-4 text-sm font-semibold border-b-2 transition-colors ${
                activeTab === 'detailed'
                  ? 'border-pink-500 text-pink-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              詳細分析
            </button>
            <button
              onClick={() => setActiveTab('recommendations')}
              className={`px-6 py-4 text-sm font-semibold border-b-2 transition-colors ${
                activeTab === 'recommendations'
                  ? 'border-pink-500 text-pink-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              アドバイス
            </button>
          </nav>
        </div>

        <div className="p-8">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Category Scores */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-6">カテゴリ別相性スコア</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {analysisData.compatibilityScores.map((item, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-bold text-gray-800">{item.category}</h4>
                        <span className={`text-2xl font-bold ${getScoreColor(item.score)}`}>
                          {item.score}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                        <div 
                          className={`h-2 rounded-full ${item.color}`}
                          style={{ width: `${item.score}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Insights */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-6">主要な分析結果</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {analysisData.insights.map((insight, index) => (
                    <div 
                      key={index}
                      className={`rounded-xl p-6 ${
                        insight.type === 'strength' ? 'bg-green-50 border border-green-200' :
                        insight.type === 'opportunity' ? 'bg-blue-50 border border-blue-200' :
                        'bg-purple-50 border border-purple-200'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl">{insight.icon}</span>
                        <div>
                          <div className={`text-xs font-semibold uppercase tracking-wide ${
                            insight.type === 'strength' ? 'text-green-600' :
                            insight.type === 'opportunity' ? 'text-blue-600' :
                            'text-purple-600'
                          }`}>
                            {insight.type === 'strength' ? '強み' :
                             insight.type === 'opportunity' ? '成長機会' :
                             'おすすめ'}
                          </div>
                          <h4 className="font-bold text-gray-800">{insight.title}</h4>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {insight.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'detailed' && (
            <div className="space-y-8">
              <div className="text-center py-12">
                <div className="bg-gray-100 p-4 rounded-full w-fit mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-gray-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">詳細分析</h3>
                <p className="text-gray-600">
                  より多くの質問に答えることで、詳細な分析結果を表示できます。<br />
                  現在 {analysisData.answeredQuestions}/{analysisData.totalQuestions} 問完了
                </p>
                <button
                  onClick={() => navigate('/app/question')}
                  className="mt-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-105"
                >
                  質問に答える
                </button>
              </div>
            </div>
          )}

          {activeTab === 'recommendations' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6 border border-pink-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-gradient-to-r from-pink-200 to-purple-200 p-2 rounded-full">
                    <Lightbulb className="w-5 h-5 text-pink-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">関係性向上のためのアドバイス</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">💑 コミュニケーション</h4>
                    <p className="text-sm text-gray-700">
                      毎日少しずつでも、お互いの思いや考えを共有する時間を作りましょう。些細な会話が深い絆を育みます。
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">🎯 共通目標</h4>
                    <p className="text-sm text-gray-700">
                      お二人で達成したい目標を設定してみましょう。共に働きかける体験が関係性をより強固にします。
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">✨ 新しい体験</h4>
                    <p className="text-sm text-gray-700">
                      定期的に新しい場所に行ったり、新しい活動を一緒に試すことで、関係に新鮮さを保ちましょう。
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-gradient-to-r from-indigo-200 to-blue-200 p-2 rounded-full">
                    <Target className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">次のステップ</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-indigo-100 text-indigo-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</div>
                    <span className="text-gray-800">残りの質問に回答して、より詳細な分析を受ける</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-indigo-100 text-indigo-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</div>
                    <span className="text-gray-800">パートナーと分析結果について話し合う</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-indigo-100 text-indigo-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</div>
                    <span className="text-gray-800">アドバイスを参考に、関係性向上に取り組む</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid md:grid-cols-2 gap-6">
        <button
          onClick={() => navigate('/app/question')}
          className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white p-6 rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all transform hover:scale-105"
        >
          <Star className="w-6 h-6" />
          さらに質問に答える
        </button>
        <button
          onClick={() => navigate('/app/compare')}
          className="bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white p-6 rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all transform hover:scale-105"
        >
          <Award className="w-6 h-6" />
          回答を比較する
        </button>
      </div>
    </div>
  )
}