import React from 'react'
import { motion } from 'framer-motion'
import { Github, Star, Moon, Sun } from 'lucide-react'

const Header = ({ isDark, onToggleTheme }) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 dark:bg-slate-950/90 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Title without icon */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <h1 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white">
            Readme contribution graph generator
          </h1>
        </motion.div>

        {/* Action Links & Theme Toggle */}
        <motion.div 
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-2 sm:space-x-3"
        >
          {/* Dark / Light Mode Toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-md border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-all active:scale-95"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          {/* GitHub Star Button */}
          <a
            href="https://github.com/Man0dya/Readme-Contribution-Graph-Generator"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all active:scale-95"
          >
            <Github className="w-4 h-4" />
            <span className="hidden sm:inline">Star on GitHub</span>
            <span className="flex items-center text-amber-500 font-semibold pl-1.5 border-l border-slate-200 dark:border-slate-700">
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