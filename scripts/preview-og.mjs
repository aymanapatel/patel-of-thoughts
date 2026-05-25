import { generateOgImageForPost } from "../src/utils/generateOgImage.js";
import fs from "node:fs";
import path from "node:path";
import { exec } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const title = process.argv[2] || "Hello World";
const description = process.argv[3] || "A blog post on Patel of Thought";
const tags = process.argv[4] ? process.argv[4].split(",") : ["engineering", "systems"];

const post = {
  data: {
    title,
    description,
    tags,
    date: new Date(),
  },
};

const png = await generateOgImageForPost({ post });

const outPath = path.join(root, "public", "images", "og-preview.png");
fs.writeFileSync(outPath, png);
console.log(`OG image saved to ${outPath}`);

exec(`open "${outPath}"`, (err) => {
  if (err) console.log(`Open manually: ${outPath}`);
});
