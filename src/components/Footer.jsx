import React from 'react'
import { motion } from 'framer-motion'
import { Github, Star, Coffee, Heart, Shield, Code, Sparkles, Zap, Palette } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl transition-colors duration-300">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-10"
        >
          {/* Features Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            <div className="glass-card border border-slate-200 dark:border-slate-800 p-4 space-y-2 hover:border-emerald-500/30 transition-all">
              <div className="w-8 h-8 rounded-md bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                <Zap className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Pure Animated SVG</h4>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                Native declarative animations that run inside GitHub profile READMEs with zero JavaScript runtime.
              </p>
            </div>

            <div className="glass-card border border-slate-200 dark:border-slate-800 p-4 space-y-2 hover:border-teal-500/30 transition-all">
              <div className="w-8 h-8 rounded-md bg-teal-500/15 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Lightweight (~180 KB)</h4>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                Aggressively optimized keyframe animations and coordinate compression for instant loading on any device.
              </p>
            </div>

            <div className="glass-card border border-slate-200 dark:border-slate-800 p-4 space-y-2 hover:border-cyan-500/30 transition-all">
              <div className="w-8 h-8 rounded-md bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold">
                <Palette className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Dark & Light Auto Sync</h4>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                Generates dual-theme SVGs with <code className="text-cyan-600 dark:text-cyan-300 font-mono text-[10px]">&lt;picture&gt;</code> tags that automatically adapt to viewer system settings.
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
                <Github className="w-4 h-4 text-slate-300" />
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
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-slate-500 dark:text-slate-400 text-xs gap-4">
            <div className="flex items-center space-x-1.5">
              <span>Crafted with</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
              <span>for the open-source community</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-slate-600 dark:text-slate-400">
              <a 
                href="https://github.com/Man0dya/Readme-Contribution-Graph-Generator/blob/main/LICENSE" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                MIT License
              </a>
              <span>•</span>
              <a 
                href="https://github.com/Man0dya/Readme-Contribution-Graph-Generator/issues" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                Report Issues
              </a>
              <span>•</span>
              <a 
                href="https://github.com/Man0dya/Readme-Contribution-Graph-Generator/discussions" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
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
