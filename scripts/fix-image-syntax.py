#!/usr/bin/env python3
"""
Fix image markdown syntax in MDX files.
Removes align attributes that break markdown parsing.
"""

import re
from pathlib import Path

POSTS_DIR = Path("src/content/posts/hashnode-patel-of-thoughts")

def fix_image_syntax(file_path: Path) -> bool:
    """Fix image markdown syntax by removing align attributes."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # Fix image syntax: ![alt](url align="left") -> ![alt](url)
    # Pattern matches: ![anything](url_with_spaces_and_align_attribute)
    content = re.sub(
        r'!\[([^\]]*)\]\((/images/[^\s\)]+)\s+align="[^"]*"\)',
        r'![\1](\2)',
        content
    )
    
    # Also handle other align variations
    content = re.sub(
        r'!\[([^\]]*)\]\(([^\s\)]+)\s+align=["\']?[^"\']*["\']?\)',
        r'![\1](\2)',
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
        if fix_image_syntax(file):
            print(f"✓ {file.name}")
            fixed += 1
    
    print(f"\n{'='*60}")
    print(f"Fixed: {fixed} files")

if __name__ == "__main__":
    main()
