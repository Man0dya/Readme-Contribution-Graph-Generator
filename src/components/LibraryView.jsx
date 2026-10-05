import React from 'react'
import { motion } from 'framer-motion'
import { Plus, GitFork, Crosshair, ArrowRight, Gamepad2 } from 'lucide-react'

const LibraryView = ({ onSelectStyle }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-white dark:bg-[#0d1117] border border-slate-200 dark:border-[#21262d] rounded-lg p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Contribution Graph Animation Library
            </h2>
            <p className="text-slate-600 dark:text-[#8b949e] text-xs sm:text-sm max-w-2xl leading-relaxed">
              Choose an animation style for your GitHub profile README, or contribute a new declarative SVG animation template to the collection.
            </p>
          </div>

          <a
            href="https://github.com/Man0dya/Readme-Contribution-Graph-Generator/blob/main/CONTRIBUTING.md"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-xs sm:text-sm font-semibold border border-slate-300 dark:border-[#30363d] bg-slate-50 dark:bg-[#161b22] hover:bg-slate-100 dark:hover:bg-[#21262d] text-slate-800 dark:text-white transition-all self-start md:self-auto"
          >
            <GitFork className="w-3.5 h-3.5 text-slate-500 dark:text-[#8b949e]" />
            <span>Submit a New Style</span>
          </a>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: Cannon Blast (Available & Active) */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          onClick={() => onSelectStyle('cannon-blast')}
          className="group cursor-pointer bg-white dark:bg-[#0d1117] border-2 border-emerald-500/50 dark:border-[#238636] rounded-lg p-6 flex flex-col justify-between space-y-5 hover:border-emerald-500 dark:hover:border-[#3fb950] transition-all"
        >
          <div className="space-y-4">
            {/* Title with inline icon & Description */}
            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2 group-hover:text-emerald-600 dark:group-hover:text-[#3fb950] transition-colors">
                <Crosshair className="w-4 h-4 text-emerald-600 dark:text-[#3fb950] flex-shrink-0" />
                <span>Cannon Blast</span>
              </h3>
              <p className="text-slate-600 dark:text-[#8b949e] text-xs leading-relaxed">
                An arcade sci-fi turret firing high-speed plasma energy projectiles with trailing comet particles at your GitHub contribution bubbles.
              </p>
            </div>

            {/* Tags row */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-[#161b22] text-slate-600 dark:text-[#8b949e] border border-slate-200 dark:border-[#21262d]">
                SMIL Vector
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-[#161b22] text-slate-600 dark:text-[#8b949e] border border-slate-200 dark:border-[#21262d]">
                6 Themes
              </span>
            </div>

            {/* Status under tags on the right */}
            <div className="flex items-center justify-end pt-1">
              <span className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 dark:bg-[#238636]/25 text-emerald-700 dark:text-[#3fb950] border border-emerald-500/30">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500 dark:bg-[#3fb950]"></span>
                </span>
                <span>Ready to use</span>
              </span>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4 border-t border-slate-100 dark:border-[#21262d] flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-[#3fb950]">
            <span>Launch Generator</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </motion.div>

        {/* Card 2: Community Participation Card (Plus Icon) */}
        <motion.a
          href="https://github.com/Man0dya/Readme-Contribution-Graph-Generator/blob/main/CONTRIBUTING.md"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          className="group cursor-pointer bg-slate-50/50 dark:bg-[#0d1117]/40 border-2 border-dashed border-slate-300 dark:border-[#30363d] hover:border-emerald-500 dark:hover:border-[#3fb950] rounded-lg p-6 flex flex-col justify-between space-y-5 transition-all text-left"
        >
          <div className="space-y-4">
            {/* Title with inline plus icon & Description */}
            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2 group-hover:text-emerald-600 dark:group-hover:text-[#3fb950] transition-colors">
                <Plus className="w-4 h-4 text-emerald-600 dark:text-[#3fb950] flex-shrink-0" />
                <span>Add Your Animation Style</span>
              </h3>
              <p className="text-slate-600 dark:text-[#8b949e] text-xs leading-relaxed">
                Have a creative idea for an animation? Build a template engine (Snake, Wave, Matrix, etc.) and submit a pull request to get it featured in the library!
              </p>
            </div>

            {/* Tags row */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-[#161b22] text-slate-600 dark:text-[#8b949e] border border-slate-200 dark:border-[#21262d]">
                Community
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-[#161b22] text-slate-600 dark:text-[#8b949e] border border-slate-200 dark:border-[#21262d]">
                Open Source
              </span>
            </div>

            {/* Status under tags on the right */}
            <div className="flex items-center justify-end pt-1">
              <span className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/10 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/30">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
                </span>
                <span>Open for PRs</span>
              </span>
            </div>
          </div>

          {/* Action Link */}
          <div className="pt-4 border-t border-slate-200/80 dark:border-[#21262d] flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-neutral-300 group-hover:text-emerald-600 dark:group-hover:text-[#3fb950]">
            <span>View Contribution Guide</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </motion.a>

        {/* Card 3: Retro Snake (Concept / Coming Soon) */}
        <div className="bg-white dark:bg-[#0d1117] border border-slate-200 dark:border-[#21262d] opacity-75 rounded-lg p-6 flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            {/* Title with inline icon & Description */}
            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <Gamepad2 className="w-4 h-4 text-slate-500 dark:text-[#8b949e] flex-shrink-0" />
                <span>Retro Snake</span>
              </h3>
              <p className="text-slate-600 dark:text-[#8b949e] text-xs leading-relaxed">
                A classic arcade snake crawling through the 52-week calendar grid consuming green contribution apples one by one.
              </p>
            </div>

            {/* Tags row */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-[#161b22] text-slate-500 dark:text-[#8b949e] border border-slate-200 dark:border-[#21262d]">
                Arcade
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-[#161b22] text-slate-500 dark:text-[#8b949e] border border-slate-200 dark:border-[#21262d]">
                In Discussion
              </span>
            </div>

            {/* Status under tags on the right */}
            <div className="flex items-center justify-end pt-1">
              <span className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-[#161b22] text-slate-500 dark:text-[#8b949e] border border-slate-200 dark:border-[#21262d]">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-[#484f58]" />
                <span>Concept Idea</span>
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-[#21262d] text-xs text-slate-400 dark:text-neutral-500">
            <span>Contributions Welcome</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LibraryView
