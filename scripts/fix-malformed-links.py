#!/usr/bin/env python3
"""
Fix malformed markdown links in MDX files.
Issues like: [{ text }](url) -> [text](url)
"""

import re
from pathlib import Path

POSTS_DIR = Path("src/content/posts/hashnode-patel-of-thoughts")

def fix_malformed_links(file_path: Path) -> bool:
    """Fix malformed markdown links."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # Fix [{ text }](url) -> [text](url)
    content = re.sub(
        r'\[\{\s*([^}]+?)\s*\}\]',
        r'[\1]',
        content
    )
    
    # Fix [{ text ] -> [text]
    content = re.sub(
        r'\[\{\s*([^\]]+)',
        r'[\1',
        content
    )
    
    if content != original_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    
    return False

def main():
    """Process all MDX files."""
    files = sorted(POSTS_DIR.glob("*.mdx"))
    print(f"Processing {len(files)} files\n")
    
    fixed = 0
    for file in files:
        if fix_malformed_links(file):
            print(f"✓ {file.name}")
            fixed += 1
    
    print(f"\n{'='*60}")
    print(f"Fixed: {fixed} files")

if __name__ == "__main__":
    main()
