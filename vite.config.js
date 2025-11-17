import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        // CRITICAL: Forward cookies in both directions for OAuth flow
        cookieDomainRewrite: {
          '*': 'localhost' // Rewrite domain to localhost
        },
        cookiePathRewrite: {
          '*': '/' // Rewrite path to root
        },
        configure: (proxy, _options) => {
          // Forward cookies from browser to backend
          proxy.on('proxyReq', (proxyReq, req, res) => {
            // Always forward cookie header if present
            if (req.headers.cookie) {
              proxyReq.setHeader('Cookie', req.headers.cookie);
              console.log('[Vite Proxy] → Forwarding cookies to backend');
              console.log('[Vite Proxy] → Cookie header:', req.headers.cookie.substring(0, 100) + '...');
            } else {
              console.log('[Vite Proxy] → No cookies in request to backend');
            }
            console.log('[Vite Proxy] →', req.method, req.url);
          });
          
          // Forward Set-Cookie headers from backend to browser
          proxy.on('proxyRes', (proxyRes, req, res) => {
            const setCookieHeaders = proxyRes.headers['set-cookie'];
            if (setCookieHeaders) {
              const cookies = Array.isArray(setCookieHeaders) 
                ? setCookieHeaders 
                : [setCookieHeaders];
              
              console.log('[Vite Proxy] ← Received', cookies.length, 'Set-Cookie header(s) from backend');
              
              // Rewrite cookie domain and path to work with localhost:5173
              const rewrittenCookies = cookies.map(cookie => {
                // Preserve domain as localhost, ensure path is /
                let rewritten = cookie
                  .replace(/Domain=[^;]+/gi, 'Domain=localhost') // Set domain to localhost
                  .replace(/Path=[^;]+/gi, 'Path=/') // Ensure path is /
                  .replace(/Secure/gi, ''); // Remove Secure for localhost
                
                // Ensure SameSite is Lax (for OAuth redirects)
                if (!rewritten.includes('SameSite')) {
                  rewritten += '; SameSite=Lax';
                }
                
                console.log('[Vite Proxy] ← Rewritten cookie:', rewritten.substring(0, 100) + '...');
                return rewritten;
              });
              
              // Set the rewritten cookies
              res.setHeader('Set-Cookie', rewrittenCookies);
            } else {
              console.log('[Vite Proxy] ← No Set-Cookie headers in backend response');
            }
          });
        },
      },
    },
  },
})
