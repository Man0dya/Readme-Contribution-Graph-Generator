import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, Download, Code, Settings, Terminal, Palette, Sun, Moon, Gauge, Eye } from 'lucide-react'

// Color theme presets
const THEME_PRESETS = [
  {
    id: 'github',
    name: 'GitHub Classic',
    shooter: '#216e39',
    projectile: '#f59e0b', // Glowing Amber / Gold laser
    explosion: '#ff6b35',
    noContributionLight: '#ebedf0',
    noContributionDark: '#161b22',
    levels: { 0: '#ebedf0', 1: '#9be9a8', 2: '#40c463', 3: '#30a14e', 4: '#216e39' },
    previewDot: '#30a14e'
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk Neon',
    shooter: '#ff007f',
    projectile: '#00f0ff', // Electric Neon Cyan
    explosion: '#00f0ff',
    noContributionLight: '#e2e8f0',
    noContributionDark: '#0a0a14',
    levels: { 0: '#1e1b4b', 1: '#4338ca', 2: '#06b6d4', 3: '#00f0ff', 4: '#ff007f' },
    previewDot: '#ff007f'
  },
  {
    id: 'dracula',
    name: 'Dracula',
    shooter: '#bd93f9',
    projectile: '#ff79c6', // Hot Neon Pink
    explosion: '#ff79c6',
    noContributionLight: '#f1f5f9',
    noContributionDark: '#1e1f29',
    levels: { 0: '#282a36', 1: '#6272a4', 2: '#8be9fd', 3: '#50fa7b', 4: '#bd93f9' },
    previewDot: '#bd93f9'
  },
  {
    id: 'sunset',
    name: 'Sunset Fire',
    shooter: '#f97316',
    projectile: '#fde047', // Blazing Solar Yellow
    explosion: '#ef4444',
    noContributionLight: '#fff7ed',
    noContributionDark: '#18110b',
    levels: { 0: '#fed7aa', 1: '#fb923c', 2: '#f97316', 3: '#ea580c', 4: '#c2410c' },
    previewDot: '#f97316'
  },
  {
    id: 'ocean',
    name: 'Ocean Breeze',
    shooter: '#0284c7',
    projectile: '#38bdf8', // Radiant Aqua Cyan
    explosion: '#14b8a6',
    noContributionLight: '#f0f9ff',
    noContributionDark: '#081426',
    levels: { 0: '#bae6fd', 1: '#38bdf8', 2: '#0ea5e9', 3: '#0284c7', 4: '#0369a1' },
    previewDot: '#0ea5e9'
  },
  {
    id: 'monokai',
    name: 'Monokai Pro',
    shooter: '#a6e22e',
    projectile: '#ffd866', // Bright Yellow Flare
    explosion: '#fd971f',
    noContributionLight: '#f8fafc',
    noContributionDark: '#1e1e1e',
    levels: { 0: '#333333', 1: '#66d9ef', 2: '#a6e22e', 3: '#e6db74', 4: '#f92672' },
    previewDot: '#a6e22e'
  }
]

const CodeGenerator = ({ username, contributionData }) => {
  const [copiedWorkflow, setCopiedWorkflow] = useState(false)
  const [copiedReadme, setCopiedReadme] = useState(false)
  const [activeTab, setActiveTab] = useState('workflow') // 'workflow' | 'readme'
  const [selectedTheme, setSelectedTheme] = useState(THEME_PRESETS[0])
  const [previewThemeMode, setPreviewThemeMode] = useState('dark') // 'dark' | 'light'
  const [animationSpeed, setAnimationSpeed] = useState('normal') // 'fast' | 'normal' | 'slow'
  const [hideZeroDays, setHideZeroDays] = useState(false)
  const [animatedFileName, setAnimatedFileName] = useState('github-contribution-animation.svg')
  const [readmeMode, setReadmeMode] = useState('auto') // 'auto' | 'light' | 'dark'

  const speedMul = animationSpeed === 'fast' ? 0.6 : animationSpeed === 'slow' ? 1.5 : 1.0

  const getContributionColorForLevel = (level, isDark = false) => {
    if (level === 0) {
      return isDark ? selectedTheme.noContributionDark : selectedTheme.noContributionLight
    }
    return selectedTheme.levels[level] || selectedTheme.levels[1]
  }

  // Build Bubble Shooter SVG (SMIL, high efficiency)
  const buildBubbleShooterSVG = ({ data, width = 1200, height = 340, speedScale = 1.0, isDark = false, transparent = true, maxTargets = 75 }) => {
    if (!data || data.length === 0) {
      return `<svg width="800" height="220" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#0d1117"/>
        <text x="400" y="110" text-anchor="middle" fill="#8b949e" font-family="sans-serif" font-size="14">No contribution data available</text>
      </svg>`
    }

    const weeks = data.length
    const days = 7
    const cell = Math.max(10, Math.min(14, Math.floor(width / Math.max(30, weeks))))
    const radius = Math.floor(cell * 0.45)
    const gridW = weeks * cell
    const gridH = days * cell
    const originX = 0
    const originY = 0

    // Generous breathing room above cannon
    const shooterX = Number((originX + gridW / 2).toFixed(1))
    const shooterYOffset = 52
    const shooterY = originY + gridH + shooterYOffset
    const muzzleY = shooterY - 26

    const noContribColor = isDark ? selectedTheme.noContributionDark : selectedTheme.noContributionLight
    const projColor = selectedTheme.projectile || '#f59e0b'

    // Build list of bubbles with centers
    const bubbles = []
    data.forEach((week, wi) => {
      week.forEach((day, di) => {
        const cx = Number((originX + wi * cell + cell / 2).toFixed(1))
        const cy = Number((originY + di * cell + cell / 2).toFixed(1))
        const isGreen = day.count > 0
        bubbles.push({ cx, cy, level: day.level, isGreen })
      })
    })

    // Sample targets evenly across active days
    const allActive = bubbles.filter(b => b.isGreen)
    let prunedTargets = []
    if (allActive.length <= maxTargets) {
      prunedTargets = allActive
    } else {
      const step = allActive.length / maxTargets
      for (let i = 0; i < maxTargets; i++) {
        prunedTargets.push(allActive[Math.floor(i * step)])
      }
    }

    // Dynamic travel time based on distance from cannon
    const maxDist = Math.hypot(gridW / 2, gridH + shooterYOffset)
    const tGap = Number((0.15 * speedScale).toFixed(2))

    let currentTime = 0
    const scheduledTargets = prunedTargets.map((t, i) => {
      const dx = t.cx - shooterX
      const dy = t.cy - muzzleY
      const dist = Math.hypot(dx, dy)
      const ratio = Math.max(0, Math.min(1, dist / maxDist))
      const duration = Number(((0.18 + 0.36 * ratio) * speedScale).toFixed(2))
      const begin = Number(currentTime.toFixed(2))
      currentTime += duration + tGap
      return { ...t, index: i, duration, begin }
    })

    const total = scheduledTargets.length > 0 ? Number((currentTime + 0.4).toFixed(2)) : 2

    const shotIndexByPos = new Map()
    scheduledTargets.forEach((t) => {
      shotIndexByPos.set(`${t.cx},${t.cy}`, t.index)
    })

    // Grid bubbles
    let gridStr = ''
    bubbles.forEach((b) => {
      if (hideZeroDays && !b.isGreen) return
      const fill = getContributionColorForLevel(b.level, isDark)
      const key = `${b.cx},${b.cy}`
      const shotIndex = shotIndexByPos.get(key)

      if (shotIndex === undefined) {
        gridStr += `\n    <circle cx="${b.cx}" cy="${b.cy}" r="${radius}" fill="${fill}"/>`
      } else {
        const shotId = `s${shotIndex}`
        const popUp = Number((radius * 1.35).toFixed(1))
        gridStr += `\n    <circle cx="${b.cx}" cy="${b.cy}" r="${radius}" fill="${fill}">\n      <set attributeName="fill" to="${fill}" begin="cycle.begin"/>\n      <animate attributeName="r" values="${radius};${popUp};${radius}" keyTimes="0;0.5;1" begin="${shotId}.end" dur="0.2s" fill="freeze"/>\n      <set attributeName="fill" to="${noContribColor}" begin="${shotId}.end+0.12s"/>\n    </circle>`
      }
    })

    // Bullets with trails and shockwaves/particles
    let bulletsStr = ''
    let popsStr = ''
    scheduledTargets.forEach((t) => {
      const shotId = `s${t.index}`
      const t1Begin = Number((t.begin + 0.02).toFixed(2))
      const t2Begin = Number((t.begin + 0.04).toFixed(2))

      // High-visibility energy projectile with trailing comet tail
      bulletsStr += `\n    <!-- Bullet ${t.index} -->`
      // Tail spark 2 (faint trailing spark)
      bulletsStr += `\n    <circle cx="${shooterX}" cy="${muzzleY}" r="1.5" fill="${projColor}" opacity="0">\n      <set attributeName="opacity" to="0.3" begin="cycle.begin+${t2Begin}s"/>\n      <animate attributeName="cx" from="${shooterX}" to="${t.cx}" begin="cycle.begin+${t2Begin}s" dur="${t.duration}s" fill="freeze"/>\n      <animate attributeName="cy" from="${muzzleY}" to="${t.cy}" begin="cycle.begin+${t2Begin}s" dur="${t.duration}s" fill="freeze"/>\n      <set attributeName="opacity" to="0" begin="${shotId}.end"/>\n    </circle>`
      // Tail spark 1 (close trailing plasma)
      bulletsStr += `\n    <circle cx="${shooterX}" cy="${muzzleY}" r="2.6" fill="${projColor}" opacity="0">\n      <set attributeName="opacity" to="0.55" begin="cycle.begin+${t1Begin}s"/>\n      <animate attributeName="cx" from="${shooterX}" to="${t.cx}" begin="cycle.begin+${t1Begin}s" dur="${t.duration}s" fill="freeze"/>\n      <animate attributeName="cy" from="${muzzleY}" to="${t.cy}" begin="cycle.begin+${t1Begin}s" dur="${t.duration}s" fill="freeze"/>\n      <set attributeName="opacity" to="0" begin="${shotId}.end"/>\n    </circle>`
      // Outer luminous halo
      bulletsStr += `\n    <circle cx="${shooterX}" cy="${muzzleY}" r="5.5" fill="${projColor}" opacity="0">\n      <set attributeName="opacity" to="0.35" begin="cycle.begin+${t.begin}s"/>\n      <animate attributeName="cx" from="${shooterX}" to="${t.cx}" begin="cycle.begin+${t.begin}s" dur="${t.duration}s" fill="freeze"/>\n      <animate attributeName="cy" from="${muzzleY}" to="${t.cy}" begin="cycle.begin+${t.begin}s" dur="${t.duration}s" fill="freeze"/>\n      <set attributeName="opacity" to="0" begin="${shotId}.end"/>\n    </circle>`
      // Main energetic plasma projectile
      bulletsStr += `\n    <circle cx="${shooterX}" cy="${muzzleY}" r="3.6" fill="${projColor}" opacity="0">\n      <set attributeName="opacity" to="1" begin="cycle.begin+${t.begin}s"/>\n      <animate id="${shotId}" attributeName="cx" from="${shooterX}" to="${t.cx}" begin="cycle.begin+${t.begin}s" dur="${t.duration}s" fill="freeze"/>\n      <animate attributeName="cy" from="${muzzleY}" to="${t.cy}" begin="cycle.begin+${t.begin}s" dur="${t.duration}s" fill="freeze"/>\n      <set attributeName="opacity" to="0" begin="${shotId}.end"/>\n    </circle>`
      // Ultra-bright white hot core
      bulletsStr += `\n    <circle cx="${shooterX}" cy="${muzzleY}" r="1.8" fill="#ffffff" opacity="0">\n      <set attributeName="opacity" to="0.95" begin="cycle.begin+${t.begin}s"/>\n      <animate attributeName="cx" from="${shooterX}" to="${t.cx}" begin="cycle.begin+${t.begin}s" dur="${t.duration}s" fill="freeze"/>\n      <animate attributeName="cy" from="${muzzleY}" to="${t.cy}" begin="cycle.begin+${t.begin}s" dur="${t.duration}s" fill="freeze"/>\n      <set attributeName="opacity" to="0" begin="${shotId}.end"/>\n    </circle>`

      const popRadius = Number((radius * 1.8).toFixed(1))
      // Shockwave impact ring
      popsStr += `\n    <circle cx="${t.cx}" cy="${t.cy}" r="${radius}" fill="none" stroke="${selectedTheme.explosion}" stroke-width="2" opacity="0">\n      <set attributeName="opacity" to="1" begin="${shotId}.end"/>\n      <animate attributeName="r" from="${radius}" to="${popRadius}" begin="${shotId}.end" dur="0.25s" fill="freeze"/>\n      <animate attributeName="opacity" values="1;0.8;0" keyTimes="0;0.5;1" begin="${shotId}.end" dur="0.25s" fill="freeze"/>\n    </circle>`

      // Center impact flash
      popsStr += `\n    <circle cx="${t.cx}" cy="${t.cy}" r="2.5" fill="#ffffff" opacity="0">\n      <set attributeName="opacity" to="1" begin="${shotId}.end"/>\n      <animate attributeName="r" values="2.5;4.5;0" keyTimes="0;0.4;1" begin="${shotId}.end" dur="0.2s" fill="freeze"/>\n      <animate attributeName="opacity" values="1;0.5;0" keyTimes="0;0.4;1" begin="${shotId}.end" dur="0.2s" fill="freeze"/>\n    </circle>`

      // 4 Directional sparks
      for (let pi = 0; pi < 4; pi++) {
        const ang = (pi * Math.PI) / 2 + Math.PI / 4
        const px = Number((t.cx + Math.cos(ang) * (radius * 1.6)).toFixed(1))
        const py = Number((t.cy + Math.sin(ang) * (radius * 1.6)).toFixed(1))
        popsStr += `\n    <circle cx="${t.cx}" cy="${t.cy}" r="1.4" fill="${selectedTheme.explosion}" opacity="0">\n      <set attributeName="opacity" to="1" begin="${shotId}.end"/>\n      <animate attributeName="cx" from="${t.cx}" to="${px}" begin="${shotId}.end" dur="0.22s" fill="freeze"/>\n      <animate attributeName="cy" from="${t.cy}" to="${py}" begin="${shotId}.end" dur="0.22s" fill="freeze"/>\n      <animate attributeName="opacity" values="1;0.7;0" keyTimes="0;0.5;1" begin="${shotId}.end" dur="0.22s" fill="freeze"/>\n    </circle>`
      }
    })

    const bgRect = transparent ? '' : `<rect width="100%" height="100%" fill="${isDark ? '#0d1117' : '#ffffff'}" rx="4"/>`
    const vbW = gridW
    const vbH = gridH + shooterYOffset + 8

    const turretBaseBorder = isDark ? '#30363d' : '#afb8c1'
    const turretBaseFill = isDark ? '#21262d' : '#d0d7de'
    const turretDeckFill = isDark ? '#161b22' : '#f6f8fa'
    const barrelRailFill = isDark ? '#484f58' : '#8c959f'
    const muzzleCrownFill = isDark ? '#21262d' : '#30363d'

    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="100%" viewBox="0 0 ${vbW} ${vbH}" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
${bgRect}
  <!-- cycle timer -->
  <rect id="cycleTimer" x="-10" y="-10" width="1" height="1" fill="none">
    <animate id="cycle" attributeName="x" from="-10" to="-9" begin="0s;cycle.end+1s" dur="${total}s" fill="freeze"/>
  </rect>

  <!-- Turret Cannon Platform & Housing -->
  <g id="cannon-turret">
    <!-- Base Chassis Track -->
    <rect x="${shooterX - 22}" y="${shooterY - 4}" width="44" height="8" rx="4" fill="${turretBaseFill}" stroke="${turretBaseBorder}" stroke-width="1.2"/>
    <rect x="${shooterX - 16}" y="${shooterY - 8}" width="32" height="5" rx="2.5" fill="${turretDeckFill}"/>
    <rect x="${shooterX - 12}" y="${shooterY - 7}" width="24" height="2" rx="1" fill="${selectedTheme.shooter}" opacity="0.9"/>

    <!-- Left & Right Reinforced Barrels -->
    <rect x="${shooterX - 5.5}" y="${shooterY - 24}" width="3.2" height="14" rx="1.6" fill="${barrelRailFill}"/>
    <rect x="${shooterX + 2.3}" y="${shooterY - 24}" width="3.2" height="14" rx="1.6" fill="${barrelRailFill}"/>
    <!-- Central Plasma Accelerator Chamber -->
    <rect x="${shooterX - 2}" y="${shooterY - 22}" width="4" height="11" rx="1" fill="${selectedTheme.shooter}" opacity="0.85"/>

    <!-- Heavy Muzzle Crown & Core Emitter -->
    <rect x="${shooterX - 6.5}" y="${shooterY - 26}" width="13" height="4" rx="1.5" fill="${muzzleCrownFill}" stroke="${selectedTheme.shooter}" stroke-width="1"/>
    <circle cx="${shooterX}" cy="${shooterY - 26}" r="2.2" fill="${selectedTheme.shooter}"/>
    <circle cx="${shooterX}" cy="${shooterY - 26}" r="1.1" fill="#ffffff"/>

    <!-- Swivel Dome & Reactor Core -->
    <circle cx="${shooterX}" cy="${shooterY - 12}" r="11" fill="${turretDeckFill}" stroke="${turretBaseBorder}" stroke-width="1.5"/>
    <circle cx="${shooterX}" cy="${shooterY - 12}" r="7.5" fill="${isDark ? '#0d1117' : '#ffffff'}" stroke="${selectedTheme.shooter}" stroke-width="1.5"/>
    <circle cx="${shooterX}" cy="${shooterY - 12}" r="4" fill="${selectedTheme.shooter}"/>
    <circle cx="${shooterX}" cy="${shooterY - 12}" r="1.8" fill="#ffffff"/>
  </g>

  <!-- grid of bubbles -->
  ${gridStr}

  <!-- bullets -->
  ${bulletsStr}

  <!-- pops and particles -->
  ${popsStr}
</svg>`
  }

  // Build README snippet
  const buildReadmeSnippet = () => {
    const base = animatedFileName || 'github-contribution-animation.svg'
    if (readmeMode === 'dark') {
      const dark = base.endsWith('.svg') ? base.replace(/\.svg$/, '-dark.svg') : `${base}-dark.svg`
      return `![${username}'s Contribution Animation](${dark})`
    }
    if (readmeMode === 'light') {
      return `![${username}'s Contribution Animation](${base})`
    }
    const dark = base.endsWith('.svg') ? base.replace(/\.svg$/, '-dark.svg') : `${base}-dark.svg`
    return `<picture>\n  <source media="(prefers-color-scheme: dark)" srcset="${dark}" />\n  <img alt="${username}'s Contribution Animation" src="${base}" />\n</picture>`
  }

  // Generate GitHub Action YAML
  const generateWorkflowYAML = () => [
    'name: Generate Contribution Animation',
    '',
    'on:',
    '  schedule:',
    "    - cron: '0 0 * * *' # Daily at 00:00 UTC",
    '  workflow_dispatch: {}',
    '  push:',
    '    branches: [ main ]',
    '',
    'permissions:',
    '  contents: write',
    '',
    'jobs:',
    '  generate:',
    '    runs-on: ubuntu-latest',
    '    steps:',
    '      - name: Checkout repository',
    '        uses: actions/checkout@v4',
    '',
    '      - name: Generate Contribution Animation',
    '        uses: Man0dya/Readme-Contribution-Graph-Generator@main',
    '        with:',
    `          github_user_name: \${{ github.repository_owner }}`,
    '',
    '      - name: Commit and push SVG',
    '        uses: stefanzweifel/git-auto-commit-action@v5',
    '        with:',
    "          commit_message: 'chore: update contribution animation [skip ci]'",
    '          file_pattern: "*-contribution-animation*.svg contribution-animation*.svg github-contribution-animation*.svg"',
  ].join('\n')

  const handleCopyWorkflow = async () => {
    try {
      await navigator.clipboard.writeText(generateWorkflowYAML())
      setCopiedWorkflow(true)
      setTimeout(() => setCopiedWorkflow(false), 2000)
    } catch (err) {
      console.error('Failed to copy workflow:', err)
    }
  }

  const handleCopyReadme = async () => {
    try {
      await navigator.clipboard.writeText(buildReadmeSnippet())
      setCopiedReadme(true)
      setTimeout(() => setCopiedReadme(false), 2000)
    } catch (err) {
      console.error('Failed to copy README snippet:', err)
    }
  }

  const downloadSVGFile = (content, filename) => {
    const blob = new Blob([content], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const totalContributions = contributionData ? contributionData.flat().reduce((sum, d) => sum + d.count, 0) : 0

  return (
    <section className="py-2 space-y-6">
      {/* Overview Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card border border-slate-200 dark:border-[#21262d] p-4 flex flex-wrap items-center justify-between gap-3"
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-md bg-emerald-100 dark:bg-[#238636]/20 text-emerald-600 dark:text-[#3fb950] flex items-center justify-center font-bold text-sm border border-emerald-300 dark:border-[#238636]/40">
            📊
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
              {username}&apos;s Contribution Graph
            </h3>
            <p className="text-xs text-slate-500 dark:text-neutral-400">
              {totalContributions.toLocaleString()} contributions across 53 weeks
            </p>
          </div>
        </div>

        <div>
          <span className="px-2.5 py-1 bg-slate-100 dark:bg-[#161b22] text-emerald-600 dark:text-[#3fb950] border border-slate-200 dark:border-[#30363d] rounded text-xs font-medium">
            Real Data Loaded
          </span>
        </div>
      </motion.div>

      {/* Live Preview Container (Full Width Hero) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card border border-slate-200 dark:border-[#21262d] p-4 sm:p-5 space-y-3"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-[#21262d]">
          <div className="flex items-center space-x-2">
            <Eye className="w-4 h-4 text-emerald-600 dark:text-[#3fb950]" />
            <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">Live Animation Preview</h4>
          </div>

          {/* Theme switcher for live preview */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-100 dark:bg-black border border-slate-200 dark:border-[#21262d] rounded-md p-0.5">
              <button
                type="button"
                onClick={() => setPreviewThemeMode('dark')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium transition-all ${
                  previewThemeMode === 'dark' ? 'bg-[#161b22] text-white border border-[#30363d]' : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Moon className="w-3 h-3" />
                <span>Dark</span>
              </button>
              <button
                type="button"
                onClick={() => setPreviewThemeMode('light')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium transition-all ${
                  previewThemeMode === 'light' ? 'bg-white text-slate-900 font-semibold' : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Sun className="w-3 h-3" />
                <span>Light</span>
              </button>
            </div>
          </div>
        </div>

        {/* SVG Display Stage */}
        <div 
          className={`rounded-md p-4 sm:p-6 flex items-center justify-center overflow-x-auto transition-colors duration-300 border ${
            previewThemeMode === 'dark' 
              ? 'bg-black border-[#21262d]' 
              : 'bg-white border-slate-200'
          }`}
        >
          <div 
            className="w-full"
            dangerouslySetInnerHTML={{ 
              __html: buildBubbleShooterSVG({ 
                data: contributionData, 
                speedScale: speedMul, 
                isDark: previewThemeMode === 'dark',
                transparent: true 
              }) 
            }} 
          />
        </div>
      </motion.div>

      {/* Main Grid: Customization Panel + Export / Workflow Code */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Customization Settings (5 Cols) */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="lg:col-span-5 glass-card border border-slate-200 dark:border-[#21262d] space-y-4"
        >
          <div className="flex items-center space-x-2 pb-2.5 border-b border-slate-200 dark:border-[#21262d]">
            <Settings className="w-4 h-4 text-teal-600 dark:text-[#3fb950]" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Customization</h4>
          </div>

          {/* Preset Theme Picker */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-700 dark:text-white flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-emerald-600 dark:text-[#3fb950]" />
              <span>Color Themes</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {THEME_PRESETS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSelectedTheme(t)}
                  className={`p-2 rounded-md border text-left transition-all flex items-center space-x-2 active:scale-95 ${
                    selectedTheme.id === t.id
                      ? 'bg-emerald-50 dark:bg-[#238636]/20 border-emerald-500 dark:border-[#3fb950] text-emerald-900 dark:text-white font-medium'
                      : 'bg-slate-50 dark:bg-[#161b22] border-slate-200 dark:border-[#30363d] text-slate-700 dark:text-white hover:border-slate-300 dark:hover:border-neutral-500'
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: t.previewDot }}
                  />
                  <span className="text-xs truncate">{t.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Animation Speed Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-700 dark:text-white flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-cyan-600 dark:text-[#58a6ff]" />
              <span>Speed</span>
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'fast', label: 'Fast (12s)', speed: 'fast' },
                { id: 'normal', label: 'Normal (20s)', speed: 'normal' },
                { id: 'slow', label: 'Relaxed (30s)', speed: 'slow' },
              ].map(s => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setAnimationSpeed(s.speed)}
                  className={`py-1.5 px-2 rounded-md border text-xs font-medium transition-all text-center active:scale-95 ${
                    animationSpeed === s.speed
                      ? 'bg-cyan-50 dark:bg-[#388bfd]/20 border-cyan-500 dark:border-[#58a6ff] text-cyan-900 dark:text-[#58a6ff] font-semibold'
                      : 'bg-slate-50 dark:bg-[#161b22] border-slate-200 dark:border-[#30363d] text-slate-600 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Zero days checkbox */}
          <div className="pt-1 flex items-center space-x-2">
            <input
              id="hideZero"
              type="checkbox"
              checked={hideZeroDays}
              onChange={(e) => setHideZeroDays(e.target.checked)}
              className="w-3.5 h-3.5 rounded border-slate-300 dark:border-[#30363d] text-emerald-600 focus:ring-emerald-500"
            />
            <label htmlFor="hideZero" className="text-xs text-slate-700 dark:text-white cursor-pointer">
              Hide zero-contribution bubbles
            </label>
          </div>

          {/* Direct Downloads */}
          <div className="pt-3 border-t border-slate-200 dark:border-[#21262d] space-y-2">
            <p className="text-[11px] font-semibold text-slate-500 dark:text-neutral-400 uppercase tracking-wider">
              Download SVG Files
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => downloadSVGFile(
                  buildBubbleShooterSVG({ data: contributionData, speedScale: speedMul, isDark: false, transparent: true }),
                  `${username}-contribution-animation.svg`
                )}
                className="btn-secondary py-1.5 text-xs flex items-center justify-center space-x-1.5"
              >
                <Download className="w-3.5 h-3.5 text-amber-500" />
                <span>Light SVG</span>
              </button>

              <button
                type="button"
                onClick={() => downloadSVGFile(
                  buildBubbleShooterSVG({ data: contributionData, speedScale: speedMul, isDark: true, transparent: true }),
                  `${username}-contribution-animation-dark.svg`
                )}
                className="btn-secondary py-1.5 text-xs flex items-center justify-center space-x-1.5"
              >
                <Download className="w-3.5 h-3.5 text-[#58a6ff]" />
                <span>Dark SVG</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Integration & README Snippets (7 Cols) */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="lg:col-span-7 glass-card border border-slate-200 dark:border-[#21262d] space-y-3 flex flex-col justify-between"
        >
          <div>
            {/* Tabs Header */}
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-200 dark:border-[#21262d]">
              <div className="flex items-center space-x-1.5">
                <button
                  type="button"
                  onClick={() => setActiveTab('workflow')}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                    activeTab === 'workflow'
                      ? 'bg-emerald-100 dark:bg-[#238636]/20 text-emerald-800 dark:text-[#3fb950] border border-emerald-300 dark:border-[#238636]/40'
                      : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>1. GitHub Actions (Automated)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('readme')}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                    activeTab === 'readme'
                      ? 'bg-emerald-100 dark:bg-[#238636]/20 text-emerald-800 dark:text-[#3fb950] border border-emerald-300 dark:border-[#238636]/40'
                      : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>2. README Markdown</span>
                </button>
              </div>
            </div>

            {/* Tab 1: Workflow Code */}
            {activeTab === 'workflow' && (
              <div className="mt-3 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-500 dark:text-neutral-400 text-[11px]">
                    .github/workflows/generate-contribution-animation.yml
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyWorkflow}
                    className="flex items-center space-x-1 px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 dark:bg-[#238636] dark:hover:bg-[#2ea043] text-white rounded-md text-xs font-medium transition-all active:scale-95"
                  >
                    {copiedWorkflow ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Workflow</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="bg-slate-900 dark:bg-black rounded-md p-3 border border-slate-800 dark:border-[#21262d] overflow-hidden">
                  <pre className="text-[11px] font-mono text-emerald-400 dark:text-[#7ee787] leading-relaxed overflow-x-auto max-h-64">
                    <code>{generateWorkflowYAML()}</code>
                  </pre>
                </div>

                <p className="text-[11px] text-slate-500 dark:text-neutral-400">
                  Runs daily at midnight UTC to keep your README animation updated automatically.
                </p>
              </div>
            )}

            {/* Tab 2: README Code */}
            {activeTab === 'readme' && (
              <div className="mt-3 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center bg-slate-100 dark:bg-black border border-slate-200 dark:border-[#21262d] rounded-md p-0.5">
                    <button
                      type="button"
                      onClick={() => setReadmeMode('auto')}
                      className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                        readmeMode === 'auto' ? 'bg-white dark:bg-[#161b22] text-emerald-700 dark:text-[#3fb950] font-semibold' : 'text-slate-600 dark:text-neutral-400'
                      }`}
                    >
                      Auto Light/Dark
                    </button>
                    <button
                      type="button"
                      onClick={() => setReadmeMode('dark')}
                      className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                        readmeMode === 'dark' ? 'bg-white dark:bg-[#161b22] text-indigo-700 dark:text-[#58a6ff] font-semibold' : 'text-slate-600 dark:text-neutral-400'
                      }`}
                    >
                      Dark Only
                    </button>
                    <button
                      type="button"
                      onClick={() => setReadmeMode('light')}
                      className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                        readmeMode === 'light' ? 'bg-white dark:bg-[#161b22] text-amber-700 dark:text-amber-400 font-semibold' : 'text-slate-600 dark:text-neutral-400'
                      }`}
                    >
                      Light Only
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyReadme}
                    className="flex items-center space-x-1 px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 dark:bg-[#238636] dark:hover:bg-[#2ea043] text-white rounded-md text-xs font-medium transition-all active:scale-95"
                  >
                    {copiedReadme ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Markdown</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="bg-slate-900 dark:bg-black rounded-md p-3 border border-slate-800 dark:border-[#21262d] overflow-hidden">
                  <pre className="text-[12px] font-mono text-cyan-300 dark:text-[#79c0ff] leading-relaxed overflow-x-auto max-h-64">
                    <code>{buildReadmeSnippet()}</code>
                  </pre>
                </div>

                <p className="text-[11px] text-slate-500 dark:text-neutral-400">
                  Paste this into your profile <code className="font-mono text-slate-700 dark:text-white dark:bg-black dark:border dark:border-[#21262d] px-1 py-0.5 rounded">README.md</code>.
                </p>
              </div>
            )}
          </div>

          {/* Quick Setup Card */}
          <div className="bg-slate-50 dark:bg-black border border-slate-200 dark:border-[#21262d] rounded-md p-3 text-xs text-slate-600 dark:text-neutral-400 space-y-1">
            <p className="font-semibold text-slate-900 dark:text-white">
              Quick Setup:
            </p>
            <ol className="list-decimal list-inside space-y-0.5 text-slate-600 dark:text-neutral-400 text-[11px]">
              <li>Commit workflow file into <code className="font-mono text-slate-700 dark:text-white dark:bg-black dark:border dark:border-[#21262d] px-1 py-0.5 rounded">.github/workflows/</code></li>
              <li>Paste markdown snippet into <code className="font-mono text-slate-700 dark:text-white dark:bg-black dark:border dark:border-[#21262d] px-1 py-0.5 rounded">README.md</code></li>
            </ol>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CodeGenerator