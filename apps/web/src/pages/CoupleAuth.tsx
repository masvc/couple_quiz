// apps/web/src/pages/CoupleAuth.tsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Heart, Users, ArrowLeft, Plus, Search } from 'lucide-react'

type AuthMode = 'select' | 'register' | 'login'

export function CoupleAuth() {
  const navigate = useNavigate()
  const [authMode, setAuthMode] = useState<AuthMode>('select')
  const [isLoading, setIsLoading] = useState(false)

  const [registerForm, setRegisterForm] = useState({
    maleUser: { name: '', age: '', location: '' },
    femaleUser: { name: '', age: '', location: '' },
    startDate: ''
  })

  const [loginForm, setLoginForm] = useState({
    coupleId: '',
    maleUserName: '',
    femaleUserName: ''
  })

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // TODO: APIでカップル登録
      await new Promise(resolve => setTimeout(resolve, 1500))
      navigate('/app')
    } catch (error) {
      console.error('登録に失敗しました:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // TODO: APIでカップルログイン
      await new Promise(resolve => setTimeout(resolve, 1000))
      navigate('/app')
    } catch (error) {
      console.error('ログインに失敗しました:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (authMode === 'select') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-pink-600 mb-4">
              <ArrowLeft className="w-4 h-4" />
              トップページに戻る
            </Link>
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-4 rounded-full w-fit mx-auto mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Couple Quiz
            </h1>
            <p className="text-gray-600">始め方を選択してください</p>
          </div>

          {/* Options */}
          <div className="space-y-4">
            <button
              onClick={() => setAuthMode('register')}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white p-6 rounded-2xl shadow-lg transition-all transform hover:scale-105"
            >
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <Plus className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold mb-1">新規カップル登録</h3>
                  <p className="text-pink-100 text-sm">初めてのご利用の方</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setAuthMode('login')}
              className="w-full bg-white hover:bg-gray-50 text-gray-800 p-6 rounded-2xl shadow-lg border-2 border-gray-200 hover:border-pink-300 transition-all transform hover:scale-105"
            >
              <div className="flex items-center gap-4">
                <div className="bg-gray-100 p-3 rounded-full">
                  <Search className="w-6 h-6 text-gray-600" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold mb-1">既存カップルでログイン</h3>
                  <p className="text-gray-600 text-sm">すでに登録済みの方</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (authMode === 'register') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <button 
              onClick={() => setAuthMode('select')}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-pink-600 mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              戻る
            </button>
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-3 rounded-full w-fit mx-auto mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">新規カップル登録</h1>
            <p className="text-gray-600">お二人の情報を入力してください</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <form onSubmit={handleRegister} className="space-y-8">
              {/* Male User */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-sm">男性</span>
                  パートナー1の情報
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">お名前</label>
                    <input
                      type="text"
                      value={registerForm.maleUser.name}
                      onChange={(e) => setRegisterForm({
                        ...registerForm,
                        maleUser: { ...registerForm.maleUser, name: e.target.value }
                      })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">年齢</label>
                    <input
                      type="number"
                      value={registerForm.maleUser.age}
                      onChange={(e) => setRegisterForm({
                        ...registerForm,
                        maleUser: { ...registerForm.maleUser, age: e.target.value }
                      })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      min="18"
                      max="100"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">住所</label>
                    <input
                      type="text"
                      value={registerForm.maleUser.location}
                      onChange={(e) => setRegisterForm({
                        ...registerForm,
                        maleUser: { ...registerForm.maleUser, location: e.target.value }
                      })}
                      placeholder="東京都渋谷区"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Female User */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="bg-pink-100 text-pink-600 px-2 py-1 rounded text-sm">女性</span>
                  パートナー2の情報
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">お名前</label>
                    <input
                      type="text"
                      value={registerForm.femaleUser.name}
                      onChange={(e) => setRegisterForm({
                        ...registerForm,
                        femaleUser: { ...registerForm.femaleUser, name: e.target.value }
                      })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">年齢</label>
                    <input
                      type="number"
                      value={registerForm.femaleUser.age}
                      onChange={(e) => setRegisterForm({
                        ...registerForm,
                        femaleUser: { ...registerForm.femaleUser, age: e.target.value }
                      })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      min="18"
                      max="100"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">住所</label>
                    <input
                      type="text"
                      value={registerForm.femaleUser.location}
                      onChange={(e) => setRegisterForm({
                        ...registerForm,
                        femaleUser: { ...registerForm.femaleUser, location: e.target.value }
                      })}
                      placeholder="東京都新宿区"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Relationship Info */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">交際情報</h3>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">交際開始日</label>
                  <input
                    type="date"
                    value={registerForm.startDate}
                    onChange={(e) => setRegisterForm({
                      ...registerForm,
                      startDate: e.target.value
                    })}
                    className="w-full md:w-auto p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all transform hover:scale-105 disabled:transform-none"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    登録中...
                  </>
                ) : (
                  <>
                    <Users className="w-5 h-5" />
                    カップル登録 💕
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  if (authMode === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <button 
              onClick={() => setAuthMode('select')}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-pink-600 mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              戻る
            </button>
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-3 rounded-full w-fit mx-auto mb-4">
              <Search className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">カップルログイン</h1>
            <p className="text-gray-600">登録済みのカップル情報を入力してください</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">カップルID</label>
                <input
                  type="text"
                  value={loginForm.coupleId}
                  onChange={(e) => setLoginForm({ ...loginForm, coupleId: e.target.value })}
                  placeholder="例: CQ001"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">パートナー1のお名前</label>
                <input
                  type="text"
                  value={loginForm.maleUserName}
                  onChange={(e) => setLoginForm({ ...loginForm, maleUserName: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">パートナー2のお名前</label>
                <input
                  type="text"
                  value={loginForm.femaleUserName}
                  onChange={(e) => setLoginForm({ ...loginForm, femaleUserName: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all transform hover:scale-105 disabled:transform-none"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    ログイン中...
                  </>
                ) : (
                  <>
                    <Heart className="w-5 h-5" />
                    ログイン
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return null
}