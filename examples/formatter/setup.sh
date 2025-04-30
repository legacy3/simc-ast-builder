#!/bin/bash

# SimC AST Formatter Setup Script

echo "Setting up SimC AST Formatter..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the JavaScript bundle
echo "Building JavaScript bundle..."
npm run build

echo "Setup complete! You can now run 'npm run dev' to start the development server."