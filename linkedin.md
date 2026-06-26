I was checking out PostHog’s setup wizard and it feels like a glimpse of where dev tools are heading.

Instead of just giving you a doc and saying “good luck”, the wizard creates an agent by automatically creating a plan for library onboarding based on your framework (React, iOS, Angular etc.) It not only does the installation part, but also gamifies it.

It gives multiple panes:

1. Favourite pane which is learning about Posthog, the architecture of analytics, tips etc. PostHog is interesting because it is not only analytics anymore. It has product analytics, web analytics, session replay, feature flags, experiments, surveys, AI observability, and more in one stack.
2. Browse Hackernews on the terminal. 
3. Visualizer: Gives a space shooter kind of vibe showcasing the installation, the files being changed etc
4. The boring part: Logs. Boring but useful for debugging

Added it to my blog site: https://patelofthought.com/me.

Just use `npx -y @posthog/wizard@latest` on your site and see the magic!

