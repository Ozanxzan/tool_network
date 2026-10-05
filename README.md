# Nazuaf Network Tools

A lightweight network utility site built for Cloudflare Workers + Workers Assets (Pages-style static hosting) with no PHP.

## Included
- IP / IPv4 / IPv6 detection
- ASN / ISP / location lookup via ipwho.is
- DNS lookup (A, AAAA, MX, CNAME, NS, TXT)
- DNS leak-style resolver test using multiple public DoH endpoints
- User-Agent checker
- HTTP response headers checker
- HTTP port reachability checker
- Copy buttons and responsive UI

## Deploy with Wrangler
```bash
npm install
npx wrangler login
npm run deploy
```

## GitHub + Cloudflare dashboard
You can also connect this repository to Cloudflare and deploy it as a Workers project using the included `wrangler.toml`. The static files live in `public/` and the Worker is `src/worker.js`.

## Important limitation
A browser/Worker cannot perform a raw arbitrary TCP port scan. The included port checker tests whether an HTTP/HTTPS service is reachable on the selected port. It is intentionally not presented as a full TCP scanner.

The DNS leak page is a diagnostic test, not a guarantee of every resolver used by a device. VPN apps, OS resolvers, browsers, and encrypted DNS can change the result.
