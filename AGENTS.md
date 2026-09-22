# AGENTS.md

## Project

Hexo 5.4.2 personal blog (site: Jiliuke, language zh-CN). Source only; deployed site goes to the separate `blog_hexo` repo.

## Commands

- `hexo g` — local build (generate `public/`)
- `hexo s` — local preview, check in browser (default http://localhost:4000)
- `hexo clean` — clear `public/` + `db.json` cache
- `hexo deploy` — push to `blog_hexo` repo; does **not** rebuild if `public/` already exists, so run `hexo g` first (or `hexo g -d`)
- New post: `npx hexo new "title"`
- No lint / typecheck / test at repo root. Verification = `hexo g` succeeds + browser check via `hexo s`.

## Layout

- Active theme: **BlueLake** (`theme: BlueLake` in `_config.yml`). `themes/next/` + `_config.next.yml` are leftovers — do not edit them.
- Content: `source/_posts/*.md`; site config: `_config.yml` + `_config.BlueLake.yml`.
- Theme config precedence (highest wins): `theme_config` in `_config.yml` > `_config.BlueLake.yml` > `themes/BlueLake/_config.yml`.

## Gotchas

- `render_drafts: false` — drafts never appear in builds.
- `updated_option: mtime` — any edit to a post file changes its displayed "updated" date.
- Header search needs `jsonContent.posts.text: true` in `_config.yml`.
- Gitignored: `node_modules/`, `public/`, `db.json`, `*.log`, `.deploy*/`. Untracked local dirs (do not commit): `.idea/`, `.opencode/`.
