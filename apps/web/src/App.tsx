// apps/web/src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Landing } from './pages/Landing'
import { CoupleAuth } from './pages/CoupleAuth'
import { Dashboard } from './pages/Dashboard'
import { TodayQuestion } from './pages/TodayQuestion'
import { CompareAnswers } from './pages/CompareAnswers'
import { AIAnalysis } from './pages/AIAnalysis'
import { Layout } from './components/Layout'
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<CoupleAuth />} />
          <Route path="/app" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="question" element={<TodayQuestion />} />
            <Route path="compare" element={<CompareAnswers />} />
            <Route path="analysis" element={<AIAnalysis />} />
          </Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App