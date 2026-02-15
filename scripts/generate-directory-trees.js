#!/usr/bin/env node

/**
 * Generate Directory Trees for Project Pages
 * Fetches repository structure from GitHub API and updates project HTML files
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuration
const REPOS = [
  {
    owner: 'lollisjosh',
    repo: 'SNaiKE',
    branch: 'main',
    htmlFile: 'projects/snaike.html',
    treeId: 'project-structure',
    includePatterns: [/^include\//, /^src\//, /^resources\//],
    excludePatterns: [/^build\//, /^\./, /CMakeFiles/, /\.user$/, /\.filters$/, /\.vcxproj$/]
  }
];

/**
 * Fetch repository tree from GitHub API
 */
function fetchGitHubTree(owner, repo, branch) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: `/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`,
      method: 'GET',
      headers: {
        'User-Agent': 'lollisjosh-portfolio',
        'Accept': 'application/vnd.github.v3+json'
      }
    };

    // Add token if available (increases rate limit)
    if (process.env.GITHUB_TOKEN) {
      options.headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
    }

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode !== 200) {
          reject(new Error(`GitHub API returned ${res.statusCode}: ${data}`));
          return;
        }
        resolve(JSON.parse(data));
      });
    });

    req.on('error', reject);
    req.end();
  });
}

/**
 * Transform flat GitHub tree into nested structure
 */
function transformGitHubTree(githubTree, includePatterns, excludePatterns) {
  // Filter files based on patterns
  const filtered = githubTree.tree.filter(item => {
    // Check include patterns
    const included = includePatterns.some(pattern => pattern.test(item.path));
    if (!included) return false;

    // Check exclude patterns
    const excluded = excludePatterns.some(pattern => pattern.test(item.path));
    return !excluded;
  });

  // Build nested structure
  const root = {};

  filtered.forEach(item => {
    const parts = item.path.split('/');
    let current = root;

    parts.forEach((part, index) => {
      const isLast = index === parts.length - 1;
      const isFile = isLast && item.type === 'blob';

      if (!current[part]) {
        current[part] = {
          name: part,
          type: isFile ? 'file' : 'folder',
          children: isFile ? undefined : {}
        };
      }

      if (!isFile) {
        current = current[part].children;
      }
    });
  });

  // Convert to array format
  function convertToArray(obj) {
    return Object.values(obj).map(item => ({
      name: item.name,
      type: item.type,
      comment: getComment(item.name),
      children: item.children ? convertToArray(item.children) : undefined
    })).filter(item => item.children === undefined || item.children.length > 0);
  }

  return convertToArray(root);
}

/**
 * Get comment for known files/folders
 */
function getComment(name) {
  const comments = {
    // Directories
    'include/': '# Header files',
    'src/': '# Source files',
    'resources/': '# Assets',
    'ai/': '# AI strategy implementations',
    'state_system/': '# State machine & game states',
    'events/': '# Event system',
    'input/': '# Input handling',
    'game/': '# Game mechanics',
    'window/': '# Window management',
    'states/': '# State implementations',
    'fonts/': '# SFML font resources',

    // Header files
    'ISnakeStrategy.hpp': '# Strategy interface',
    'BaseStrategy.hpp': '# Base implementation',
    'AIPlayer.hpp': '# Strategy executor',
    'HamiltonStrategy.hpp': '# Hamiltonian cycle',
    'AStarStrategy.hpp': '# A* pathfinding',
    'FloodFillStrategy.hpp': '# Flood fill analysis',
    'ManhattanStrategy.hpp': '# Manhattan distance',
    'BasicStrategy.hpp': '# Basic greedy strategy',
    'AdvancedStrategy.hpp': '# Hybrid strategy',
    'RandomStrategy.hpp': '# Random movement baseline',
    'GridHeatMap.hpp': '# Heat map for visualization',
    'HeatMap.hpp': '# Heat map interface',
    'StateMachine.hpp': '# State machine controller',
    'State.hpp': '# State base class',
    'States.hpp': '# State enumeration',
    'StateClock.hpp': '# Timing for states',
    'MenuState.hpp': '# Strategy selection menu',
    'PlayingState.hpp': '# Active simulation',
    'PausedState.hpp': '# Paused simulation',
    'GameOverState.hpp': '# Results display',
    'Event.hpp': '# Event base class',
    'EventManager.hpp': '# Event dispatcher',
    'GameLifecycleEvent.hpp': '# Game lifecycle events',
    'StateTransitionEvent.hpp': '# State change events',
    'InputHandler.hpp': '# Input processing',
    'Direction.hpp': '# Movement directions',
    'Position.hpp': '# Grid positions',
    'WindowController.hpp': '# SFML window management',
    'Snake.hpp': '# Snake entity',
    'GameLoop.hpp': '# Main simulation loop',
    'GameController.hpp': '# Game coordinator',
    'GameConfig.hpp': '# Configuration constants',
    'GameClock.hpp': '# Timing management',
    'ScoreLogger.hpp': '# Performance tracking',
    'Debug.hpp': '# Debug utilities',

    // Source files
    'Snake.cpp': '# Snake implementation',
    'GameLoop.cpp': '# Main loop implementation',
    'GameController.cpp': '# Game coordinator',
    'main.cpp': '# Entry point',
    'InputHandler.cpp': '# Input handler implementation'
  };

  return comments[name] || '';
}

/**
 * Generate JavaScript code for directory tree
 */
function generateTreeCode(structure, indent = '                            ') {
  function formatItem(item, level) {
    const ind = indent + '    '.repeat(level);
    let code = `${ind}{\n`;
    code += `${ind}    name: '${item.name}',\n`;
    code += `${ind}    type: '${item.type}'`;
    
    if (item.comment) {
      code += `,\n${ind}    comment: '${item.comment}'`;
    }
    
    if (item.children && item.children.length > 0) {
      code += `,\n${ind}    children: [\n`;
      code += item.children.map(child => formatItem(child, level + 1)).join(',\n');
      code += `\n${ind}    ]`;
    }
    
    code += `\n${ind}}`;
    return code;
  }

  return '[\n' + structure.map(item => formatItem(item, 0)).join(',\n') + `\n${indent}]`;
}

/**
 * Update HTML file with new directory structure
 */
function updateHtmlFile(filePath, treeId, structure) {
  const htmlPath = path.join(__dirname, '..', filePath);
  let content = fs.readFileSync(htmlPath, 'utf8');

  // Generate the tree code
  const treeCode = generateTreeCode(structure);

  // Find and replace the projectStructure array
  const startMarker = 'const projectStructure = ';
  const endMarker = ';\n\n                            // Initialize the tree';
  
  const startIndex = content.indexOf(startMarker);
  const endIndex = content.indexOf(endMarker, startIndex);

  if (startIndex === -1 || endIndex === -1) {
    throw new Error(`Could not find directory structure markers in ${filePath}`);
  }

  const before = content.substring(0, startIndex + startMarker.length);
  const after = content.substring(endIndex);

  content = before + treeCode + after;

  fs.writeFileSync(htmlPath, content, 'utf8');
  console.log(`✓ Updated ${filePath}`);
}

/**
 * Main execution
 */
async function main() {
  console.log('🌳 Generating directory trees from GitHub...\n');

  for (const config of REPOS) {
    try {
      console.log(`Fetching ${config.owner}/${config.repo}...`);
      const tree = await fetchGitHubTree(config.owner, config.repo, config.branch);
      
      console.log(`Transforming structure (${tree.tree.length} files)...`);
      const structure = transformGitHubTree(tree, config.includePatterns, config.excludePatterns);
      
      console.log(`Updating ${config.htmlFile}...`);
      updateHtmlFile(config.htmlFile, config.treeId, structure);
      
      console.log(`✓ ${config.repo} complete\n`);
    } catch (error) {
      console.error(`✗ Failed to process ${config.repo}:`, error.message);
      process.exit(1);
    }
  }

  console.log('✨ All directory trees updated successfully!');
}

main();
