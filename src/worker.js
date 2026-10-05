export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/ip") {
      const cf = request.cf || {};
      let isp = null, asn = cf.asn ? `AS${cf.asn}` : null;
      try {
        const r = await fetch("https://ipwho.is/" + (request.headers.get("CF-Connecting-IP") || ""));
        if (r.ok) {
          const d = await r.json();
          isp = d.connection?.isp || null;
          asn = d.connection?.asn ? `AS${d.connection.asn}` : asn;
        }
      } catch {}
      return Response.json({
        ip: request.headers.get("CF-Connecting-IP"),
        country: cf.country || null,
        city: cf.city || null,
        region: cf.region || null,
        timezone: cf.timezone || null,
        asn, isp
      });
    }

    if (url.pathname === "/api/ua") {
      return Response.json({ userAgent: request.headers.get("User-Agent") || "" });
    }

    if (url.pathname === "/api/headers") {
      const out = {};
      for (const [k,v] of request.headers) out[k] = v;
      return Response.json(out);
    }

    if (url.pathname === "/api/port") {
      const host = url.searchParams.get("host");
      const port = url.searchParams.get("port");
      if (!host || !/^\d{1,5}$/.test(port || "")) return Response.json({error:"Invalid host or port"}, {status:400});
      const protocol = port === "443" || port === "8443" ? "https" : "http";
      const target = `${protocol}://${host}:${port}/`;
      const started = Date.now();
      try {
        const r = await fetch(target, {method:"HEAD", redirect:"manual"});
        return Response.json({target, reachable:true, status:r.status, responseMs:Date.now()-started});
      } catch {
        return Response.json({target, reachable:false, responseMs:Date.now()-started});
      }
    }

    return env.ASSETS.fetch(request);
  }
};