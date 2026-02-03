#!/usr/bin/env python3
"""
Migrate Hashnode blog files from hashnode-blog to hashnode-patel-of-thoughts folder.
- Rename files based on title in frontmatter
- Change .md extension to .mdx
"""

import os
import re
import shutil
from pathlib import Path

# Define source and destination directories
SOURCE_DIR = Path("src/content/posts/hashnode-blog")
DEST_DIR = Path("src/content/posts/hashnode-patel-of-thoughts")

# Ensure destination directory exists
DEST_DIR.mkdir(parents=True, exist_ok=True)

def extract_frontmatter(file_path):
    """Extract frontmatter from markdown file and return as dict."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract YAML frontmatter
    match = re.match(r'^---\n(.*?)\n---', content, re.DOTALL)
    if not match:
        return None
    
    frontmatter = match.group(1)
    # Extract title
    title_match = re.search(r'^title:\s*["\']?([^"\'\n]+)["\']?$', frontmatter, re.MULTILINE)
    if title_match:
        return title_match.group(1).strip()
    return None

def slugify(text):
    """Convert text to a valid filename slug."""
    # Convert to lowercase
    text = text.lower()
    # Replace spaces with hyphens
    text = re.sub(r'\s+', '-', text)
    # Remove special characters, keep only alphanumeric, hyphens, and underscores
    text = re.sub(r'[^a-z0-9\-_]', '', text)
    # Remove multiple consecutive hyphens
    text = re.sub(r'-+', '-', text)
    # Strip hyphens from start and end
    text = text.strip('-')
    return text

def migrate_files():
    """Migrate all files from source to destination."""
    if not SOURCE_DIR.exists():
        print(f"Source directory not found: {SOURCE_DIR}")
        return
    
    files = sorted(SOURCE_DIR.glob("*.md"))
    print(f"Found {len(files)} files to migrate\n")
    
    migrated_count = 0
    failed_files = []
    
    for old_file in files:
        try:
            # Extract title from frontmatter
            title = extract_frontmatter(old_file)
            
            if not title:
                print(f"⚠️  No title found in {old_file.name}, skipping")
                failed_files.append(old_file.name)
                continue
            
            # Create new filename
            slug = slugify(title)
            new_filename = f"{slug}.mdx"
            new_file_path = DEST_DIR / new_filename
            
            # Handle duplicate filenames
            counter = 1
            while new_file_path.exists():
                new_filename = f"{slug}-{counter}.mdx"
                new_file_path = DEST_DIR / new_filename
                counter += 1
            
            # Read and copy file
            with open(old_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            with open(new_file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            
            print(f"✓ {old_file.name}")
            print(f"  → {new_filename}")
            print(f"  Title: {title}\n")
            
            migrated_count += 1
            
        except Exception as e:
            print(f"✗ Error processing {old_file.name}: {e}")
            failed_files.append(old_file.name)
    
    # Summary
    print("=" * 60)
    print(f"Migration complete!")
    print(f"✓ Successfully migrated: {migrated_count} files")
    if failed_files:
        print(f"✗ Failed: {len(failed_files)} files")
        for f in failed_files:
            print(f"  - {f}")
    print(f"\nFiles moved to: {DEST_DIR}")

if __name__ == "__main__":
    migrate_files()
