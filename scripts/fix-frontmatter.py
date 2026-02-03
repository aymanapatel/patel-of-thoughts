#!/usr/bin/env python3
"""
Fix frontmatter in migrated Hashnode files to match Astro content schema.
- Convert datePublished to date
- Convert seoDescription to description
- Convert comma-separated tags to array format
"""

import os
import re
from pathlib import Path
from datetime import datetime

DEST_DIR = Path("src/content/posts/hashnode-patel-of-thoughts")

def fix_frontmatter(file_path):
    """Fix frontmatter in a single file."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract frontmatter
    match = re.match(r'^(---\n)(.*?)(---\n)', content, re.DOTALL)
    if not match:
        return False
    
    frontmatter = match.group(2)
    original_frontmatter = frontmatter
    
    # 1. Convert datePublished to date
    date_match = re.search(r'^datePublished:\s*(.+)$', frontmatter, re.MULTILINE)
    if date_match:
        date_str = date_match.group(1)
        try:
            # Parse the date string and convert to ISO format
            parsed_date = datetime.strptime(date_str.split('GMT')[0].strip(), '%a %b %d %Y %H:%M:%S')
            iso_date = parsed_date.strftime('%Y-%m-%d')
            frontmatter = re.sub(r'^datePublished:.*$', f'date: {iso_date}', frontmatter, flags=re.MULTILINE)
        except:
            # If parsing fails, keep original and convert to date: format
            frontmatter = re.sub(r'^datePublished:', 'date:', frontmatter, flags=re.MULTILINE)
    
    # 2. Convert seoDescription to description (prefer seoDescription, fallback to empty)
    desc_match = re.search(r'^seoDescription:\s*"([^"]*)"', frontmatter, re.MULTILINE)
    if desc_match:
        desc = desc_match.group(1)
        # Remove seoDescription line
        frontmatter = re.sub(r'^seoDescription:.*$\n?', '', frontmatter, flags=re.MULTILINE)
        # Add description if not already present
        if not re.search(r'^description:', frontmatter, re.MULTILINE):
            # Add description after title
            frontmatter = re.sub(r'(^title:.*$)', r'\1\ndescription: "' + desc + '"', frontmatter, flags=re.MULTILINE)
    else:
        # Add empty description if missing
        if not re.search(r'^description:', frontmatter, re.MULTILINE):
            frontmatter = re.sub(r'(^title:.*$)', r'\1\ndescription: ""', frontmatter, flags=re.MULTILINE)
    
    # 3. Convert tags to array format
    tags_match = re.search(r'^tags:\s*(.+)$', frontmatter, re.MULTILINE)
    if tags_match:
        tags_str = tags_match.group(1).strip()
        
        # Check if already in array format [tag1, tag2]
        if tags_str.startswith('[') and tags_str.endswith(']'):
            # Already an array, just ensure proper spacing
            pass
        else:
            # Convert comma-separated string to array
            tags = [tag.strip() for tag in tags_str.split(',')]
            tags_array = '[' + ', '.join(f'"{tag}"' for tag in tags) + ']'
            frontmatter = re.sub(r'^tags:.*$', f'tags: {tags_array}', frontmatter, flags=re.MULTILINE)
    else:
        # Add empty tags array if missing
        if not re.search(r'^tags:', frontmatter, re.MULTILINE):
            frontmatter = re.sub(r'(^description:.*$)', r'\1\ntags: []', frontmatter, flags=re.MULTILINE)
    
    # Only write if changes were made
    if frontmatter != original_frontmatter:
        new_content = content.replace(match.group(2), frontmatter)
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    
    return False

def fix_all_files():
    """Fix frontmatter in all migrated files."""
    if not DEST_DIR.exists():
        print(f"Directory not found: {DEST_DIR}")
        return
    
    files = sorted(DEST_DIR.glob("*.mdx"))
    print(f"Fixing {len(files)} files\n")
    
    fixed_count = 0
    
    for file in files:
        if fix_frontmatter(file):
            print(f"✓ {file.name}")
            fixed_count += 1
    
    print(f"\n{'='*60}")
    print(f"Fixed: {fixed_count} files")

if __name__ == "__main__":
    fix_all_files()
