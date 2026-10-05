# Contributing to Readme Contribution Graph Generator

Thank you for your interest in contributing to **Readme Contribution Graph Generator**! We are building an open-source animation library and generator hub for developer profile READMEs, and we warmly welcome contributions from the community.

---

## 🌟 Ways to Contribute

1. **Submit a New Animation Style**: Build and integrate a new declarative SVG animation style into the library (e.g. *Retro Snake*, *Matrix Rain*, *Sound Wave*, *Solar Orbit*).
2. **Improve Existing Styles**: Enhance the **Cannon Blast** engine with new visual particle effects, lasers, or firing trajectories.
3. **Add Color Themes**: Create new color palette presets for dark and light modes.
4. **Report & Fix Bugs**: Open an issue for unexpected behavior or submit a pull request with a bug fix.
5. **Improve Documentation**: Help refine setup guides, workflow examples, and tutorials.

---

## 🎨 Adding a New Animation Style

To add a new animation style to the library:

1. **Card Entry**: Add a card entry for your style in `src/components/LibraryView.jsx` with an appropriate badge (`Ready to use`, `Open for PRs`, or `Concept Idea`).
2. **Generator Component**: Create your generator component in `src/components/` (or integrate options into `CodeGenerator.jsx`).
3. **SVG CLI Engine**: Implement the SVG template generation logic in `scripts/generate-svg.cjs` so GitHub Actions users can generate your animation style automatically.
4. **Test & Validate**: Verify that:
   - Generated SVGs animate smoothly inside GitHub profile READMEs (SMIL declarative animation, zero JS).
   - Both Dark and Light theme presets render cleanly.
   - SVG file sizes remain lightweight (~100–250 KB).

---

## 💻 Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/) 18.0 or higher (20 LTS recommended)
- [npm](https://www.npmjs.com/) 9.0 or higher

### Step-by-Step Setup

1. **Fork and clone the repository:**
   ```bash
   git clone https://github.com/<your-username>/Readme-Contribution-Graph-Generator.git
   cd Readme-Contribution-Graph-Generator
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` (or the port shown in terminal) in your browser.

4. **Verify production build:**
   ```bash
   npm run build
   ```

---

## 🌿 Git Branching & Commits

- Create a descriptive branch from `main`:
  - Features: `feat/snake-animation-style`
  - Fixes: `fix/laser-timing-issue`
  - Docs: `docs/update-actions-guide`
- Use Conventional Commit messages:
  - `feat: add matrix rain animation style`
  - `fix: resolve coordinate offset in turret laser`
  - `docs: update quick start instructions`
  - `refactor: optimize svg keyframe generator`

---

## 🚀 Pull Request Checklist

Before submitting your pull request, please make sure:

- [ ] Code compiles cleanly with `npm run build` with zero errors.
- [ ] UI components adapt cleanly to both Dark Mode and Light Mode.
- [ ] No hardcoded personal tokens or credentials are included.
- [ ] Relevant documentation or comments are added where applicable.

---

## 📜 Code of Conduct

Please review and adhere to our [Code of Conduct](CODE_OF_CONDUCT.md) in all project interactions.
