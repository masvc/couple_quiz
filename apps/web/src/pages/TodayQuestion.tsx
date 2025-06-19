// apps/web/src/pages/TodayQuestion.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageCircle, Send, ArrowLeft, Heart, Sparkles } from 'lucide-react'

export function TodayQuestion() {
  const navigate = useNavigate()
  const [answer, setAnswer] = useState('')
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // TODO: APIから今日の質問を取得
  const todayQuestion = {
    id: 1,
    questionText: '好きな食べ物は何ですか？',
    category: '基本情報',
    questionType: 'MANUAL'
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!answer.trim()) return

    setIsSubmitting(true)
    
    try {
      // TODO: APIに回答を送信
      await new Promise(resolve => setTimeout(resolve, 1000)) // 仮の遅延
      
      // 成功した場合は比較ページへ遷移
      navigate('/app/compare')
    } catch (error) {
      console.error('回答の送信に失敗しました:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate('/app')}
          className="p-2 rounded-full hover:bg-pink-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">今日の質問</h1>
          <p className="text-gray-600">パートナーとの絆を深める質問に答えましょう</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Question Card */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg border border-pink-100 overflow-hidden">
            {/* Question Header */}
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-white/20 p-2 rounded-full">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm opacity-90">カテゴリ: {todayQuestion.category}</div>
                  <div className="text-xs opacity-75">質問 #{todayQuestion.id}</div>
                </div>
              </div>
              <h2 className="text-2xl font-bold leading-relaxed">
                {todayQuestion.questionText}
              </h2>
            </div>

            {/* Answer Form */}
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="answer" className="block text-sm font-semibold text-gray-700 mb-2">
                    あなたの回答 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="answer"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="あなたの思いを自由に書いてください..."
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none h-32 text-gray-800"
                    required
                  />
                  <div className="text-sm text-gray-500 mt-2">
                    {answer.length}/500文字
                  </div>
                </div>

                <div>
                  <label htmlFor="comment" className="block text-sm font-semibold text-gray-700 mb-2">
                    パートナーへのコメント（任意）
                  </label>
                  <textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="パートナーに伝えたいことがあれば..."
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none h-24 text-gray-800"
                  />
                  <div className="text-sm text-gray-500 mt-2">
                    {comment.length}/200文字
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!answer.trim() || isSubmitting}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                      送信中...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      回答を送信 ✨
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Tips Card */}
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 border border-pink-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-r from-pink-200 to-purple-200 p-2 rounded-full">
                <Sparkles className="w-5 h-5 text-pink-600" />
              </div>
              <h3 className="font-bold text-gray-800">回答のコツ 💡</h3>
            </div>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-pink-500 font-bold">•</span>
                <span>正直な気持ちを書きましょう</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-500 font-bold">•</span>
                <span>具体的なエピソードを入れると◎</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-500 font-bold">•</span>
                <span>パートナーのことを考えながら</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-500 font-bold">•</span>
                <span>楽しんで答えることが一番大切</span>
              </li>
            </ul>
          </div>

          {/* Progress Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-r from-purple-200 to-indigo-200 p-2 rounded-full">
                <Heart className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-800">今週の進捗</h3>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>回答済み質問</span>
                  <span>2/7</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full w-[28%]"></div>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                あと5問で今週のゴール達成！ 💪
              </p>
            </div>
          </div>

          {/* Motivation Card */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
            <h3 className="font-bold text-gray-800 mb-3">今日の一言 ✨</h3>
            <p className="text-sm text-gray-700 italic">
              「小さな質問が、大きな理解へと繋がります。今日もパートナーとの絆を深めていきましょう。」
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}