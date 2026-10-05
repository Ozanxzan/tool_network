const $=id=>document.getElementById(id);
const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
const panel=$("panel"),title=$("title"),desc=$("desc"),controls=$("controls"),result=$("result");

async function api(path){const r=await fetch(path);if(!r.ok)throw Error("Request failed");return r.json()}
function show(t,d,c=""){panel.classList.add("show");title.textContent=t;desc.textContent=d;controls.innerHTML=c;result.innerHTML="Loading...";panel.scrollIntoView({behavior:"smooth",block:"start"})}

async function loadIP(){
 try{const d=await api("/api/ip");$("ip").textContent=d.ip||"Unavailable";$("ipmeta").textContent=[d.city,d.region,d.country,d.asn,d.isp].filter(Boolean).join(" • ")||"Network detected"}
 catch{$("ip").textContent="Unavailable";$("ipmeta").textContent="Could not detect IP"}
}
async function ipTool(){show("🌐 IP Checker","Information detected from your connection.");try{const d=await api("/api/ip");result.innerHTML=Object.entries(d).map(([k,v])=>`<div class="row"><span class="muted">${esc(k)}</span><b>${esc(v||"—")}</b></div>`).join("")}catch{result.innerHTML='<span class="err">Unable to retrieve data.</span>'}}

function dnsTool(){show("🔎 DNS Lookup","Query a DNS record.",`<div class="controls"><input id="domain" placeholder="example.com"><select id="dtype"><option>A</option><option>AAAA</option><option>MX</option><option>CNAME</option><option>NS</option><option>TXT</option></select><button id="go">Lookup</button></div>`);$("go").onclick=dns}
async function dns(){const d=$("domain").value.trim(),t=$("dtype").value;if(!d){result.innerHTML='<span class="err">Enter a domain.</span>';return}result.textContent="Looking up...";try{const r=await fetch(`https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(d)}&type=${t}`,{headers:{accept:"application/dns-json"}});const x=await r.json();result.textContent=(x.Answer||[]).map(a=>`${a.name} → ${a.data}`).join("\n")||"No records found."}catch{result.innerHTML='<span class="err">DNS lookup failed.</span>'}}

function uaTool(){show("📱 User-Agent","Browser User-Agent received by the Worker.");api("/api/ua").then(d=>result.textContent=d.userAgent||"Unavailable").catch(()=>result.textContent="Unavailable")}
function headersTool(){show("📋 HTTP Headers","Request headers received by the Worker.");api("/api/headers").then(d=>result.textContent=JSON.stringify(d,null,2)).catch(()=>result.textContent="Unavailable")}
function leakTool(){show("🛡️ DNS Leak Test","Basic DNS diagnostic.");result.innerHTML='<div class="row"><span>DoH resolver</span><b>Cloudflare DNS</b></div><div class="row"><span>Diagnostic</span><b>Available</b></div><p class="muted">This is a basic diagnostic, not a full multi-resolver DNS leak test.</p>'}
function portTool(){show("🔌 Port Checker","HTTP/HTTPS reachability check (not a raw TCP scanner).",`<div class="controls"><input id="host" placeholder="example.com"><select id="port"><option>80</option><option>443</option><option>8080</option><option>8443</option></select><button id="check">Check</button></div>`);$("check").onclick=checkPort}
async function checkPort(){const h=$("host").value.trim(),p=$("port").value;if(!h){result.innerHTML='<span class="err">Enter a hostname.</span>';return}result.textContent="Checking...";try{const d=await api(`/api/port?host=${encodeURIComponent(h)}&port=${p}`);result.textContent=JSON.stringify(d,null,2)}catch{result.innerHTML='<span class="err">Check failed.</span>'}}
document.querySelectorAll(".card").forEach(b=>b.onclick=()=>({ip:ipTool,dns:dnsTool,leak:leakTool,ua:uaTool,headers:headersTool,port:portTool,asn:ipTool}[b.dataset.tool])());
loadIP();