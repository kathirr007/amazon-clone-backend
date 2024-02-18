const httpProxy = require('http-proxy'); // Or your chosen library

const proxy = httpProxy.createProxyServer({
  // Target URL for proxying requests
  target: 'http://your-target-server.com',
  // Optional: Change origin to match target server for CORS
  changeOrigin: true
});

module.exports = proxy;
