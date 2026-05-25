import { Resvg } from "@resvg/resvg-js";
import postOgImage from "./og-template/post.js";

function svgBufferToPngBuffer(svg) {
  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  return pngData.asPng();
}

export async function generateOgImageForPost({ post }) {
  const svg = await postOgImage(post);
  return svgBufferToPngBuffer(svg);
}
