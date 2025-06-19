// apps/web/src/pages/Landing.tsx
import { Link } from 'react-router-dom'
import { Heart, Users, Brain, Sparkles } from 'lucide-react'

export function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-4 rounded-full">
              <Heart className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Couple Quiz
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 my-8 leading-relaxed">
            パートナーとの絆を深める<br />
            毎日の質問で、お互いをもっと知ろう ❤️
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
            <Link 
              to="/auth"
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              はじめる 💕
            </Link>
            <button className="text-purple-600 px-8 py-4 rounded-full text-lg font-semibold border-2 border-purple-200 hover:border-purple-400 transition-colors">
              デモを見る
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="text-center p-8 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg">
            <div className="bg-gradient-to-r from-pink-100 to-pink-200 p-4 rounded-full w-fit mx-auto mb-6">
              <Users className="w-8 h-8 text-pink-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">毎日の質問</h3>
            <p className="text-gray-600">
              カップル専用に考えられた質問で、毎日新しい発見を楽しめます
            </p>
          </div>

          <div className="text-center p-8 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg">
            <div className="bg-gradient-to-r from-purple-100 to-purple-200 p-4 rounded-full w-fit mx-auto mb-6">
              <Brain className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">AI分析</h3>
            <p className="text-gray-600">
              回答を分析して、あなたたちの相性や特徴をレポートします
            </p>
          </div>

          <div className="text-center p-8 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg">
            <div className="bg-gradient-to-r from-indigo-100 to-indigo-200 p-4 rounded-full w-fit mx-auto mb-6">
              <Sparkles className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">個別最適化</h3>
            <p className="text-gray-600">
              あなたたちの関係性に合わせて、質問を自動生成します
            </p>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
            使い方はとってもシンプル 🌟
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="flex flex-col items-center">
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2">カップル登録</h3>
              <p className="text-gray-600 text-center">二人の基本情報を登録</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2">毎日回答</h3>
              <p className="text-gray-600 text-center">その日の質問に回答</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2">結果を比較</h3>
              <p className="text-gray-600 text-center">お互いの回答を見て深く知り合う</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            今すぐ始めて、パートナーとの絆を深めよう！
          </h2>
          <p className="text-xl text-pink-100 mb-8">
            無料で始められます 💕
          </p>
          <Link 
            to="/auth"
            className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            無料で始める ✨
          </Link>
        </div>
      </div>
    </div>
  )
}