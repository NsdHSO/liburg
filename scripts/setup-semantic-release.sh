#!/bin/bash

# Script to install semantic-release dependencies
echo "Installing semantic-release dependencies..."

npm install --save-dev \
  semantic-release \
  @semantic-release/changelog \
  @semantic-release/git \
  @semantic-release/github \
  @semantic-release/npm \
  @semantic-release/commit-analyzer \
  @semantic-release/release-notes-generator

echo "Setting up conventional commit linting..."
npm install --save-dev \
  @commitlint/cli \
  @commitlint/config-conventional \
  husky

# Create commitlint config
cat > commitlint.config.js << 'EOF'
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [2, 'always', ['ngx-liburg', 'ngx-liburg-icon', 'ngx-liburg-frame-side', 'repo']],
    'scope-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test'
      ]
    ]
  }
};
EOF

# Create .husky directory if it doesn't exist
mkdir -p .husky

# Install husky
npx husky install

# Add commit-msg hook
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit $1'

echo "Semantic-release setup complete!"
