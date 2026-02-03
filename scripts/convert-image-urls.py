#!/usr/bin/env python3
"""
Convert CDN image URLs in MDX files to relative paths.
"""

import re
from pathlib import Path
from urllib.parse import urlparse

POSTS_DIR = Path("src/content/posts/hashnode-patel-of-thoughts")
IMAGES_DIR = Path("public/images/hashnode")

def get_filename_from_url(url: str) -> str:
    """Extract filename from CDN URL."""
    parsed = urlparse(url)
    path = parsed.path
    filename = path.split('/')[-1]
    return filename if filename else "image"

def convert_images_in_file(file_path: Path) -> bool:
    """Convert all CDN image URLs to relative paths in an MDX file."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # Find all CDN URLs
    cdn_pattern = r'https://cdn\.hashnode\.com[^\s\)\"\']*'
    urls = re.findall(cdn_pattern, content)
    
    if not urls:
        return False
    
    # Convert each URL to relative path
    for url in urls:
        filename = get_filename_from_url(url)
        # Create relative path from the MDX file to the image
        relative_path = f"/images/hashnode/{filename}"
        content = content.replace(url, relative_path)
    
    # Write back if changed
    if content != original_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    
    return False

def main():
    """Process all MDX files."""
    files = sorted(POSTS_DIR.glob("*.mdx"))
    print(f"Processing {len(files)} files\n")
    
    updated = 0
    for file in files:
        if convert_images_in_file(file):
            print(f"✓ {file.name}")
            updated += 1
    
    print(f"\n{'='*60}")
    print(f"Updated: {updated} files")

if __name__ == "__main__":
    main()
