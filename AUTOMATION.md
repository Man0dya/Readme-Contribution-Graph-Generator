# 🎯 Automated Contribution Animation Setup

Learn how to configure automated daily GitHub Actions to keep your profile README contribution animation fresh and synchronized with your latest commits.

---

## ⚡ How It Works

1. **Scheduled Trigger**: GitHub Actions runs automatically every day at midnight (00:00 UTC) or manually on demand.
2. **Data Ingestion**: Fetches your live contribution calendar data using GitHub's GraphQL/REST APIs.
3. **SVG Generation**: Compiles an optimized, SMIL-powered vector SVG animation (Cannon Blast arcade turret firing plasma projectiles at contribution targets).
4. **Auto-Commit**: Automatically commits and pushes the updated SVG directly into your repository.
5. **Always Fresh**: Your GitHub profile README displays the updated animation without any manual intervention.

---

## 🚀 Setting Up in Your Profile Repository

Follow these 3 quick steps to automate the animation in your special profile repository (`username/username`):

### 1. Create the GitHub Actions Workflow

In your profile repository, create a new file at `.github/workflows/generate-contribution-animation.yml`:

```yaml
name: Generate Contribution Animation

on:
  schedule:
    - cron: '0 0 * * *' # Runs daily at 00:00 UTC
  workflow_dispatch:   # Allows manual trigger from the GitHub Actions tab
  push:
    branches: [ main ] # Runs automatically when you push to main

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

---

### 2. Configure Action Permissions

For GitHub Actions to push the generated SVG back to your repository:

1. Open your repository on GitHub.
2. Go to **Settings** > **Actions** > **General**.
3. Scroll down to **Workflow permissions**.
4. Select **Read and write permissions**.
5. Click **Save**.

---

### 3. Embed the Animation in Your Profile README

Add the `<picture>` element to your `README.md` to automatically switch between light and dark themes based on the viewer's system preferences:

```html
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="github-contribution-animation-dark.svg" />
  <img alt="Contribution Animation" src="github-contribution-animation.svg" />
</picture>
```

Alternatively, you can embed a single theme with standard markdown:

```markdown
![My Contribution Animation](github-contribution-animation.svg)
```

---

## ⚙️ Workflow Inputs & Customization

You can customize the generation step with these optional parameters:

| Input | Description | Required | Default |
|---|---|:---:|:---:|
| `github_user_name` | GitHub username to generate the graph for | **Yes** | `${{ github.repository_owner }}` |
| `github_token` | GitHub Token for authenticated API requests (prevents rate limits) | No | `${{ github.token }}` |
| `output_dir` | Directory where SVG files will be written | No | `.` |
| `speed` | Animation velocity (`slow`, `normal`, or `fast`) | No | `normal` |
| `max_targets` | Maximum number of active animated targets per cycle | No | `75` |

### Custom Workflow Example

```yaml
- name: Generate Contribution Animation
  uses: Man0dya/Readme-Contribution-Graph-Generator@main
  with:
    github_user_name: your-username
    speed: fast
    max_targets: 90
    output_dir: ./assets
```

---

## 🔍 Troubleshooting

- **Workflow fails with 403 / Permission Denied:** Ensure you enabled **Read and write permissions** under **Settings > Actions > General > Workflow permissions**.
- **SVG does not update on README:** GitHub caches images aggressively. The raw commit push invalidates GitHub's camo proxy within a few minutes.
- **Manual Trigger:** You can test your workflow immediately at any time by navigating to your repository's **Actions** tab, selecting **Generate Contribution Animation**, and clicking **Run workflow**.