@echo off
echo Starting local development server...
cd /d "%~dp0"
npx serve -s . -l 8000
pause