// apps/web/src/pages/CompareAnswers.tsx
import { useState } from 'react'
import { ArrowLeft, Heart, MessageCircle, Calendar, Users, CheckCircle, XCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface Answer {
  id: number
  userId: number
  userName: string
  answer: string
  comment?: string
  responseDate: string
}

interface QuestionComparison {
  questionId: number
  questionText: string
  category: string
  answers: Answer[]
  isMatching: boolean
}

export function CompareAnswers() {
  const navigate = useNavigate()
  const [selectedQuestion, setSelectedQuestion] = useState<number>(0)

  // TODO: APIからデータを取得
  const comparisons: QuestionComparison[] = [
    {
      questionId: 1,
      questionText: '好きな食べ物は何ですか？',
      category: '基本情報',
      isMatching: false,
      answers: [
        {
          id: 1,
          userId: 1,
          userName: '田中太郎',
          answer: 'ラーメンと寿司が大好きです！特に豚骨ラーメンと新鮮なサーモンの寿司がたまりません。',
          comment: '花子ちゃんとグルメ巡りしたいな♪',
          responseDate: '2024-06-01'
        },
        {
          id: 2,
          userId: 2,
          userName: '佐藤花子',
          answer: 'パスタとスイーツが好きです。特にカルボナーラとティラミスは絶品です♡',
          comment: '今度一緒にイタリアンレストラン行こう！',
          responseDate: '2024-06-01'
        }
      ]
    },
    {
      questionId: 2,
      questionText: '休日の過ごし方を教えてください',
      category: 'ライフスタイル',
      isMatching: true,
      answers: [
        {
          id: 3,
          userId: 1,
          userName: '田中太郎',
          answer: '映画を見たり、カフェでのんびりするのが好きです。最近はNetflixでドラマシリーズにハマっています。',
          responseDate: '2024-06-02'
        },
        {
          id: 4,
          userId: 2,
          userName: '佐藤花子',
          answer: '映画鑑賞とカフェ巡りが趣味です。太郎さんと一緒だとより楽しいです！',
          responseDate: '2024-06-02'
        }
      ]
    }
  ]

  const currentComparison = comparisons[selectedQuestion]

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
          <h1 className="text-2xl font-bold text-gray-800">回答比較</h1>
          <p className="text-gray-600">パートナーとの回答を比べてみましょう</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Question List Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-pink-600" />
              質問一覧
            </h3>
            <div className="space-y-3">
              {comparisons.map((comparison, index) => (
                <button
                  key={comparison.questionId}
                  onClick={() => setSelectedQuestion(index)}
                  className={`w-full text-left p-3 rounded-xl transition-all ${
                    selectedQuestion === index 
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white' 
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold opacity-75">
                      {comparison.category}
                    </span>
                    {comparison.isMatching ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                  <p className="text-sm font-medium line-clamp-2">
                    {comparison.questionText}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 mt-6 border border-pink-100">
            <h3 className="font-bold text-gray-800 mb-4">統計情報</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">総質問数</span>
                <span className="font-bold">{comparisons.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">一致率</span>
                <span className="font-bold text-green-600">
                  {Math.round((comparisons.filter(c => c.isMatching).length / comparisons.length) * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison View */}
        <div className="lg:col-span-3">
          {currentComparison && (
            <div className="space-y-6">
              {/* Question Header */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-2 rounded-full">
                      <MessageCircle className="w-5 h-5 text-pink-600" />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-500">{currentComparison.category}</span>
                      <h2 className="text-xl font-bold text-gray-800">{currentComparison.questionText}</h2>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {currentComparison.isMatching ? (
                      <>
                        <CheckCircle className="w-6 h-6 text-green-500" />
                        <span className="text-green-600 font-semibold">一致</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-6 h-6 text-red-500" />
                        <span className="text-red-600 font-semibold">相違</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Answers Comparison */}
              <div className="grid md:grid-cols-2 gap-6">
                {currentComparison.answers.map((answer, index) => (
                  <div 
                    key={answer.id}
                    className={`bg-white rounded-2xl shadow-lg border-2 ${
                      index === 0 ? 'border-blue-200' : 'border-pink-200'
                    } p-6`}
                  >
                    {/* User Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-2 rounded-full ${
                        index === 0 ? 'bg-blue-100' : 'bg-pink-100'
                      }`}>
                        <Users className={`w-5 h-5 ${
                          index === 0 ? 'text-blue-600' : 'text-pink-600'
                        }`} />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800">{answer.userName}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          {answer.responseDate}
                        </div>
                      </div>
                    </div>

                    {/* Answer Content */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">回答</h4>
                        <p className="text-gray-800 leading-relaxed bg-gray-50 p-4 rounded-lg">
                          {answer.answer}
                        </p>
                      </div>

                      {answer.comment && (
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-2">コメント</h4>
                          <p className={`leading-relaxed p-3 rounded-lg ${
                            index === 0 ? 'bg-blue-50 text-blue-800' : 'bg-pink-50 text-pink-800'
                          }`}>
                            💬 {answer.comment}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Compatibility Insight */}
              <div className={`rounded-2xl p-6 ${
                currentComparison.isMatching 
                  ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200' 
                  : 'bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200'
              }`}>
                <div className="flex items-center gap-3 mb-3">
                  <Heart className={`w-5 h-5 ${
                    currentComparison.isMatching ? 'text-green-600' : 'text-orange-600'
                  }`} />
                  <h3 className={`font-bold ${
                    currentComparison.isMatching ? 'text-green-800' : 'text-orange-800'
                  }`}>
                    相性インサイト
                  </h3>
                </div>
                <p className={`${
                  currentComparison.isMatching ? 'text-green-700' : 'text-orange-700'
                }`}>
                  {currentComparison.isMatching 
                    ? '素晴らしい！お二人の価値観が一致しています。この共通点を大切にして、さらに絆を深めていきましょう。'
                    : '違いは素敵な個性です。お互いの違いを理解し合うことで、より豊かな関係性を築けるでしょう。'
                  }
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}