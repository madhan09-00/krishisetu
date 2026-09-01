"""
KrishiSetu Local Development Server (SIH26033)
Launches a lightweight HTTP server on http://localhost:8000 and opens the browser.
"""

import http.server
import socketserver
import webbrowser
import os
import sys

# Ensure UTF-8 output on Windows console
if sys.platform.startswith("win"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def run():
    os.chdir(DIRECTORY)
    socketserver.TCPServer.allow_reuse_address = True
    
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        url = f"http://localhost:{PORT}/index.html"
        print("=" * 60)
        print("  [+] KrishiSetu Prototype Server Running (SIH26033)")
        print(f"  [+] URL: {url}")
        print(f"  [+] Directory: {DIRECTORY}")
        print("  [+] Press Ctrl+C to stop the server.")
        print("=" * 60)
        
        try:
            webbrowser.open(url)
        except Exception:
            pass

        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down KrishiSetu server. Goodbye!")
            sys.exit(0)

if __name__ == "__main__":
    run()
