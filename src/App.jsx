import React, { useState, useEffect } from 'react'
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between transition-colors duration-300">
      <div className="w-full">
        <Header isDark={isDark} onToggleTheme={toggleTheme} />
        
        {/* Main Content Area */}
        <div className="relative">
          <main className="container mx-auto px-4 py-6 space-y-8">
            <UsernameForm 
              onSubmit={handleUsernameSubmit}
              isLoading={isLoading}
            />
            
            {/* Error Notification */}
            {error && (
              <div className="max-w-3xl mx-auto mb-8">
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 backdrop-blur-md">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">⚠️</div>
                    <div className="flex-1">
                      <h3 className="text-amber-800 dark:text-amber-300 font-semibold text-base mb-1.5">
                        {error.message}
                      </h3>
                      <ul className="text-amber-700 dark:text-amber-200/80 text-xs space-y-1 mb-2.5 list-disc list-inside">
                        {error.reasons.map((reason, index) => (
                          <li key={index}>{reason}</li>
                        ))}
                      </ul>
                      <p className="text-amber-800/80 dark:text-amber-300/70 text-xs italic">
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