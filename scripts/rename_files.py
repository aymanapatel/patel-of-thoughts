#!/usr/bin/env python3
import os
import re
import shutil

def title_to_snake_case(title):
    """Convert title to snake_case filename"""
    # Remove quotes and special characters
    title = title.strip('"')
    
    # Replace special characters and spaces with underscores
    title = re.sub(r'[^\w\s-]', '', title)  # Remove special chars except hyphens and spaces
    title = re.sub(r'[-\s]+', '_', title)   # Replace spaces and hyphens with underscores
    title = re.sub(r'_+', '_', title)       # Replace multiple underscores with single
    title = title.strip('_').lower()        # Remove leading/trailing underscores and lowercase
    
    return title

def extract_title_from_mdx(file_path):
    """Extract title from MDX frontmatter"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Find title in frontmatter
        match = re.search(r'title:\s*"([^"]+)"', content)
        if match:
            return match.group(1)
        
        # Try without quotes
        match = re.search(r'title:\s*([^\n]+)', content)
        if match:
            return match.group(1).strip()
            
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
    
    return None

def main():
    base_dir = "../src/content/posts/hashnode-patel-of-thoughts"
    
    # Get all MDX files
    mdx_files = [f for f in os.listdir(base_dir) if f.endswith('.mdx')]
    
    renames = []
    
    for old_filename in mdx_files:
        old_path = os.path.join(base_dir, old_filename)
        
        # Extract title
        title = extract_title_from_mdx(old_path)
        if not title:
            print(f"Could not extract title from {old_filename}")
            continue
        
        # Convert to snake case
        new_basename = title_to_snake_case(title)
        new_filename = f"{new_basename}.mdx"
        new_path = os.path.join(base_dir, new_filename)
        
        # Check if new filename already exists
        if os.path.exists(new_path) and old_path != new_path:
            print(f"Warning: {new_filename} already exists, skipping {old_filename}")
            continue
        
        renames.append((old_filename, new_filename, title))
    
    # Show what will be renamed
    print("Files to be renamed:")
    print("-" * 80)
    for old_name, new_name, title in renames:
        print(f"{old_name} -> {new_name}")
        print(f"  Title: {title}")
        print()
    
    # Ask for confirmation
    response = input(f"\nRename {len(renames)} files? (y/N): ").strip().lower()
    if response != 'y':
        print("Aborted.")
        return
    
    # Perform renames
    print("\nRenaming files...")
    for old_name, new_name, title in renames:
        old_path = os.path.join(base_dir, old_name)
        new_path = os.path.join(base_dir, new_name)
        
        if old_path != new_path:  # Only rename if names are different
            try:
                shutil.move(old_path, new_path)
                print(f"✓ Renamed {old_name} -> {new_name}")
            except Exception as e:
                print(f"✗ Error renaming {old_name}: {e}")
        else:
            print(f"- Skipped {old_name} (no change needed)")
    
    print("Done!")

if __name__ == "__main__":
    main()