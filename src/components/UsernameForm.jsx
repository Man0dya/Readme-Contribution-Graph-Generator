import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Loader2, Github, ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react'

const UsernameForm = ({ onSubmit, isLoading }) => {
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!username.trim()) {
      setError('Please enter a GitHub username')
      return
    }
    
    const usernameRegex = /^[a-zA-Z0-9]([a-zA-Z0-9]|-)*[a-zA-Z0-9]$|^[a-zA-Z0-9]$/
    if (!usernameRegex.test(username.trim())) {
      setError('Please enter a valid GitHub username')
      return
    }
    
    setError('')
    onSubmit(username.trim())
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
    if (error) setError('')
  }

  const exampleUsers = [
    { name: 'torvalds' },
    { name: 'gaearon' },
    { name: 'sindresorhus' },
    { name: 'antfu' },
    { name: 'octocat' },
  ]

  return (
    <section id="username-form" className="relative pt-4 pb-8 overflow-hidden">
      <div className="w-full">
        {/* Main heading */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-6">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white"
          >
            Readme contribution graph generator
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-sm sm:text-base text-slate-600 dark:text-neutral-400 max-w-2xl mx-auto"
          >
            Generate animated SVGs for your GitHub profile README. Fully automated with GitHub Actions.
          </motion.p>

          {/* Feature Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-slate-600 dark:text-neutral-400 pt-1"
          >
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-[#3fb950]" /> Pure SVG (No JS needed)</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-teal-600 dark:text-[#3fb950]" /> Free GitHub Actions</span>
            <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-cyan-600 dark:text-[#58a6ff]" /> Fast & Lightweight</span>
          </motion.div>
        </div>

        {/* Input Card */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="glass-card border border-slate-200 dark:border-[#21262d] p-5 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="github-username" className="block text-xs font-semibold text-slate-700 dark:text-white">
                  GitHub Username
                </label>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Github className="h-4 w-4 text-slate-400 dark:text-neutral-500" />
                  </div>
                  
                  <input
                    id="github-username"
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                    placeholder="Enter GitHub username (e.g. torvalds, Man0dya)"
                    className="input-field pl-10 pr-9 text-sm font-medium"
                    disabled={isLoading}
                    autoComplete="off"
                    autoFocus
                  />
                  
                  {username && !error && (
                    <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center">
                      <div className="w-2 h-2 bg-[#2ea043] rounded-full" />
                    </div>
                  )}
                </div>
              </div>

              {/* Error Alert */}
              {error && (
                <div className="p-2.5 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 rounded-md text-rose-700 dark:text-rose-300 text-xs flex items-center space-x-2">
                  <span>⚠️</span>
                  <span>{error}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !username.trim()}
                className={`w-full btn-primary flex items-center justify-center space-x-2 py-2.5 text-sm ${
                  isLoading || !username.trim() ? 'opacity-60 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Fetching Contribution Data...</span>
                  </>
                ) : (
                  <>
                    <span>Generate Animation</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Quick-pick examples */}
            <div className="mt-4 pt-3.5 border-t border-slate-200 dark:border-[#21262d]">
              <p className="text-xs font-medium text-slate-500 dark:text-neutral-400 mb-2">
                Try quick example:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {exampleUsers.map((user) => (
                  <button
                    key={user.name}
                    type="button"
                    onClick={() => {
                      setUsername(user.name)
                      setError('')
                      onSubmit(user.name)
                    }}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-[#161b22] dark:hover:bg-[#21262d] border border-slate-200 dark:border-[#30363d] rounded text-xs font-medium text-slate-700 dark:text-white transition-all active:scale-95"
                    disabled={isLoading}
                  >
                    <span>@{user.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default UsernameForm