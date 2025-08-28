#!/usr/bin/env python3
"""
Simple HTTP server for testing ReasonPath
- Serves from a /src directory for source files and /public for static assets.
- Implements basic caching headers.
- Serves pre-compressed .gz files if available.
"""
import http.server
import socketserver
import os
import gzip
from io import BytesIO

# Change to website directory
os.chdir(os.path.dirname(os.path.abspath(__file__)))

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Serve from /src first, then /public
        src_path = os.path.join('src', self.path.lstrip('/'))
        public_path = os.path.join('public', self.path.lstrip('/'))

        if os.path.exists(src_path) and not os.path.isdir(src_path):
            self.path = src_path
        elif os.path.exists(public_path) and not os.path.isdir(public_path):
            self.path = public_path
        # Fallback to default behavior (serves from root for other files like test-server.py itself) 
        
        # Gzip handling
        accept_encoding = self.headers.get('Accept-Encoding', '')
        if 'gzip' in accept_encoding:
            gz_path = self.path + '.gz'
            if os.path.exists(gz_path):
                self.send_response(200)
                self.send_header('Content-type', self.guess_type(self.path))
                self.send_header('Content-Encoding', 'gzip')
                
                # Add caching headers
                self.add_caching_headers(self.path)
                
                self.end_headers()
                with open(gz_path, 'rb') as f:
                    self.wfile.write(f.read())
                return

        # Default GET handler without gzip
        super().do_GET()

    def send_head(self):
        # Add caching headers for non-gzipped files
        path = self.translate_path(self.path)
        if os.path.exists(path):
            self.add_caching_headers(path)
        return super().send_head()

    def add_caching_headers(self, filepath):
        # Aggressive caching for static assets
        if filepath.endswith(('.css', '.js', '.svg', '.woff2', '.json')):
            self.send_header('Cache-Control', 'public, max-age=31536000') # 1 year
        # Revalidate HTML files
        elif filepath.endswith('.html'):
            self.send_header('Cache-Control', 'public, max-age=0, must-revalidate')
        else:
            self.send_header('Cache-Control', 'no-cache')

PORT = 8000
Handler = CustomHandler

print(f"🚀 ReasonPath Test Server Starting...")
print(f"📁 Serving from src/ and public/ directories")
print(f"🌐 Main Site: http://localhost:{PORT}/index.html")
print(f"🛑 Press Ctrl+C to stop")

try:
    with socketserver.TCPServer(('', PORT), Handler) as httpd:
        httpd.serve_forever()
except KeyboardInterrupt:
    print("\n👋 Server stopped")
