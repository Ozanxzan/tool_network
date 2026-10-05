# 🌐 Nazuaf Network Tools

A lightweight collection of network diagnostic tools built with **Cloudflare Workers** and static assets.

No PHP or traditional server is required.

## ✨ Features

- 🌐 IP Checker — public IP, country, region, city, timezone, ASN and ISP
- 🔎 DNS Lookup — A, AAAA, MX, CNAME, NS and TXT
- 🛡️ DNS Leak Diagnostic
- 📱 User-Agent Checker
- 📋 HTTP Headers Viewer
- 🔌 HTTP/HTTPS Port Reachability Checker
- 🏢 ASN / ISP information
- 📱 Responsive mobile-friendly interface
- ⚡ Cloudflare edge deployment

## 🧱 Project Structure

```text
nazuaf-network-tools/
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── src/
│   └── worker.js
└── wrangler.toml
```

## 🚀 Deploy to Cloudflare

### Cloudflare Dashboard

1. Fork or clone this repository.
2. Open **Cloudflare Dashboard → Workers & Pages**.
3. Create a new Worker application.
4. Connect the GitHub repository.
5. Select the `main` branch.
6. Leave the build command empty.
7. Use this deploy command:

```bash
npx wrangler deploy
```

8. Deploy.

The repository includes `wrangler.toml`, which configures the Worker and static assets.

### Wrangler CLI

```bash
npm install -g wrangler
wrangler login
wrangler deploy
```

## ⚙️ Configuration

The included `wrangler.toml` contains:

```toml
name = "nazuaf-network-tools"
main = "src/worker.js"
compatibility_date = "2026-10-05"

[assets]
directory = "./public"
not_found_handling = "single-page-application"
```

If the Worker name is changed in Cloudflare, update the `name` value accordingly.

## 🔌 API Endpoints

```text
GET /api/ip
GET /api/ua
GET /api/headers
GET /api/port?host=example.com&port=443
```

### `/api/ip`

Returns network information available to the Worker, including Cloudflare request metadata and ISP/ASN information when available.

### `/api/ua`

Returns the request User-Agent.

### `/api/headers`

Returns HTTP request headers received by the Worker.

### `/api/port`

Performs an HTTP/HTTPS reachability check against a target host and port.

Example:

```text
/api/port?host=example.com&port=443
```

> The port checker is an HTTP/HTTPS reachability check, not a raw TCP port scanner.

## 🔐 Privacy

This project does not require an application database.

The IP checker processes request-related information to provide network diagnostics. If deploying publicly, review any third-party API used by the Worker and provide a privacy policy appropriate for your deployment.

## ⚠️ DNS Leak Test

The included DNS Leak Test is a **basic DNS diagnostic**, not a complete VPN DNS leak test.

A complete leak test normally requires testing multiple DNS resolvers and comparing the results.

## 🛠️ Customization

You can customize:

- Website name and logo
- Colors and typography
- Tool descriptions
- DNS record types
- API providers
- Worker logic
- Domain and branding

Frontend files:

```text
public/
```

Backend/API logic:

```text
src/worker.js
```

## 📄 License

You are free to modify and adapt this project for your own website or project.

If redistributing a modified version, keeping a reference to the original project is appreciated.

## ⭐ Credits

Built with:

- Cloudflare Workers
- Cloudflare Assets
- HTML
- CSS
- JavaScript

---

**Nazuaf Network Tools**  
Simple network diagnostics at the edge.
