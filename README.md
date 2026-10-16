# Vipin's Blogs<!-- omit in toc -->

A personal blogging website built with **Next.js 15**, **Tailwind CSS**, and **Wisp CMS** — where I document my experiences and thoughts.

## About

Hey there! I'm Vipin, its my blogging website where i post my experiences and thoughts, about life, travel, food, tech and everything i find interesting.

## Tech Stack

- [Next.js 15](https://nextjs.org/) — App Router & React Server Components
- [Wisp CMS](https://wisp.blog/) — headless CMS for writing and managing posts
- [Tailwind CSS](https://tailwindcss.com/) — utility-first styling
- [Shadcn UI](https://ui.shadcn.com/) — accessible UI components
- [TypeScript](https://www.typescriptlang.org/) — type safety throughout
- [Cloudflare Images](https://developers.cloudflare.com/images/) — image hosting and delivery

## Features

- ⚡ Server-side rendering with Next.js 15 Server Components
- 📱 Fully responsive layout
- 🏷️ Filter posts by tags
- 🌓 Light & dark mode
- 🖼️ Blur-up image loading (smooth placeholder → full quality)
- 🗺️ Auto-generated sitemap
- 🖼️ Automatic Open Graph image generation
- 🔗 AI-powered related post suggestions
- 📡 RSS feed

## Getting Started

Install dependencies:

```bash
npm i --legacy-peer-deps
```

> **Note:** `--legacy-peer-deps` is required due to `next-themes` not yet supporting React 19. Make sure to set this as the install command on Vercel too.

Copy the environment file and fill in your Wisp Blog ID:

```bash
cp .env.example .env
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_BLOG_ID` | Your Blog ID from [Wisp CMS](https://wisp.blog/) |
| `NEXT_PUBLIC_BLOG_DISPLAY_NAME` | Display name shown in the header |
| `NEXT_PUBLIC_BASE_URL` | Base URL of the deployed site |
| `OG_IMAGE_SECRET` | Secret for signing Open Graph image URLs |