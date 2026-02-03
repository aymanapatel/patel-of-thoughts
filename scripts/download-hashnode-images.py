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
Download the Hashnode CDN images and update MDX files to reference local images.

This script:
1. Finds all Hashnode CDN image URLs in the MDX files
2. Downloads them to public/images/hashnode/
3. Updates the MDX files to reference the local images

Usage:
  python scripts/download-hashnode-images.py
"""

import argparse
import re
import sys
import urllib.error
import urllib.request
from pathlib import Path
from typing import Optional
from urllib.parse import urlparse


ROOT = Path(__file__).resolve().parent.parent
POSTS_DIR = ROOT / "src" / "content" / "posts" / "hashnode-patel-of-thoughts"
IMAGES_DIR = ROOT / "public" / "images" / "hashnode"
IMAGES_DIR.mkdir(parents=True, exist_ok=True)


def get_filename_from_url(url: str) -> str:
    """Extract filename from CDN URL."""
    parsed = urlparse(url)
    path = parsed.path
    # Get the last part of the path
    filename = path.split('/')[-1]
    return filename if filename else "image"


def find_all_cdn_urls(text: str) -> set[str]:
    """Find all Hashnode CDN image URLs in text."""
    pattern = re.compile(r'https://cdn\.hashnode\.com[^\s\)\"\']*')
    return set(pattern.findall(text))


def download_image(url: str, destination: Path) -> bool:
    """Fetch the image if it does not already exist."""
    if destination.exists():
        print(f"  ✓ Already downloaded: {destination.name}", file=sys.stderr)
        return True
    
    # Create a request with headers to mimic a browser
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            "Accept": "image/*",
        }
    )
    
    try:
        with urllib.request.urlopen(req, timeout=30) as response:
            if response.status == 200:
                destination.write_bytes(response.read())
                print(f"  ✓ Downloaded: {destination.name}", file=sys.stderr)
                return True
            else:
                print(f"  ✗ HTTP {response.status}: {url}", file=sys.stderr)
                return False
    except urllib.error.URLError as exc:
        print(f"  ✗ Failed to download {url}: {exc}", file=sys.stderr)
        return False


def update_mdx_file(file_path: Path, url_mapping: dict[str, str]) -> bool:
    """Update MDX file to use local images instead of CDN URLs."""
    try:
        content = file_path.read_text(encoding='utf-8')
        original_content = content
        
        for cdn_url, local_path in url_mapping.items():
            content = content.replace(cdn_url, local_path)
        
        if content != original_content:
            file_path.write_text(content, encoding='utf-8')
            return True
        return False
    except Exception as e:
        print(f"  ✗ Error updating {file_path.name}: {e}", file=sys.stderr)
        return False
def main(limit: Optional[int]) -> int:
    """Main function to download images and update MDX files."""
    # Collect all CDN URLs from all MDX files
    all_urls: set[str] = set()
    
    print("Scanning MDX files for Hashnode CDN images...")
    for mdx_path in sorted(POSTS_DIR.glob("*.mdx")):
        text = mdx_path.read_text(encoding='utf-8')
        urls = find_all_cdn_urls(text)
        all_urls.update(urls)
    
    if not all_urls:
        print("No CDN images found.", file=sys.stderr)
        return 1
    
    print(f"\nFound {len(all_urls)} unique CDN image URL(s)\n")
    
    # Download images and map URLs to local paths
    url_mapping: dict[str, str] = {}
    success = True
    
    for idx, url in enumerate(sorted(all_urls)):
        if limit is not None and idx >= limit:
            break
        
        filename = get_filename_from_url(url)
        dest = IMAGES_DIR / filename
        local_path = f"/images/hashnode/{filename}"
        
        print(f"Downloading image {idx + 1}/{len(all_urls)}")
        if download_image(url, dest):
            url_mapping[url] = local_path
        else:
            success = False
    
    # Update all MDX files with local paths
    print("\nUpdating MDX files...")
    updated_count = 0
    for mdx_path in sorted(POSTS_DIR.glob("*.mdx")):
        if update_mdx_file(mdx_path, url_mapping):
            print(f"  ✓ Updated: {mdx_path.name}")
            updated_count += 1
    
    print(f"\n{'='*60}")
    print(f"Downloaded: {len(url_mapping)} images")
    print(f"Updated: {updated_count} MDX files")
    print(f"Images saved to: {IMAGES_DIR}")
    
    return 0 if success else 1


def parse_args():
    parser = argparse.ArgumentParser(
        description="Download CDN images for Hashnode MDX posts and update references."
    )
    parser.add_argument(
        "--limit",
        type=int,
        help="Limit the number of downloads (useful for testing).",
    )
    return parser.parse_args()


if __name__ == "__main__":
    args = parse_args()
    raise SystemExit(main(limit=args.limit))
