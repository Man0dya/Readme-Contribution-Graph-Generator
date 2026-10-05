# Readme Contribution Graph Generator

An open-source animation library & generator hub that transforms your GitHub contribution calendar into dynamic, native SMIL-animated SVGs for your GitHub profile README.

**Live Generator & Style Library:** [https://man0dya.github.io/Readme-Contribution-Graph-Generator](https://man0dya.github.io/Readme-Contribution-Graph-Generator)

---

## 🎨 Featured Animation Styles

### 1. Cannon Blast *(Ready to Use)*
An arcade sci-fi turret mounted above your GitHub calendar, firing high-speed plasma energy projectiles with trailing comet particles that explode contribution bubbles into radiant stars.

### 2. Community Style Library *(Open for PRs)*
This project is built as an open extensible library. Developers can create and contribute new declarative SVG animation engines (such as *Retro Snake*, *Matrix Digital Rain*, *Audio Visualizer Wave*, and more).

---

## ⚡ Key Highlights

- **Pure Declarative SVG**: Powered by native SVG SMIL animations. Zero JavaScript runtime, zero external dependencies, zero iframe overhead.
- **Lightweight (~180 KB)**: Aggressively optimized keyframe animations and coordinate compression for instant loading on all devices.
- **Dark & Light Auto Sync**: Dual-theme generation with HTML5 `<picture>` tags that automatically adapt to viewer system settings.
- **6 Built-in Themes**: GitHub Classic, OLED Dark, Cyberpunk Neon, Synthwave 80s, Solarized Dark, and Matrix Green.
- **Full Automation**: Includes a composite GitHub Action to automatically fetch and update your profile SVG daily at midnight UTC.

---

## 🚀 Quick Start

### Method 1: Automated Daily Sync (GitHub Actions — Recommended)

Keep your profile README updated automatically every day without any manual uploads.

#### 1. Create the Workflow File

In your special GitHub profile repository (e.g. `username/username`), create `.github/workflows/generate-contribution-animation.yml`:

```yaml
name: Generate Contribution Animation

on:
  schedule:
    - cron: '0 0 * * *' # Runs daily at midnight UTC
  workflow_dispatch:
  push:
    branches: [ main ]

permissions:
  contents: write

jobs:
  generate:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Generate Contribution Animation
        uses: Man0dya/Readme-Contribution-Graph-Generator@main
        with:
          github_user_name: ${{ github.repository_owner }}

      - name: Commit and push updated SVGs
        uses: stefanzweifel/git-auto-commit-action@v5
        with:
          commit_message: "chore: update contribution animation [skip ci]"
          file_pattern: "*-contribution-animation*.svg contribution-animation*.svg github-contribution-animation*.svg"
```

#### 2. Enable Repository Write Permissions

1. In your GitHub profile repository, navigate to **Settings** > **Actions** > **General**.
2. Scroll to **Workflow permissions** and select **Read and write permissions**.
3. Click **Save**.

#### 3. Embed in Your Profile README

Add the following snippet to your profile `README.md` to automatically support both light and dark themes:

```html
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="github-contribution-animation-dark.svg" />
  <img alt="Contribution Animation" src="github-contribution-animation.svg" />
</picture>
```

---

### Method 2: Manual Download (Web Application)

If you prefer not to use GitHub Actions, you can generate and download the SVGs directly via the web interface:

1. Open the [Live Generator](https://man0dya.github.io/Readme-Contribution-Graph-Generator).
2. Enter your GitHub username.
3. Choose your theme, animation speed, and target preferences.
4. Click **Download Animated SVG** (or **Download Dark Mode SVG**).
5. Save the downloaded `.svg` file into your repository and reference it in your `README.md`:

```markdown
![My Contribution Animation](github-contribution-animation.svg)
```

---

## 🛠️ GitHub Action Input Reference

| Parameter | Description | Required | Default |
|---|---|:---:|:---:|
| `github_user_name` | GitHub username whose contributions will be rendered | **Yes** | `${{ github.repository_owner }}` |
| `github_token` | GitHub Token with read access (prevents rate limits) | No | `${{ github.token }}` |
| `output_dir` | Directory where generated SVG files will be stored | No | `.` |
| `speed` | Animation velocity: `slow`, `normal`, or `fast` | No | `normal` |
| `max_targets` | Maximum number of active animated targets per cycle | No | `75` |

### Custom Configuration Example

```yaml
- name: Generate Contribution Animation
  uses: Man0dya/Readme-Contribution-Graph-Generator@main
  with:
    github_user_name: your-username
    speed: fast
    max_targets: 100
    output_dir: ./assets
```

---

## 💻 Local Development

### Prerequisites

- [Node.js](https://nodejs.org/) 18.0 or higher (20 LTS recommended)
- [npm](https://www.npmjs.com/) 9.0 or higher

### Installation & Run

1. Clone the repository:
   ```bash
   git clone https://github.com/Man0dya/Readme-Contribution-Graph-Generator.git
   cd Readme-Contribution-Graph-Generator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start local development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

---

## 📂 Project Structure

```
Readme-Contribution-Graph-Generator/
├── .github/
│   └── workflows/
│       ├── deploy.yml                          # GitHub Pages automated deployment
│       └── generate-contribution-animation.yml  # Manual workflow dispatch action
├── action.yml                                  # GitHub Composite Action definition
├── public/                                     # Static public assets and favicon
├── scripts/
│   └── generate-svg.cjs                        # CLI SVG compiler & generation engine
├── src/
│   ├── components/
│   │   ├── CodeGenerator.jsx                   # Live preview, theme picker & exporter
│   │   ├── Footer.jsx                          # Community directory & collaboration banner
│   │   ├── Header.jsx                          # Navigation bar, library switcher & theme toggle
│   │   ├── LibraryView.jsx                     # Animation styles gallery & contribution portal
│   │   ├── TestPanel.jsx                       # Dev mode diagnostics & preview tool
│   │   └── UsernameForm.jsx                    # Username input form & quick examples
│   ├── utils/
│   │   ├── debug.js                            # Diagnostics and logging helpers
│   │   └── github.js                           # GitHub contribution data fetcher
│   ├── App.jsx                                 # Application root state & view manager
│   ├── index.css                               # Tailwind CSS & custom design system
│   └── main.jsx                                # React application entry point
├── AUTOMATION.md                               # In-depth GitHub Actions setup guide
├── CODE_OF_CONDUCT.md                          # Contributor Code of Conduct
├── CONTRIBUTING.md                             # Contribution guide for new styles & fixes
├── LICENSE                                     # MIT License
├── README.md                                   # Project documentation
├── SECURITY.md                                 # Security and vulnerability reporting
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 🤝 Contributing

We welcome all contributions! Whether you want to add a new animation style template to the library, suggest UI improvements, or fix a bug, please check out our [Contributing Guide](CONTRIBUTING.md).

---

## 📄 License

Distributed under the **MIT License**. See [LICENSE](LICENSE) for more details.
