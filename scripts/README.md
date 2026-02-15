# Portfolio Build Scripts

## generate-directory-trees.js

Automatically fetches repository structure from GitHub and updates project pages with current directory trees.

### Usage

**Manual Run:**
```bash
node scripts/generate-directory-trees.js
```

**Automated (GitHub Actions):**
- Go to Actions tab in GitHub
- Select "Update Directory Trees" workflow  
- Click "Run workflow"
- Or: runs automatically weekly on Sundays

### Configuration

Edit `REPOS` array in `generate-directory-trees.js` to add new projects:

```javascript
{
  owner: 'lollisjosh',
  repo: 'ProjectName',
  branch: 'main',
  htmlFile: 'projects/projectname.html',
  treeId: 'project-structure',
  includePatterns: [/^src\//, /^include\//],
  excludePatterns: [/^build\//, /^\./]
}
```

### Requirements

- Node.js 18+ (uses native https/fs modules, no dependencies!)
- GitHub token (optional, increases API rate limit from 60 to 5000/hour)
  - Set `GITHUB_TOKEN` environment variable

### How It Works

1. Fetches recursive tree from GitHub API
2. Filters files based on include/exclude patterns
3. Transforms flat file list into nested structure
4. Adds comments for known files/folders
5. Updates HTML file between markers:
   - Start: `const projectStructure = `
   - End: `;\n\n                            // Initialize the tree`

### Output Format

Generates JavaScript array matching the directory tree component format:

```javascript
[
  {
    name: 'include/',
    type: 'folder',
    comment: '# Header files',
    children: [...]
  }
]
```

### Troubleshooting

**Rate limited?**
- Add GitHub token to increase limit
- Or wait an hour for rate limit reset

**Markers not found?**
- Ensure HTML file has the exact marker comments
- Check indentation matches (script expects specific whitespace)

**Structure looks wrong?**
- Adjust `includePatterns` and `excludePatterns`
- Update `getComment()` function for custom annotations
