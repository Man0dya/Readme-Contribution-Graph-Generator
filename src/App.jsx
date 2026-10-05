import React, { useState, useEffect } from 'react'
import { Zap, Sparkles, Palette } from 'lucide-react'
import Header from './components/Header'
import UsernameForm from './components/UsernameForm'
import CodeGenerator from './components/CodeGenerator'
import Footer from './components/Footer'
import TestPanel from './components/TestPanel'

function App() {
  const [username, setUsername] = useState('')
  const [contributionData, setContributionData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    // Synchronize HTML class with isDark state
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [isDark])

  const toggleTheme = () => {
    setIsDark(prev => !prev)
  }

  const handleUsernameSubmit = async (submittedUsername) => {
    setUsername(submittedUsername)
    setIsLoading(true)
    setContributionData(null)
    setError(null)
    
    try {
      if (import.meta.env.DEV) {
        console.log(`🚀 Fetching contribution data for: ${submittedUsername}`)
      }
      
      const { fetchContributionData } = await import('./utils/github.js')
      const realData = await fetchContributionData(submittedUsername)
      setContributionData(realData)
      
      console.log(`✅ Successfully loaded real data for ${submittedUsername}`)
    } catch (err) {
      console.error('❌ Error fetching contribution data:', err.message)
      
      setError({
        message: `Unable to fetch live GitHub contribution calendar for "${submittedUsername}"`,
        reasons: [
          err.message.includes('Invalid') ? 'Invalid GitHub username format' : null,
          err.message.includes('404') ? 'GitHub user does not exist' : null,
          err.message.includes('rate limit') ? 'GitHub API public rate limit reached' : null,
          err.message.includes('network') || err.message.includes('fetch') ? 'Network connectivity issues' : null,
          'Browser CORS restrictions on GitHub endpoints'
        ].filter(Boolean),
        suggestion: `Client-side browser previews can occasionally hit CORS/rate limits. For guaranteed daily updates with zero limits, use the GitHub Actions workflow in your repository.`
      })
      
      setContributionData(null)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-white flex flex-col justify-between transition-colors duration-300">
      <div className="w-full">
        <Header isDark={isDark} onToggleTheme={toggleTheme} />
        
        {/* Main Content Area */}
        <div className="relative">
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            <UsernameForm 
              onSubmit={handleUsernameSubmit}
              isLoading={isLoading}
            />
            
            {/* Error Notification */}
            {error && (
              <div className="max-w-3xl mx-auto mb-8">
                <div className="bg-amber-500/10 border border-amber-500/30 dark:bg-[#161b22] dark:border-amber-500/40 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">⚠️</div>
                    <div className="flex-1">
                      <h3 className="text-amber-800 dark:text-amber-400 font-semibold text-base mb-1.5">
                        {error.message}
                      </h3>
                      <ul className="text-amber-700 dark:text-[#8b949e] text-xs space-y-1 mb-2.5 list-disc list-inside">
                        {error.reasons.map((reason, index) => (
                          <li key={index}>{reason}</li>
                        ))}
                      </ul>
                      <p className="text-amber-800/80 dark:text-amber-400/80 text-xs italic">
                        {error.suggestion}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Generator Results & Controls */}
            {contributionData && (
              <div id="results" className="space-y-6">
                <CodeGenerator 
                  username={username}
                  contributionData={contributionData}
                />
              </div>
            )}

            {/* Feature Highlights Grid in Body */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="bg-white dark:bg-[#0d1117] border border-slate-200 dark:border-[#21262d] rounded-lg p-4 space-y-2 hover:border-slate-300 dark:hover:border-[#30363d] transition-all">
                <div className="w-8 h-8 rounded-md bg-emerald-500/10 dark:bg-[#238636]/20 text-emerald-600 dark:text-[#3fb950] flex items-center justify-center font-bold">
                  <Zap className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Pure Animated SVG</h4>
                <p className="text-slate-600 dark:text-[#8b949e] text-xs leading-relaxed">
                  Native declarative animations that run inside GitHub profile READMEs with zero JavaScript runtime.
                </p>
              </div>

              <div className="bg-white dark:bg-[#0d1117] border border-slate-200 dark:border-[#21262d] rounded-lg p-4 space-y-2 hover:border-slate-300 dark:hover:border-[#30363d] transition-all">
                <div className="w-8 h-8 rounded-md bg-teal-500/10 dark:bg-[#238636]/20 text-teal-600 dark:text-[#3fb950] flex items-center justify-center font-bold">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Lightweight (~180 KB)</h4>
                <p className="text-slate-600 dark:text-[#8b949e] text-xs leading-relaxed">
                  Aggressively optimized keyframe animations and coordinate compression for instant loading on any device.
                </p>
              </div>

              <div className="bg-white dark:bg-[#0d1117] border border-slate-200 dark:border-[#21262d] rounded-lg p-4 space-y-2 hover:border-slate-300 dark:hover:border-[#30363d] transition-all">
                <div className="w-8 h-8 rounded-md bg-cyan-500/10 dark:bg-[#388bfd]/20 text-cyan-600 dark:text-[#58a6ff] flex items-center justify-center font-bold">
                  <Palette className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Dark & Light Auto Sync</h4>
                <p className="text-slate-600 dark:text-[#8b949e] text-xs leading-relaxed">
                  Generates dual-theme SVGs with <code className="text-cyan-600 dark:text-[#58a6ff] bg-slate-100 dark:bg-black border border-slate-200 dark:border-[#21262d] px-1 py-0.5 rounded font-mono text-[10px]">&lt;picture&gt;</code> tags that automatically adapt to viewer system settings.
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
      
      <Footer />

      {/* Development Debug Panel */}
      <TestPanel />
    </div>
  )
}

export default App