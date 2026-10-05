# Readme Contribution Graph Generator

A dynamic generator that turns your GitHub contribution graph into a playful, animated vector SVG to showcase on your GitHub profile README. Generate standalone animated SVGs instantly via the web app or automate daily updates using GitHub Actions.

**Live Generator:** [https://man0dya.github.io/Readme-Contribution-Graph-Generator](https://man0dya.github.io/Readme-Contribution-Graph-Generator)

---

## Features

- **SMIL-Powered Vector Animations**: Lightweight, self-contained SVG files that animate natively inside GitHub READMEs without external scripts or iframe dependencies.
- **Adaptive Dark & Light Modes**: Seamlessly matches your reader's system theme using standard HTML5 `<picture>` elements.
- **Theme Presets**: Multiple built-in color schemes including GitHub Classic, OLED Dark, Cyberpunk Neon, Synthwave, Solarized, and Matrix.
- **Speed & Target Customization**: Fine-tune animation duration, projectile speed, and active contribution targets.
- **Automated Daily Sync**: GitHub Action workflow keeps your contribution history updated every day at midnight.
- **Zero Configuration Required**: Works out of the box with public GitHub activity data.

---

## Quick Start

### Method 1: Automated Daily Sync (GitHub Actions)

Keep your profile README updated automatically every day without manual file uploads.

#### 1. Create the Workflow File

In your profile repository (e.g., `username/username`), create `.github/workflows/generate-contribution-animation.yml`:

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

#### 2. Configure Repository Permissions

1. Navigate to **Settings** > **Actions** > **General** in your repository.
2. Under **Workflow permissions**, select **Read and write permissions**.
3. Click **Save**.

#### 3. Embed the Animation in Your README

Add the following markup to your profile `README.md` to automatically switch between light and dark themes:

```html
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="github-contribution-animation-dark.svg" />
  <img alt="Contribution Animation" src="github-contribution-animation.svg" />
</picture>
```

---

### Method 2: Manual Download (Web App)

If you prefer not to use GitHub Actions, you can generate and download the SVGs directly:

1. Open the [Live Generator](https://man0dya.github.io/Readme-Contribution-Graph-Generator).
2. Enter your GitHub username and select your preferred theme and animation speed.
3. Click **Download Animated SVG** (or **Download Dark Mode SVG**).
4. Save the downloaded `.svg` file into the root of your GitHub repository.
5. Add the markdown link to your `README.md`:

```markdown
![My Contribution Animation](github-contribution-animation.svg)
```

---

## GitHub Action Reference

You can customize the generation step in your workflow using the following input parameters:

| Input | Description | Required | Default |
|---|---|:---:|:---:|
| `github_user_name` | The GitHub username whose contributions will be rendered | **Yes** | `${{ github.repository_owner }}` |
| `github_token` | GitHub Personal Access Token (PAT) for authenticated API requests | No | `${{ github.token }}` |
| `output_dir` | Target directory where generated SVG files will be stored | No | `.` |
| `speed` | Animation velocity: `slow`, `normal`, or `fast` | No | `normal` |
| `max_targets` | Maximum number of active contribution targets per cycle | No | `75` |

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

## Local Development

### Prerequisites

- [Node.js](https://nodejs.org/) 18.0 or higher
- [npm](https://www.npmjs.com/) 9.0 or higher

### Setup & Run

1. Clone the repository:
   ```bash
   git clone https://github.com/Man0dya/Readme-Contribution-Graph-Generator.git
   cd Readme-Contribution-Graph-Generator
   ```

2. Install project dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:3000`.

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview the production build:
   ```bash
   npm run preview
   ```

---

## Project Structure

```
Readme-Contribution-Graph-Generator/
├── .github/
│   └── workflows/
│       ├── deploy.yml                         # Automated GitHub Pages deployment
│       └── generate-contribution-animation.yml # Action workflow definition
├── action.yml                                 # GitHub Composite Action manifest
├── public/                                    # Static assets and favicon
├── scripts/
│   └── generate-svg.cjs                       # CLI SVG generator engine
├── src/
│   ├── components/
│   │   ├── CodeGenerator.jsx                  # Theme selector, live preview & exporter
│   │   ├── Footer.jsx                         # Application footer
│   │   ├── Header.jsx                         # Application header & theme switch
│   │   └── UsernameForm.jsx                   # User input & validation
│   ├── utils/
│   │   ├── debug.js                           # Logging and diagnostics
│   │   └── github.js                          # GitHub contribution data fetcher
│   ├── App.jsx                                # Main layout and state container
│   ├── index.css                              # Design system & dark mode styles
│   └── main.jsx                               # React application entry point
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## Troubleshooting

- **SVG does not render in README:** Ensure the generated SVG file is committed and pushed to the exact branch your README is rendered from (typically `main`), and verify that relative file paths match.
- **GitHub Action fails on git push:** Verify that workflow write permissions are enabled under **Settings** > **Actions** > **General** > **Workflow permissions** in your repository.
- **Private Contributions:** By default, GitHub's public API only exposes public contributions unless a token with private repo access permissions is provided.

---

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.
