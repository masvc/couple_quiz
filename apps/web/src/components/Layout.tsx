// apps/web/src/components/Layout.tsx
import { Outlet, Link, useLocation } from 'react-router-dom'
import { Heart, Home, MessageCircle, BarChart3, Brain, Settings } from 'lucide-react'

export function Layout() {
  const location = useLocation()

  const isActive = (path: string) => {
    return location.pathname === `/app${path}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/app" className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-2 rounded-full">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Couple Quiz
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link 
                to="/app" 
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                  isActive('') ? 'bg-pink-100 text-pink-600' : 'text-gray-600 hover:text-pink-600'
                }`}
              >
                <Home className="w-4 h-4" />
                ホーム
              </Link>
              <Link 
                to="/app/question" 
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                  isActive('/question') ? 'bg-pink-100 text-pink-600' : 'text-gray-600 hover:text-pink-600'
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                今日の質問
              </Link>
              <Link 
                to="/app/compare" 
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                  isActive('/compare') ? 'bg-pink-100 text-pink-600' : 'text-gray-600 hover:text-pink-600'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                回答比較
              </Link>
              <Link 
                to="/app/analysis" 
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                  isActive('/analysis') ? 'bg-pink-100 text-pink-600' : 'text-gray-600 hover:text-pink-600'
                }`}
              >
                <Brain className="w-4 h-4" />
                AI分析
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              <button className="p-2 rounded-full text-gray-600 hover:text-pink-600 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-pink-100">
        <div className="flex items-center justify-around py-2">
          <Link 
            to="/app" 
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
              isActive('') ? 'text-pink-600' : 'text-gray-600'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs">ホーム</span>
          </Link>
          <Link 
            to="/app/question" 
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
              isActive('/question') ? 'text-pink-600' : 'text-gray-600'
            }`}
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-xs">質問</span>
          </Link>
          <Link 
            to="/app/compare" 
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
              isActive('/compare') ? 'text-pink-600' : 'text-gray-600'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            <span className="text-xs">比較</span>
          </Link>
          <Link 
            to="/app/analysis" 
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
              isActive('/analysis') ? 'text-pink-600' : 'text-gray-600'
            }`}
          >
            <Brain className="w-5 h-5" />
            <span className="text-xs">分析</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}