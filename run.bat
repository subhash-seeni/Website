@echo off
cd /d "%~dp0"
echo =======================================
echo   Starting BOGO Website Dev Server...
echo =======================================
start http://localhost:5173
npm run dev
pause
