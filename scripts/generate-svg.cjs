#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');

// Bubble-shooter animated SVG generator (SMIL-based), background-free

// Resolve username for which to generate the graph
// Priority: explicit env CONTRIBUTION_USERNAME > repo owner from GITHUB_REPOSITORY
const explicitUsername = process.env.CONTRIBUTION_USERNAME && process.env.CONTRIBUTION_USERNAME.trim();
const repoOwner = process.env.GITHUB_REPOSITORY && process.env.GITHUB_REPOSITORY.split('/')[0];
const username = explicitUsername || repoOwner;
// Accept token from common env names for flexibility
const githubToken = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || process.env.GITHUB_AUTH_TOKEN;

// Configuration inputs
const outputDir = process.env.OUTPUT_DIR || '.';
const speedConfig = (process.env.ANIMATION_SPEED || 'normal').toLowerCase();
const speedMul = speedConfig === 'fast' ? 0.6 : speedConfig === 'slow' ? 1.5 : 1.0;
const maxTargets = parseInt(process.env.MAX_TARGETS, 10) || 75;

console.log(`🎯 Generating bubble-shooter animation for: ${username || '(unknown)'}`);
console.log(`📦 Output directory: ${outputDir}`);
console.log(`⏱️ Animation speed: ${speedConfig} (scale: ${speedMul})`);
console.log(`🎯 Max targets: ${maxTargets}`);
console.log(`🔑 Token available: ${githubToken ? 'Yes' : 'No'}`);

if (!username) {
  console.error('❌ Username not resolved. Set CONTRIBUTION_USERNAME or ensure GITHUB_REPOSITORY is available in the environment.');
  console.error('   Example (GitHub Actions): env.CONTRIBUTION_USERNAME: ${{ github.repository_owner }}');
  process.exit(1);
}

// Fetch contribution data from GitHub GraphQL or Public Fallback
async function fetchContributionData(login) {
  if (githubToken) {
    return new Promise((resolve, reject) => {
      const query = `
        query($username: String!) {
          user(login: $username) {
            contributionsCollection {
              contributionCalendar {
                weeks {
                  contributionDays {
                    contributionCount
                    contributionLevel
                    date
                    weekday
                  }
                }
              }
            }
          }
        }
      `;

      const postData = JSON.stringify({ query, variables: { username: login } });

      const req = https.request(
        {
          hostname: 'api.github.com',
          port: 443,
          path: '/graphql',
          method: 'POST',
          headers: {
            Authorization: `Bearer ${githubToken}`,
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData),
            'User-Agent': 'contribution-animation-generator',
            Accept: 'application/vnd.github.v4+json',
          },
        },
        (res) => {
          let data = '';
          res.on('data', (chunk) => (data += chunk));
          res.on('end', () => {
            try {
              if (res.statusCode !== 200) {
                throw new Error(`GitHub API status ${res.statusCode}`);
              }
              const response = JSON.parse(data);
              if (response.errors) {
                throw new Error(`GraphQL Error: ${JSON.stringify(response.errors)}`);
              }
              const weeks = response?.data?.user?.contributionsCollection?.contributionCalendar?.weeks;
              if (!weeks) throw new Error('Invalid response structure from GitHub API');
              resolve(weeks);
            } catch (e) {
              console.error('❌ Error parsing GraphQL response:', e.message);
              reject(e);
            }
          });
        }
      );

      req.on('error', (err) => reject(err));
      req.write(postData);
      req.end();
    });
  }

  // Fallback: Public API for token-less local runs
  return new Promise((resolve, reject) => {
    https.get(
      `https://github-contributions-api.jogruber.de/v4/${login}?y=last`,
      {
        headers: { 'User-Agent': 'contribution-animation-generator' },
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            const parsed = JSON.parse(data);
            if (!parsed.contributions || !Array.isArray(parsed.contributions)) {
              throw new Error('No contribution data returned from public API');
            }
            // Group contributions into 7-day weeks
            const days = parsed.contributions;
            const weeks = [];
            for (let i = 0; i < days.length; i += 7) {
              weeks.push({
                contributionDays: days.slice(i, i + 7).map((d) => ({
                  contributionCount: d.count,
                  contributionLevel: d.level === 0 ? 'NONE' : d.level === 1 ? 'FIRST_QUARTILE' : d.level === 2 ? 'SECOND_QUARTILE' : d.level === 3 ? 'THIRD_QUARTILE' : 'FOURTH_QUARTILE',
                  date: d.date,
                })),
              });
            }
            resolve(weeks);
          } catch (err) {
            reject(err);
          }
        });
      }
    ).on('error', (err) => reject(err));
  });
}

// Map GraphQL level to numeric 0-4
function levelToNumber(level) {
  const map = {
    NONE: 0,
    FIRST_QUARTILE: 1,
    SECOND_QUARTILE: 2,
    THIRD_QUARTILE: 3,
    FOURTH_QUARTILE: 4,
  };
  return map[level] ?? 0;
}

function getColorForLevel(numLevel, noContributionColor = '#ebedf0') {
  const colors = {
    0: noContributionColor,
    1: '#9be9a8',
    2: '#40c463',
    3: '#30a14e',
    4: '#216e39',
  };
  return colors[numLevel] || colors[0];
}

// Build Bubble Shooter SVG (SMIL, optimized)
function buildBubbleShooterSVG({ data, width = 1200, height = 340, theme, speedMul = 1, noContributionColor = '#ebedf0', transparent = true, maxTargets = 75 }) {
  const weeks = data.length;
  const days = 7;
  const cell = Math.max(10, Math.min(14, Math.floor(width / Math.max(30, weeks))));
  const radius = Math.floor(cell * 0.45);
  const gridW = weeks * cell;
  const gridH = days * cell;
  const originX = 0;
  const originY = 0;

  const shooterX = Number((originX + gridW / 2).toFixed(1));
  const shooterYOffset = 52;
  const shooterY = originY + gridH + shooterYOffset;
  const muzzleY = shooterY - 26;

  const isDark = noContributionColor === '#161b22' || noContributionColor.toLowerCase().startsWith('#1') || noContributionColor.toLowerCase().startsWith('#0');
  const projColor = theme.projectile || '#f59e0b';

  // Build bubbles with centers
  const bubbles = [];
  data.forEach((week, wi) => {
    week.forEach((day, di) => {
      const cx = Number((originX + wi * cell + cell / 2).toFixed(1));
      const cy = Number((originY + di * cell + cell / 2).toFixed(1));
      const lvl = levelToNumber(day.level);
      const isGreen = day.count > 0;
      bubbles.push({ cx, cy, level: lvl, isGreen });
    });
  });

  // Evenly sample targets across the whole year for a snappy ~20s cycle
  const allActive = bubbles.filter((b) => b.isGreen);
  let prunedTargets = [];
  if (allActive.length <= maxTargets) {
    prunedTargets = allActive;
  } else {
    const step = allActive.length / maxTargets;
    for (let i = 0; i < maxTargets; i++) {
      prunedTargets.push(allActive[Math.floor(i * step)]);
    }
  }

  // Dynamic travel time based on distance from cannon
  const maxDist = Math.hypot(gridW / 2, gridH + shooterYOffset);
  const tGap = Number((0.15 * speedMul).toFixed(2));

  let currentTime = 0;
  const scheduledTargets = prunedTargets.map((t, i) => {
    const dx = t.cx - shooterX;
    const dy = t.cy - muzzleY;
    const dist = Math.hypot(dx, dy);
    const ratio = Math.max(0, Math.min(1, dist / maxDist));
    const duration = Number(((0.18 + 0.36 * ratio) * speedMul).toFixed(2));
    const begin = Number(currentTime.toFixed(2));
    currentTime += duration + tGap;
    return { ...t, index: i, duration, begin };
  });

  const total = scheduledTargets.length > 0 ? Number((currentTime + 0.4).toFixed(2)) : 2;

  const shotIndexByPos = new Map();
  scheduledTargets.forEach((t) => shotIndexByPos.set(`${t.cx},${t.cy}`, t.index));

  // Grid with static non-targets and animated target bubbles
  let gridStr = '';
  bubbles.forEach((b) => {
    const fill = getColorForLevel(b.level, noContributionColor);
    const key = `${b.cx},${b.cy}`;
    const shotIndex = shotIndexByPos.get(key);

    if (shotIndex === undefined) {
      gridStr += `\n    <circle cx="${b.cx}" cy="${b.cy}" r="${radius}" fill="${fill}"/>`;
    } else {
      const shotId = `s${shotIndex}`;
      const popUp = Number((radius * 1.35).toFixed(1));
      gridStr += `\n    <circle cx="${b.cx}" cy="${b.cy}" r="${radius}" fill="${fill}">\n      <set attributeName="fill" to="${fill}" begin="cycle.begin"/>\n      <animate attributeName="r" values="${radius};${popUp};${radius}" keyTimes="0;0.5;1" begin="${shotId}.end" dur="0.2s" fill="freeze"/>\n      <set attributeName="fill" to="${noContributionColor}" begin="${shotId}.end+0.12s"/>\n    </circle>`;
    }
  });

  // Bullets with trails and shockwaves/particles
  let bulletsStr = '';
  let popsStr = '';
  scheduledTargets.forEach((t) => {
    const shotId = `s${t.index}`;
    const t1Begin = Number((t.begin + 0.02).toFixed(2));
    const t2Begin = Number((t.begin + 0.04).toFixed(2));

    // High-visibility energy projectile with trailing comet tail
    bulletsStr += `\n    <!-- Bullet ${t.index} -->`;
    // Tail spark 2 (faint trailing spark)
    bulletsStr += `\n    <circle cx="${shooterX}" cy="${muzzleY}" r="1.5" fill="${projColor}" opacity="0">\n      <set attributeName="opacity" to="0.3" begin="cycle.begin+${t2Begin}s"/>\n      <animate attributeName="cx" from="${shooterX}" to="${t.cx}" begin="cycle.begin+${t2Begin}s" dur="${t.duration}s" fill="freeze"/>\n      <animate attributeName="cy" from="${muzzleY}" to="${t.cy}" begin="cycle.begin+${t2Begin}s" dur="${t.duration}s" fill="freeze"/>\n      <set attributeName="opacity" to="0" begin="${shotId}.end"/>\n    </circle>`;
    // Tail spark 1 (close trailing plasma)
    bulletsStr += `\n    <circle cx="${shooterX}" cy="${muzzleY}" r="2.6" fill="${projColor}" opacity="0">\n      <set attributeName="opacity" to="0.55" begin="cycle.begin+${t1Begin}s"/>\n      <animate attributeName="cx" from="${shooterX}" to="${t.cx}" begin="cycle.begin+${t1Begin}s" dur="${t.duration}s" fill="freeze"/>\n      <animate attributeName="cy" from="${muzzleY}" to="${t.cy}" begin="cycle.begin+${t1Begin}s" dur="${t.duration}s" fill="freeze"/>\n      <set attributeName="opacity" to="0" begin="${shotId}.end"/>\n    </circle>`;
    // Outer luminous halo
    bulletsStr += `\n    <circle cx="${shooterX}" cy="${muzzleY}" r="5.5" fill="${projColor}" opacity="0">\n      <set attributeName="opacity" to="0.35" begin="cycle.begin+${t.begin}s"/>\n      <animate attributeName="cx" from="${shooterX}" to="${t.cx}" begin="cycle.begin+${t.begin}s" dur="${t.duration}s" fill="freeze"/>\n      <animate attributeName="cy" from="${muzzleY}" to="${t.cy}" begin="cycle.begin+${t.begin}s" dur="${t.duration}s" fill="freeze"/>\n      <set attributeName="opacity" to="0" begin="${shotId}.end"/>\n    </circle>`;
    // Main energetic plasma projectile
    bulletsStr += `\n    <circle cx="${shooterX}" cy="${muzzleY}" r="3.6" fill="${projColor}" opacity="0">\n      <set attributeName="opacity" to="1" begin="cycle.begin+${t.begin}s"/>\n      <animate id="${shotId}" attributeName="cx" from="${shooterX}" to="${t.cx}" begin="cycle.begin+${t.begin}s" dur="${t.duration}s" fill="freeze"/>\n      <animate attributeName="cy" from="${muzzleY}" to="${t.cy}" begin="cycle.begin+${t.begin}s" dur="${t.duration}s" fill="freeze"/>\n      <set attributeName="opacity" to="0" begin="${shotId}.end"/>\n    </circle>`;
    // Ultra-bright white hot core
    bulletsStr += `\n    <circle cx="${shooterX}" cy="${muzzleY}" r="1.8" fill="#ffffff" opacity="0">\n      <set attributeName="opacity" to="0.95" begin="cycle.begin+${t.begin}s"/>\n      <animate attributeName="cx" from="${shooterX}" to="${t.cx}" begin="cycle.begin+${t.begin}s" dur="${t.duration}s" fill="freeze"/>\n      <animate attributeName="cy" from="${muzzleY}" to="${t.cy}" begin="cycle.begin+${t.begin}s" dur="${t.duration}s" fill="freeze"/>\n      <set attributeName="opacity" to="0" begin="${shotId}.end"/>\n    </circle>`;

    const popRadius = Number((radius * 1.8).toFixed(1));
    // Shockwave impact ring
    popsStr += `\n    <circle cx="${t.cx}" cy="${t.cy}" r="${radius}" fill="none" stroke="${theme.explosion}" stroke-width="2" opacity="0">\n      <set attributeName="opacity" to="1" begin="${shotId}.end"/>\n      <animate attributeName="r" from="${radius}" to="${popRadius}" begin="${shotId}.end" dur="0.25s" fill="freeze"/>\n      <animate attributeName="opacity" values="1;0.8;0" keyTimes="0;0.5;1" begin="${shotId}.end" dur="0.25s" fill="freeze"/>\n    </circle>`;

    // Center impact flash
    popsStr += `\n    <circle cx="${t.cx}" cy="${t.cy}" r="2.5" fill="#ffffff" opacity="0">\n      <set attributeName="opacity" to="1" begin="${shotId}.end"/>\n      <animate attributeName="r" values="2.5;4.5;0" keyTimes="0;0.4;1" begin="${shotId}.end" dur="0.2s" fill="freeze"/>\n      <animate attributeName="opacity" values="1;0.5;0" keyTimes="0;0.4;1" begin="${shotId}.end" dur="0.2s" fill="freeze"/>\n    </circle>`;

    // 4 Directional sparks
    for (let pi = 0; pi < 4; pi++) {
      const ang = (pi * Math.PI) / 2 + Math.PI / 4;
      const px = Number((t.cx + Math.cos(ang) * (radius * 1.6)).toFixed(1));
      const py = Number((t.cy + Math.sin(ang) * (radius * 1.6)).toFixed(1));
      popsStr += `\n    <circle cx="${t.cx}" cy="${t.cy}" r="1.4" fill="${theme.explosion}" opacity="0">\n      <set attributeName="opacity" to="1" begin="${shotId}.end"/>\n      <animate attributeName="cx" from="${t.cx}" to="${px}" begin="${shotId}.end" dur="0.22s" fill="freeze"/>\n      <animate attributeName="cy" from="${t.cy}" to="${py}" begin="${shotId}.end" dur="0.22s" fill="freeze"/>\n      <animate attributeName="opacity" values="1;0.7;0" keyTimes="0;0.5;1" begin="${shotId}.end" dur="0.22s" fill="freeze"/>\n    </circle>`;
    }
  });

  const bgRect = transparent ? '' : `\n  <rect width="100%" height="100%" fill="${isDark ? '#0d1117' : '#ffffff'}" rx="4"/>`;
  const vbW = gridW;
  const vbH = gridH + shooterYOffset + 8;

  const turretBaseBorder = isDark ? '#30363d' : '#afb8c1';
  const turretBaseFill = isDark ? '#21262d' : '#d0d7de';
  const turretDeckFill = isDark ? '#161b22' : '#f6f8fa';
  const barrelRailFill = isDark ? '#484f58' : '#8c959f';
  const muzzleCrownFill = isDark ? '#21262d' : '#30363d';

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
    <rect x="${shooterX - 12}" y="${shooterY - 7}" width="24" height="2" rx="1" fill="${theme.shooter}" opacity="0.9"/>

    <!-- Left & Right Reinforced Barrels -->
    <rect x="${shooterX - 5.5}" y="${shooterY - 24}" width="3.2" height="14" rx="1.6" fill="${barrelRailFill}"/>
    <rect x="${shooterX + 2.3}" y="${shooterY - 24}" width="3.2" height="14" rx="1.6" fill="${barrelRailFill}"/>
    <!-- Central Plasma Accelerator Chamber -->
    <rect x="${shooterX - 2}" y="${shooterY - 22}" width="4" height="11" rx="1" fill="${theme.shooter}" opacity="0.85"/>

    <!-- Heavy Muzzle Crown & Core Emitter -->
    <rect x="${shooterX - 6.5}" y="${shooterY - 26}" width="13" height="4" rx="1.5" fill="${muzzleCrownFill}" stroke="${theme.shooter}" stroke-width="1"/>
    <circle cx="${shooterX}" cy="${shooterY - 26}" r="2.2" fill="${theme.shooter}"/>
    <circle cx="${shooterX}" cy="${shooterY - 26}" r="1.1" fill="#ffffff"/>

    <!-- Swivel Dome & Reactor Core -->
    <circle cx="${shooterX}" cy="${shooterY - 12}" r="11" fill="${turretDeckFill}" stroke="${turretBaseBorder}" stroke-width="1.5"/>
    <circle cx="${shooterX}" cy="${shooterY - 12}" r="7.5" fill="${isDark ? '#0d1117' : '#ffffff'}" stroke="${theme.shooter}" stroke-width="1.5"/>
    <circle cx="${shooterX}" cy="${shooterY - 12}" r="4" fill="${theme.shooter}"/>
    <circle cx="${shooterX}" cy="${shooterY - 12}" r="1.8" fill="#ffffff"/>
  </g>

  <!-- grid of bubbles -->
  ${gridStr}

  <!-- bullets -->
  ${bulletsStr}

  <!-- pops and particles -->
  ${popsStr}
</svg>`;
}

async function main() {
  try {
    console.log('🔄 Fetching contribution data from GitHub API...');
    const weeks = await fetchContributionData(username);

    // Normalize weeks to array of arrays with {count, level}
    const normalized = weeks.map((w) =>
      w.contributionDays.map((d) => ({
        count: d.contributionCount,
        level: d.contributionLevel,
        date: d.date,
      }))
    );

    // Themes for light and dark
    const lightTheme = {
      shooter: '#216e39', // GitHub green (light)
      projectile: '#f59e0b', // Glowing Amber / Gold Laser
      explosion: '#ff6b35',
      noContribution: '#ebedf0',
    };
    const darkTheme = {
      shooter: '#39d353', // GitHub green (dark)
      projectile: '#fbbf24', // Radiant Amber / Gold Laser
      explosion: '#ff9e64',
      noContribution: '#161b22', // GitHub dark empty cell color
    };

    console.log('🎨 Generating bubble-shooter SVG (light)...');
    const svgLight = buildBubbleShooterSVG({
      data: normalized,
      width: 1200,
      height: 340,
      theme: lightTheme,
      speedMul,
      noContributionColor: lightTheme.noContribution,
      transparent: true,
      maxTargets,
    });

    console.log('🌙 Generating bubble-shooter SVG (dark)...');
    const svgDark = buildBubbleShooterSVG({
      data: normalized,
      width: 1200,
      height: 340,
      theme: darkTheme,
      speedMul,
      noContributionColor: darkTheme.noContribution,
      transparent: true,
      maxTargets,
    });

    if (outputDir && outputDir !== '.') {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputs = [
      { filename: 'github-contribution-animation.svg', content: svgLight },
      { filename: 'github-contribution-animation-dark.svg', content: svgDark },
    ];
    outputs.forEach(({ filename, content }) => {
      const filePath = path.join(outputDir, filename);
      fs.writeFileSync(filePath, content);
      console.log(`✅ Generated: ${filePath} (${(Buffer.byteLength(content, 'utf8') / 1024).toFixed(1)} KB)`);
    });

    console.log('\n✅ Done. Embed in README (auto light/dark):');
    console.log('<picture>');
    console.log(`  <source media="(prefers-color-scheme: dark)" srcset="github-contribution-animation-dark.svg" />`);
    console.log(`  <img alt="Contribution Animation" src="github-contribution-animation.svg" />`);
    console.log('</picture>');
  } catch (error) {
    console.error('❌ Error generating animation:', error.message);
    process.exit(1);
  }
}

main();