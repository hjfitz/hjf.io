# 🧙 hjf.io

[![Netlify Status](https://api.netlify.com/api/v1/badges/d8fb5951-4d2e-4643-addd-6f830f5d21f7/deploy-status)](https://app.netlify.com/sites/hjf-beta/deploys)

Welcome to my personal website! This is a Gatsby website hosted on Netlify. I use MDX to drive the pages.

## ⚡ Structure

Every post lives under `src/mdx`. I've split posts in to hacks and blog posts. Blog posts are generic content, whilst Hacks have [some additional code](https://hjf.io/world-says-hello-back/)

## 🤖 Environment
There are some hacks that need some additional config - if you so choose to use this website, you'll need:
```ini
# required for up to date tweets
TWITTER_API_KEY=
TWITTER_API_SECRET=
TWITTER_BEARER_TOKEN=

# required for /spotify
GATSBY_SPOTIFY_REDIRECT_URI=
```

## 🖊️ Todo
There's a lot to do still - no one's perfect.

- [ ] markdown linter
- [ ] make eslint work
- [x] tailwind purging
- [ ] more hacks
- [ ] precommit for building/linting
