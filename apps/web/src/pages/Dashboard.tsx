// apps/web/src/pages/Dashboard.tsx
import { Link } from 'react-router-dom'
import { Calendar, MessageCircle, Users, Heart, TrendingUp, Award, BarChart3 } from 'lucide-react'

export function Dashboard() {
  // TODO: これらのデータは後でAPIから取得する
  const coupleData = {
    maleUser: { name: '田中太郎', age: 28 },
    femaleUser: { name: '佐藤花子', age: 26 },
    startDate: '2024-06-01',
    currentDay: 3,
    answeredToday: false
  }

  const stats = {
    totalQuestions: 15,
    answeredQuestions: 8,
    matchingAnswers: 5,
    compatibilityScore: 87
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              こんにちは、{coupleData.maleUser.name}さん & {coupleData.femaleUser.name}さん！
            </h1>
            <p className="text-pink-100 text-lg">
              交際 {coupleData.currentDay} 日目 • 今日も一緒に成長しましょう 💕
            </p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/20 p-4 rounded-full">
              <Heart className="w-12 h-12" />
            </div>
          </div>
        </div>
      </div>

      {/* Today's Action */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-gradient-to-r from-pink-100 to-pink-200 p-3 rounded-full">
              <MessageCircle className="w-6 h-6 text-pink-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">今日の質問</h2>
              <p className="text-gray-600">今日の質問に答えましょう</p>
            </div>
          </div>
          
          {!coupleData.answeredToday ? (
            <div className="space-y-4">
              <p className="text-gray-700">
                まだ今日の質問に答えていません。
              </p>
              <Link 
                to="/app/question"
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2 transition-all transform hover:scale-105"
              >
                質問に答える ✨
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-green-600 font-semibold">✅ 今日の質問に回答済み</p>
              <Link 
                to="/app/compare"
                className="text-purple-600 hover:text-purple-700 font-semibold inline-flex items-center gap-2"
              >
                回答を比較する →
              </Link>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-gradient-to-r from-purple-100 to-purple-200 p-3 rounded-full">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">カップル情報</h2>
              <p className="text-gray-600">あなたたちの基本情報</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">交際開始日</span>
              <span className="font-semibold">{coupleData.startDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">交際日数</span>
              <span className="font-semibold">{coupleData.currentDay}日</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">パートナー</span>
              <span className="font-semibold">
                {coupleData.maleUser.name} & {coupleData.femaleUser.name}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-pink-100 text-center">
          <div className="bg-gradient-to-r from-pink-100 to-pink-200 p-3 rounded-full w-fit mx-auto mb-3">
            <Calendar className="w-6 h-6 text-pink-600" />
          </div>
          <div className="text-2xl font-bold text-gray-800 mb-1">{stats.totalQuestions}</div>
          <div className="text-gray-600 text-sm">総質問数</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-green-100 text-center">
          <div className="bg-gradient-to-r from-green-100 to-green-200 p-3 rounded-full w-fit mx-auto mb-3">
            <MessageCircle className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-800 mb-1">{stats.answeredQuestions}</div>
          <div className="text-gray-600 text-sm">回答済み</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100 text-center">
          <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-3 rounded-full w-fit mx-auto mb-3">
            <Award className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-800 mb-1">{stats.matchingAnswers}</div>
          <div className="text-gray-600 text-sm">一致回答</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-100 text-center">
          <div className="bg-gradient-to-r from-purple-100 to-purple-200 p-3 rounded-full w-fit mx-auto mb-3">
            <TrendingUp className="w-6 h-6 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-gray-800 mb-1">{stats.compatibilityScore}%</div>
          <div className="text-gray-600 text-sm">相性スコア</div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-4">最近の活動</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-pink-50 rounded-lg">
            <div className="bg-pink-200 p-2 rounded-full">
              <MessageCircle className="w-4 h-4 text-pink-600" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-800">「好きな食べ物は何ですか？」に回答</p>
              <p className="text-sm text-gray-600">2024/06/01 - あなたとパートナーが回答</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg">
            <div className="bg-purple-200 p-2 rounded-full">
              <Heart className="w-4 h-4 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-800">カップル登録完了</p>
              <p className="text-sm text-gray-600">2024/06/01 - Couple Quizへようこそ！</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <Link 
          to="/app/compare"
          className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl p-6 text-white hover:shadow-xl transition-all transform hover:scale-105"
        >
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-full">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">回答を比較</h3>
              <p className="text-pink-100">パートナーとの回答を見比べてみましょう</p>
            </div>
          </div>
        </Link>

        <Link 
          to="/app/analysis"
          className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white hover:shadow-xl transition-all transform hover:scale-105"
        >
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-full">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">AI分析レポート</h3>
              <p className="text-indigo-100">あなたたちの相性を詳しく分析</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}