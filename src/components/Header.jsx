import React from 'react'
import { motion } from 'framer-motion'
import { Github, Star, Moon, Sun, BookOpen, Layers } from 'lucide-react'

const Header = ({ isDark, onToggleTheme, currentView = 'generator', onSelectView }) => {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/90 dark:bg-black/95 border-b border-slate-200 dark:border-[#21262d] transition-colors duration-300">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Brand Title */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="cursor-pointer"
          onClick={() => {
            if (onSelectView) onSelectView('generator')
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          <h1 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-[#3fb950] transition-colors">
            Readme contribution graph generator
          </h1>
        </motion.div>

        {/* Navigation: Library, Theme Toggle, Star */}
        <motion.div 
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-2 sm:space-x-3"
        >
          {/* Library Link / Button */}
          <button
            type="button"
            onClick={() => onSelectView && onSelectView(currentView === 'library' ? 'generator' : 'library')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs sm:text-sm font-semibold transition-all active:scale-95 ${
              currentView === 'library'
                ? 'bg-emerald-600 dark:bg-[#238636] text-white border border-emerald-500'
                : 'border border-slate-300 dark:border-[#30363d] bg-white dark:bg-[#161b22] hover:bg-slate-50 dark:hover:bg-[#21262d] text-slate-800 dark:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Library</span>
          </button>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-md border border-slate-300 dark:border-[#30363d] bg-slate-100 dark:bg-[#161b22] hover:bg-slate-200 dark:hover:bg-[#21262d] text-slate-700 dark:text-white transition-all active:scale-95"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          {/* Star on GitHub Button */}
          <a
            href="https://github.com/Man0dya/Readme-Contribution-Graph-Generator"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium border border-slate-300 dark:border-[#30363d] bg-white dark:bg-[#161b22] hover:bg-slate-50 dark:hover:bg-[#21262d] text-slate-800 dark:text-white hover:text-emerald-600 dark:hover:text-[#3fb950] transition-all active:scale-95"
          >
            <Github className="w-4 h-4" />
            <span className="hidden sm:inline">Star on GitHub</span>
            <span className="flex items-center text-amber-500 font-semibold pl-1.5 border-l border-slate-200 dark:border-[#30363d]">
              <Star className="w-3 h-3 fill-amber-400 mr-1" />
              Star
            </span>
          </a>
        </motion.div>
      </div>
    </header>
  )
}

export default Header