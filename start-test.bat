@echo off
echo 🚀 Starting ReasonPath Hero Lottie Test Server...
echo.
echo 📁 Serving from: %cd%
echo 🌐 Test URLs:
echo    Main Test: http://localhost:8000/tests/hero-lottie-test.html
echo    Debug Ver: http://localhost:8000/tests/debug-hero-lottie.html
echo.
echo 🛑 Press Ctrl+C to stop server
echo.

python -m http.server 8000
pause
