import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
    const posts = await getCollection('posts', ({ data }) => {
        return import.meta.env.PROD ? !data.draft : true;
    });

    const sortedPosts = posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

    return rss({
        title: import.meta.env.PUBLIC_SITE_TITLE || 'Minimal MDX Blog',
        description: import.meta.env.PUBLIC_SITE_DESCRIPTION || 'A fast, clean blog',
        site: context.site || import.meta.env.PUBLIC_SITE_URL || 'https://example.com',
        items: sortedPosts.map((post) => ({
            title: post.data.title,
            description: post.data.description,
            pubDate: post.data.date,
            link: `/posts/${post.slug}/`,
            categories: post.data.tags,
        })),
        customData: `<language>en-us</language>`,
    });
}
