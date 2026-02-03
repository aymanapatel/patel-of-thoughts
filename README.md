# Patel of thought

A fast, clean, and elegant blog built with **Astro + MDX + React**. Features automatic table of contents with scrollspy, Shiki syntax highlighting with copy buttons, rich content components, and optional analytics integration.

## ✨ Features

- 📝 **MDX Support**: Write in Markdown with React components
- 🎨 **Beautiful Design**: Clean typography with light/dark mode
- 📊 **Table of Contents**: Auto-generated with IntersectionObserver scrollspy
- 🎯 **Syntax Highlighting**: Shiki with built-in copy buttons
- 🖼️ **Rich Content**: Float images, sticky media, interactive demos
- 📈 **Reading Progress**: Visual progress bar
- ⏱️ **Reading Time**: Automatic calculation via Remark plugin
- 🔍 **SEO Optimized**: Complete meta tags and Open Graph support
- 📡 **RSS Feed**: Auto-generated feed
- 🏷️ **Tags**: Organize and filter posts
- 📊 **Analytics**: Optional PostHog, Plausible, or Sentry integration
- ⚡ **Fast**: Static site generation with minimal JavaScript

## 🚀 Quick Start

### Installation

```bash
# Clone or create your blog directory
cd blog

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:4321` to see your blog!

### Build for Production

```bash
# Type-check and build
npm run build

# Preview production build
npm run preview
```

### Testing

```bash
# Run Vitest in Node/JS-DOM mode
npm run test

# Run tests in watch mode
npm run test:watch

# Execute browser mode tests powered by Playwright
npm run test:browser
```

## 📝 Writing Posts

### Creating a New Post

Create a new `.mdx` file in `src/content/posts/`:

```mdx
---
title: "Your Post Title"
description: "A brief description of your post"
date: "2024-01-20"
tags: ["tutorial", "web-dev"]
draft: false
---

Your content here...
```

### Frontmatter Fields

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `title` | ✅ | string | Post title |
| `description` | ✅ | string | Brief summary for SEO and listings |
| `date` | ✅ | date | Publication date (ISO format) |
| `tags` | ❌ | string[] | Array of tags for categorization |
| `draft` | ❌ | boolean | Hide post in production (default: false) |
| `updated` | ❌ | date | Last updated date |
| `heroImage` | ❌ | string | Header image URL |

## 🎨 Using Components

### Float Image (Text Wrap)

```mdx
import FloatImage from '../../components/FloatImage.astro';

<FloatImage 
  src="/path/to/image.jpg" 
  alt="Description" 
  side="right"
  width="350px"
  caption="Optional caption"
/>

Your text will wrap around the image on desktop and stack on mobile.
```

**Props:**
- `src` (required): Image URL
- `alt` (required): Alt text
- `side`: `"left"` or `"right"` (default: `"left"`)
- `width`: CSS width value (default: `"300px"`)
- `caption`: Optional image caption

### Sticky Scrolling Media

```mdx
import ScrollMedia from '../../components/ScrollMedia.astro';

<ScrollMedia 
  src="/path/to/video.mp4" 
  type="video"
  poster="/path/to/poster.jpg"
  alt="Demo video"
  caption="This stays visible while you scroll"
/>

Add several paragraphs here to see the sticky effect...
```

**Props:**
- `src` (required): Media URL
- `alt` (required): Alt text
- `type`: `"video"` or `"gif"` (default: `"video"`)
- `poster`: Poster image for videos
- `caption`: Optional caption
- `width`: CSS width value for the sticky container (default: `"100%"`)

### Interactive React Components

```mdx
import Demo from '../../components/Demo.astro';
import YourComponent from '../../components/examples/YourComponent';

<Demo title="Component Preview">
  <YourComponent client:load />
</Demo>
```

**Note**: Always add `client:load` to React components for hydration.

## 🎨 Theme Customization

Edit CSS custom properties in `src/styles/global.css`:

```css
:root {
  --color-accent: #3b82f6;  /* Primary accent color */
  --reading-width: 65ch;     /* Comfortable reading width */
  --font-sans: -apple-system, ...;
}
```

Light/dark mode colors are automatically handled via `[data-theme='dark']` selector.

## 📊 Analytics Setup

The blog supports three analytics providers via environment variables. Copy `.env.example` to `.env` and configure:

### PostHog

```env
PUBLIC_POSTHOG_KEY=your_posthog_key
PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

### Plausible

```env
PUBLIC_PLAUSIBLE_DOMAIN=yourdomain.com
```

### Sentry

```env
PUBLIC_SENTRY_DSN=your_sentry_dsn
```

**No analytics will load unless you configure these variables.**

## 🚢 Deployment

### Cloudflare Pages

1. Push your code to GitHub
2. Connect repository to Cloudflare Pages
3. Use these build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. Add environment variables in Cloudflare dashboard (optional)
5. Deploy!

The site is static by default and works perfectly with Cloudflare Pages.

### VPS / Traditional Hosting

After building:

```bash
npm run build
```

Deploy the `dist/` directory to your web server:

#### Nginx Example

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/blog/dist;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

#### Caddy Example

```caddy
yourdomain.com {
    root * /var/www/blog/dist
    file_server
}
```

### Other Platforms

The static build works with any static hosting:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Any static file host

## 📁 Project Structure

```
blog/
├── public/              # Static assets
│   └── favicon.svg
├── src/
│   ├── components/      # Reusable components
│   │   ├── BaseLayout.astro
│   │   ├── ThemeToggle.tsx
│   │   ├── TableOfContents.tsx
│   │   ├── ReadingProgress.tsx
│   │   ├── FloatImage.astro
│   │   ├── ScrollMedia.astro
│   │   ├── Demo.astro
│   │   └── examples/
│   │       └── InteractiveCounter.tsx
│   ├── content/
│   │   ├── config.ts    # Content collection schema
│   │   └── posts/       # Your blog posts (.mdx)
│   ├── lib/
│   │   └── remark-reading-time.mjs
│   ├── pages/
│   │   ├── index.astro  # Home page
│   │   ├── posts/[slug].astro
│   │   ├── tags/[tag].astro
│   │   └── rss.xml.js
│   └── styles/
│       ├── global.css
│       └── prose.css
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## 🛠️ Tech Stack

- **[Astro](https://astro.build)**: Static site generator
- **[MDX](https://mdxjs.com)**: Markdown + JSX
- **[React](https://react.dev)**: Interactive components
- **[Shiki](https://shiki.matsu.io)**: Syntax highlighting
- **[Zod](https://zod.dev)**: Schema validation
- **Minimal custom code**: Leverages built-in features

## 📚 Example Posts

The blog includes two example posts:

1. **Getting Started** - Basic features and usage
2. **Comprehensive Showcase** - All advanced features demonstrated

View them after running `npm run dev`!



## 📄 License

MIT - Use this however you'd like!

---

Built with ❤️ using Astro, MDX, and React.
