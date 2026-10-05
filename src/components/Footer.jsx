import React from 'react'
import { 
  Github, 
  Star, 
  GitFork, 
  HeartHandshake, 
  BookOpen, 
  ShieldCheck, 
  ExternalLink, 
  MessageSquare, 
  Code2, 
  Terminal,
  FileCode2,
  User
} from 'lucide-react'

const Footer = () => {
  return (
    <footer className="w-full mt-16 border-t border-slate-200 dark:border-[#21262d] bg-white dark:bg-black transition-colors duration-300">
      {/* Collaboration & Open Source Invite Card Banner */}
      <div className="w-full border-b border-slate-200 dark:border-[#21262d] bg-slate-50/75 dark:bg-[#0d1117]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 bg-white dark:bg-[#0d1117] border border-slate-200 dark:border-[#21262d] rounded-lg p-6 sm:p-8">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-md bg-emerald-500/10 dark:bg-[#238636]/20 border border-emerald-500/20 dark:border-[#3fb950]/30 text-emerald-600 dark:text-[#3fb950] text-xs font-semibold">
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>Open for Collaboration</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                Want to build new animation themes or contribute features?
              </h3>
              <p className="text-slate-600 dark:text-[#8b949e] text-xs sm:text-sm leading-relaxed">
                This project is 100% free and open source. Fork the repository, propose new visual effects, add color palettes, or help improve the SVG compiler. All pull requests and ideas are warmly welcomed!
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <a
                href="https://github.com/Man0dya/Readme-Contribution-Graph-Generator/fork"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-md text-xs sm:text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 dark:bg-[#238636] dark:hover:bg-[#2ea043] text-white transition-all active:scale-95"
              >
                <GitFork className="w-4 h-4" />
                <span>Fork Repository</span>
              </a>

              <a
                href="https://github.com/Man0dya/Readme-Contribution-Graph-Generator/blob/main/CONTRIBUTING.md"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-md text-xs sm:text-sm font-semibold border border-slate-300 dark:border-[#30363d] bg-white dark:bg-[#161b22] hover:bg-slate-50 dark:hover:bg-[#21262d] text-slate-800 dark:text-white transition-all active:scale-95"
              >
                <Code2 className="w-4 h-4 text-slate-500 dark:text-[#8b949e]" />
                <span>Contributing Guide</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main 4-Column Navigation & Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Brand & Mission */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                Readme Contribution Graph Generator
              </h4>
              <p className="text-slate-600 dark:text-[#8b949e] text-xs leading-relaxed">
                Generate playful bubble-shooter vector animations from your public GitHub contribution history. Zero JS runtime, dark/light adaptive, and updated daily with GitHub Actions.
              </p>
            </div>
            
            <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-[#8b949e]">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 dark:bg-[#3fb950]"></span>
              <span>Active Open-Source Project</span>
            </div>
          </div>

          {/* Column 2: Open Source & Community */}
          <div className="space-y-3">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Community & Collaboration
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://github.com/Man0dya/Readme-Contribution-Graph-Generator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-slate-600 dark:text-[#8b949e] hover:text-emerald-600 dark:hover:text-[#3fb950] transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Man0dya/Readme-Contribution-Graph-Generator/fork"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-slate-600 dark:text-[#8b949e] hover:text-emerald-600 dark:hover:text-[#3fb950] transition-colors"
                >
                  <GitFork className="w-3.5 h-3.5" />
                  <span>Fork & Customize</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Man0dya/Readme-Contribution-Graph-Generator/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-slate-600 dark:text-[#8b949e] hover:text-emerald-600 dark:hover:text-[#3fb950] transition-colors"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Issues & Feature Requests</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Man0dya/Readme-Contribution-Graph-Generator/discussions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-slate-600 dark:text-[#8b949e] hover:text-emerald-600 dark:hover:text-[#3fb950] transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Community Discussions</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Documentation & Guides */}
          <div className="space-y-3">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Documentation & Guides
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://github.com/Man0dya/Readme-Contribution-Graph-Generator#quick-start"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-slate-600 dark:text-[#8b949e] hover:text-emerald-600 dark:hover:text-[#3fb950] transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>GitHub Action Setup</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Man0dya/Readme-Contribution-Graph-Generator/blob/main/CONTRIBUTING.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-slate-600 dark:text-[#8b949e] hover:text-emerald-600 dark:hover:text-[#3fb950] transition-colors"
                >
                  <FileCode2 className="w-3.5 h-3.5" />
                  <span>Contributing Guidelines</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Man0dya/Readme-Contribution-Graph-Generator/blob/main/CODE_OF_CONDUCT.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-slate-600 dark:text-[#8b949e] hover:text-emerald-600 dark:hover:text-[#3fb950] transition-colors"
                >
                  <HeartHandshake className="w-3.5 h-3.5" />
                  <span>Code of Conduct</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Man0dya/Readme-Contribution-Graph-Generator/blob/main/SECURITY.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-slate-600 dark:text-[#8b949e] hover:text-emerald-600 dark:hover:text-[#3fb950] transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Security Policy</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Author & Project Links */}
          <div className="space-y-3">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Author & Project
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://github.com/Man0dya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-slate-600 dark:text-[#8b949e] hover:text-emerald-600 dark:hover:text-[#3fb950] transition-colors"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Created by @Man0dya</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Man0dya/Readme-Contribution-Graph-Generator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-slate-600 dark:text-[#8b949e] hover:text-amber-500 transition-colors"
                >
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>Star on GitHub</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Man0dya/Readme-Contribution-Graph-Generator/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-slate-600 dark:text-[#8b949e] hover:text-emerald-600 dark:hover:text-[#3fb950] transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Releases & Changelog</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & License */}
        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-[#21262d] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-[#8b949e]">
          <div>
            <span>© {new Date().getFullYear()} Man0dya. Released under the </span>
            <a
              href="https://github.com/Man0dya/Readme-Contribution-Graph-Generator/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-700 dark:text-white hover:text-emerald-600 dark:hover:text-[#3fb950] underline underline-offset-2 transition-colors"
            >
              MIT License
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <span>Free & Open Source for the Developer Community</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
