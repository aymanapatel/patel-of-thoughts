<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the patel-of-thoughts Astro static site. A reusable `posthog.astro` component was created and injected into the shared `BaseLayout.astro` so every page is automatically instrumented. Ten custom events were added across six files, covering the full content consumption funnel (from landing on a post to finishing it), lead-generation actions (CV, social, connect cards), and content discovery (tag clicks, explore CTA, project external links).

| Event name | Description | File |
|---|---|---|
| `post_read` | Fired when a user loads a blog post detail page, marking the top of the content consumption funnel. | `src/pages/posts/[...slug].astro` |
| `post_read_completed` | Fired when a user scrolls past 90% of a blog post, indicating they finished reading. | `src/pages/posts/[...slug].astro` |
| `post_tag_clicked` | Fired when a user clicks a tag on a blog post to filter by topic. | `src/pages/posts/[...slug].astro` |
| `project_viewed` | Fired when a user loads a project detail page, marking the top of the portfolio engagement funnel. | `src/components/ProjectLayout.astro` |
| `social_link_clicked` | Fired when a user clicks a social button (GitHub, LinkedIn, X) on the personal page hero. | `src/pages/me.astro` |
| `cv_clicked` | Fired when a user clicks the Open CV button, indicating the highest hiring intent. | `src/pages/me.astro` |
| `testimonials_expanded` | Fired when a user expands the Show more testimonials toggle on the personal page. | `src/pages/me.astro` |
| `connect_card_clicked` | Fired when a user clicks a connect card (GitHub, LinkedIn, or Blog) at the bottom of the personal page. | `src/pages/me.astro` |
| `blog_explore_clicked` | Fired when a user clicks the Explore all posts CTA on the homepage. | `src/pages/index.astro` |
| `project_external_link_clicked` | Fired when a user clicks a GitHub or Live link on a project card. | `src/components/ProjectCard.astro` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard**: [Analytics basics (wizard)](https://eu.posthog.com/project/210623/dashboard/777157)
- **Insight**: [Blog post reads over time](https://eu.posthog.com/project/210623/insights/SjVHhq71)
- **Insight**: [Post read completion rate](https://eu.posthog.com/project/210623/insights/xXz082hl) — formula B/A×100 shows the % of readers who finish a post
- **Insight**: [Lead generation clicks](https://eu.posthog.com/project/210623/insights/PnJI8qCy) — CV, social, and connect card clicks
- **Insight**: [Content discovery actions](https://eu.posthog.com/project/210623/insights/Q0nqEdhN) — blog explore, tag, and project link clicks
- **Insight**: [Project page views](https://eu.posthog.com/project/210623/insights/AJ0Bjvuv)

## Verify before merging

- [ ] Run a full production build (`npm run build`) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add `PUBLIC_POSTHOG_PROJECT_TOKEN` and `PUBLIC_POSTHOG_HOST` to `.env.example` and any monorepo/bootstrap scripts so collaborators know what to set. *(Already added to `.env.example` in this run — verify the values are correct for your production project.)*
- [ ] Wire source-map upload (`posthog-cli sourcemap` or your bundler's upload step) into CI so production stack traces de-minify.

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
