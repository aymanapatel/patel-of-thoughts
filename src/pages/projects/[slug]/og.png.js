import { getCollection } from "astro:content";
import { generateOgImageForPost } from "../../../utils/generateOgImage.js";

export async function getStaticPaths() {
  const projects = await getCollection("projects", ({ data }) => !data.draft);

  return projects.map((project) => {
    const slug = project.slug.split("/").pop() || project.slug;
    return {
      params: { slug },
      props: { post: project },
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
