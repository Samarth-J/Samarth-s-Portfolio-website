#!/bin/bash

# Production Build Script for Samarth Portfolio

echo "🚀 Starting production build..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version 18 or higher is required. Current version: $(node -v)"
    exit 1
fi

print_status "Node.js version check passed: $(node -v)"

# Clean previous builds
print_status "Cleaning previous builds..."
rm -rf client/dist
rm -rf dist

# Install dependencies
print_status "Installing dependencies..."
npm install --legacy-peer-deps

if [ $? -ne 0 ]; then
    print_error "Failed to install dependencies"
    exit 1
fi

# Type check
print_status "Running type check..."
npm run check

if [ $? -ne 0 ]; then
    print_error "Type check failed"
    exit 1
fi

# Build client
print_status "Building client application..."
cd client
npm run build

if [ $? -ne 0 ]; then
    print_error "Client build failed"
    exit 1
fi

cd ..

# Build server (if needed)
if [ -d "server" ]; then
    print_status "Building server..."
    npm run build:server
    
    if [ $? -ne 0 ]; then
        print_error "Server build failed"
        exit 1
    fi
fi

# Verify build output
if [ ! -d "client/dist" ]; then
    print_error "Build output directory not found"
    exit 1
fi

# Check if index.html exists
if [ ! -f "client/dist/index.html" ]; then
    print_error "index.html not found in build output"
    exit 1
fi

# Display build statistics
print_status "Build completed successfully!"
echo ""
echo "📊 Build Statistics:"
echo "   Build directory: client/dist"
echo "   Total files: $(find client/dist -type f | wc -l)"
echo "   Total size: $(du -sh client/dist | cut -f1)"
echo ""

# List main files
echo "📁 Main build files:"
ls -la client/dist/

echo ""
print_status "Production build ready for deployment!"
print_warning "Don't forget to update your domain in sitemap.xml and robots.txt"

echo ""
echo "🚀 Deployment options:"
echo "   • Upload client/dist/ to static hosting"
echo "   • Use Docker: docker build -t portfolio ."
echo "   • Deploy to Netlify/Vercel using provided configs"
echo ""