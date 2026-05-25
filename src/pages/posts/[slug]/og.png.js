import { getCollection } from "astro:content";
import { generateOgImageForPost } from "../../../utils/generateOgImage.js";

export async function getStaticPaths() {
  const posts = await getCollection("posts", ({ data }) => !data.draft);

  return posts.map((post) => {
    const slug = post.slug.split("/").pop() || post.slug;
    return {
      params: { slug },
      props: { post },
    };
  });
}

export async function GET({ props }) {
  const image = await generateOgImageForPost(props);

  return new Response(image, {
    headers: { "Content-Type": "image/png" },
  });
}

export const prerender = true;
