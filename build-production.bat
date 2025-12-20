@echo off
REM Production Build Script for Samarth Portfolio (Windows)

echo 🚀 Starting production build...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18 or higher.
    exit /b 1
)

echo ✅ Node.js version check passed: 
node --version

REM Clean previous builds
echo ✅ Cleaning previous builds...
if exist client\dist rmdir /s /q client\dist
if exist dist rmdir /s /q dist

REM Install dependencies
echo ✅ Installing dependencies...
npm install --legacy-peer-deps
if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    exit /b 1
)

REM Type check
echo ✅ Running type check...
npm run check
if %errorlevel% neq 0 (
    echo ❌ Type check failed
    exit /b 1
)

REM Build client
echo ✅ Building client application...
cd client
npm run build
if %errorlevel% neq 0 (
    echo ❌ Client build failed
    exit /b 1
)
cd ..

REM Verify build output
if not exist client\dist (
    echo ❌ Build output directory not found
    exit /b 1
)

if not exist client\dist\index.html (
    echo ❌ index.html not found in build output
    exit /b 1
)

echo.
echo ✅ Build completed successfully!
echo.
echo 📊 Build Statistics:
echo    Build directory: client\dist
dir client\dist
echo.
echo 🚀 Production build ready for deployment!
echo ⚠️  Don't forget to update your domain in sitemap.xml and robots.txt
echo.
echo 🚀 Deployment options:
echo    • Upload client\dist\ to static hosting
echo    • Use Docker: docker build -t portfolio .
echo    • Deploy to Netlify/Vercel using provided configs
echo.