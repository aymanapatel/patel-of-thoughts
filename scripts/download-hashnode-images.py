#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = [
#     "argparse",
#     "pathlib",
#     "typing",
# ]
# ///
"""
Download the Hashnode CDN assets that are referenced from the generated MDX posts.

Each MDX file under src/content/posts/hashnode-patel-of-thoughts references images via
`./images/<file>`. The legacy Hashnode markdown lives under src/content/posts/hashnode-blog.
We pass over that bundle to resolve the CDN URL that was originally used for each file
name, and store the downloaded asset next to the MDX source.

Usage:
  python scripts/download-hashnode-images.py
"""

import argparse
import re
import subprocess
import sys
import urllib.error
import urllib.request
from pathlib import Path
from typing import Optional


ROOT = Path(__file__).resolve().parent.parent
POSTS_DIR = ROOT / "src" / "content" / "posts" / "hashnode-patel-of-thoughts"
LEGACY_DIR = ROOT / "src" / "content" / "posts" / "hashnode-blog"
IMAGES_DIR = POSTS_DIR / "images"
IMAGES_DIR.mkdir(parents=True, exist_ok=True)


def read_md_file(path: Path, legacy_ref: str) -> Optional[str]:
    """Return the contents of the legacy markdown file from legacy_ref."""
    try:
        repo_relative = path.relative_to(ROOT)
    except ValueError:
        repo_relative = path
    git_path = f"{legacy_ref}:{repo_relative.as_posix()}"
    try:
        result = subprocess.run(
            ["git", "show", git_path],
            capture_output=True,
            check=True,
            text=True,
        )
        return result.stdout
    except subprocess.CalledProcessError:
        print(f"Warning: legacy file {path} is missing in {legacy_ref}.", file=sys.stderr)
        return None


def find_cdn_url(legacy_text: str, filename: str) -> Optional[str]:
    """Look for the CDN URL that ends with the given filename."""
    pattern = re.compile(rf"(https://cdn\.hashnode\.com/[^\s\)\"']*{re.escape(filename)})")
    match = pattern.search(legacy_text)
    return match.group(1) if match else None


def find_cdn_url_in_current_files(filename: str) -> Optional[str]:
    """Look for CDN URLs in current MDX files that might still contain them."""
    pattern = re.compile(rf"(https://cdn\.hashnode\.com/[^\s\)\"']*{re.escape(filename)})")
    
    # Search in all MDX files in the posts directory
    for mdx_path in POSTS_DIR.parent.glob("*.mdx"):
        try:
            text = mdx_path.read_text()
            match = pattern.search(text)
            if match:
                return match.group(1)
        except Exception:
            continue
    
    return None


def collect_targets() -> set[str]:
    """Collect all filenames referenced as ./images/<file> in the MDX files."""
    image_pattern = re.compile(r"(?:\./|)\bimages/([A-Za-z0-9_.-]+)")
    targets: set[str] = set()

    for mdx_path in sorted(POSTS_DIR.glob("*.mdx")):
        text = mdx_path.read_text()
        matches = image_pattern.findall(text)
        if not matches:
            continue
        targets.update(matches)

    return targets


def download_image(url: str, destination: Path) -> bool:
    """Fetch the image if it does not already exist."""
    if destination.exists():
        return True
    
    # Create a request with headers to mimic a browser
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
        }
    )
    
    try:
        with urllib.request.urlopen(req) as response:
            if response.status == 200:
                destination.write_bytes(response.read())
                return True
            else:
                print(f"HTTP {response.status} for {url}", file=sys.stderr)
                return False
    except urllib.error.URLError as exc:
        print(f"Failed to download {url}: {exc}", file=sys.stderr)
        return False
    
def main(limit: Optional[int], legacy_ref: str) -> int:
    targets = collect_targets()
    if not targets:
        print("No CDN-backed images were discovered.", file=sys.stderr)
        return 1

    mapped: dict[str, str] = {}
    missing: set[str] = set(targets)

    # First, try to find URLs in legacy markdown files
    for mdx_path in sorted(POSTS_DIR.glob("*.mdx")):
        legacy_path = LEGACY_DIR / f"{mdx_path.stem}.md"
        legacy_text = read_md_file(legacy_path, legacy_ref)
        if legacy_text is None:
            continue

        for filename in list(missing):
            url = find_cdn_url(legacy_text, filename)
            if url:
                mapped[filename] = url
                missing.remove(filename)

        if not missing:
            break

    # Fallback: search for CDN URLs in current MDX files
    for filename in list(missing):
        url = find_cdn_url_in_current_files(filename)
        if url:
            mapped[filename] = url
            missing.remove(filename)

    if missing:
        print(
            "Warning: Could not locate CDN URLs for the following images:",
            ", ".join(sorted(missing)),
            file=sys.stderr,
        )
        print("These images will be skipped. You may need to source them manually.", file=sys.stderr)

    success = True
    for idx, (filename, url) in enumerate(sorted(mapped.items())):
        if limit is not None and idx >= limit:
            break
        dest = IMAGES_DIR / filename
        print(f"Downloading {filename} to {dest}...")
        success &= download_image(url, dest)

    return 0 if success else 1


def parse_args():
    parser = argparse.ArgumentParser(
        description="Download CDN images for the Hashnode MDX archive."
    )
    parser.add_argument(
        "--limit",
        type=int,
        help="Limit the number of downloads (useful for testing).",
    )
    parser.add_argument(
        "--legacy-ref",
        default="origin/main",
        help="Git ref to read the legacy markdown from.",
    )
    return parser.parse_args()


if __name__ == "__main__":
    args = parse_args()
    raise SystemExit(main(limit=args.limit, legacy_ref=args.legacy_ref))
