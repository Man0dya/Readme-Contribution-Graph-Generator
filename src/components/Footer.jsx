import React from 'react'
import { motion } from 'framer-motion'
import { Github, Star, Coffee, Sparkles, Zap, Palette } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="w-full mt-16 border-t border-slate-200 dark:border-[#21262d] bg-white/90 dark:bg-black/95 backdrop-blur-xl transition-colors duration-300">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-10"
        >
          {/* Features Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto">
            <div className="glass-card border border-slate-200 dark:border-[#21262d] p-4 space-y-2 hover:border-emerald-500/30 dark:hover:border-[#3fb950]/40 transition-all">
              <div className="w-8 h-8 rounded-md bg-emerald-500/15 dark:bg-[#238636]/20 text-emerald-600 dark:text-[#3fb950] flex items-center justify-center font-bold">
                <Zap className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Pure Animated SVG</h4>
              <p className="text-slate-600 dark:text-neutral-400 text-xs leading-relaxed">
                Native declarative animations that run inside GitHub profile READMEs with zero JavaScript runtime.
              </p>
            </div>

            <div className="glass-card border border-slate-200 dark:border-[#21262d] p-4 space-y-2 hover:border-teal-500/30 dark:hover:border-[#3fb950]/40 transition-all">
              <div className="w-8 h-8 rounded-md bg-teal-500/15 dark:bg-[#238636]/20 text-teal-600 dark:text-[#3fb950] flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Lightweight (~180 KB)</h4>
              <p className="text-slate-600 dark:text-neutral-400 text-xs leading-relaxed">
                Aggressively optimized keyframe animations and coordinate compression for instant loading on any device.
              </p>
            </div>

            <div className="glass-card border border-slate-200 dark:border-[#21262d] p-4 space-y-2 hover:border-cyan-500/30 dark:hover:border-[#58a6ff]/40 transition-all">
              <div className="w-8 h-8 rounded-md bg-cyan-500/15 dark:bg-[#388bfd]/20 text-cyan-600 dark:text-[#58a6ff] flex items-center justify-center font-bold">
                <Palette className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Dark & Light Auto Sync</h4>
              <p className="text-slate-600 dark:text-neutral-400 text-xs leading-relaxed">
                Generates dual-theme SVGs with <code className="text-cyan-600 dark:text-[#58a6ff] dark:bg-black dark:border dark:border-[#21262d] px-1 py-0.5 rounded font-mono text-[10px]">&lt;picture&gt;</code> tags that automatically adapt to viewer system settings.
              </p>
            </div>
          </div>

          {/* Call to action & Socials */}
          <div className="text-center space-y-4 max-w-xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="https://github.com/Man0dya/Readme-Contribution-Graph-Generator"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary py-2 px-4 text-xs flex items-center space-x-2"
              >
                <Github className="w-4 h-4 text-slate-600 dark:text-white" />
                <span>GitHub Repository</span>
              </a>

              <a
                href="https://github.com/Man0dya/Readme-Contribution-Graph-Generator"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary py-2 px-4 text-xs flex items-center space-x-2"
              >
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>Star on GitHub</span>
              </a>

              <a
                href="https://buymeacoffee.com/Man0dya"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary py-2 px-4 text-xs flex items-center space-x-2"
              >
                <Coffee className="w-4 h-4" />
                <span>Buy me a coffee</span>
              </a>
            </div>
          </div>

          {/* Bottom Copyright & Links */}
          <div className="pt-8 border-t border-slate-200 dark:border-[#21262d] flex flex-col sm:flex-row items-center justify-between text-slate-500 dark:text-neutral-400 text-xs gap-4 max-w-7xl mx-auto">
            <div>
              <span>Crafted for the open-source community</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-slate-600 dark:text-neutral-400">
              <a 
                href="https://github.com/Man0dya/Readme-Contribution-Graph-Generator/blob/main/LICENSE" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-emerald-600 dark:hover:text-[#3fb950] transition-colors"
              >
                MIT License
              </a>
              <span>•</span>
              <a 
                href="https://github.com/Man0dya/Readme-Contribution-Graph-Generator/issues" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-emerald-600 dark:hover:text-[#3fb950] transition-colors"
              >
                Report Issues
              </a>
              <span>•</span>
              <a 
                href="https://github.com/Man0dya/Readme-Contribution-Graph-Generator/discussions" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-emerald-600 dark:hover:text-[#3fb950] transition-colors"
              >
                Discussions
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
