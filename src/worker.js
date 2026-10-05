export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // API: informasi IP pengunjung
    if (url.pathname === "/api/ip") {
      return Response.json({
        ipv4: request.headers.get("CF-Connecting-IP"),
        country: request.cf?.country || null,
        city: request.cf?.city || null,
        region: request.cf?.region || null,
        timezone: request.cf?.timezone || null,
        colo: request.cf?.colo || null
      });
    }

    // API: HTTP headers
    if (url.pathname === "/api/headers") {
      const headers = {};

      for (const [key, value] of request.headers) {
        headers[key] = value;
      }

      return Response.json(headers);
    }

    // API: User Agent
    if (url.pathname === "/api/user-agent") {
      return Response.json({
        userAgent: request.headers.get("User-Agent")
      });
    }

    // Semua request lainnya → website
    return env.ASSETS.fetch(request);
  }
};
