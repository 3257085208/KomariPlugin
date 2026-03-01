(()=>{if(window.__VBAR__)return;window.__VBAR__=1;
const d=document;

const init=()=>{
  const b=d.body||d.documentElement;
  if(!b) return;

  const bar=d.createElement("div");bar.id="vbar";
  bar.innerHTML='<span class="ic" aria-hidden="true"><svg viewBox="0 0 24 24" width="16" height="16"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3.6 12h16.8" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M12 3c2.4 2.7 3.6 5.9 3.6 9s-1.2 6.3-3.6 9c-2.4-2.7-3.6-5.9-3.6-9S9.6 5.7 12 3Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg></span><span id="vip">IP…</span><span class="s">·</span><span id="vct">城市…</span>';

  const st=d.createElement("style");st.textContent=
  '#vbar{position:fixed;left:50%;bottom:12px;transform:translateX(-50%);z-index:9999;display:flex;align-items:center;gap:10px;max-width:92vw;padding:10px 14px;border-radius:999px;'+
  'background:rgba(239,246,255,.92);border:1px solid rgba(37,99,235,.10);'+
  'box-shadow:0 10px 26px rgba(2,6,23,.10);'+
  'backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);'+
  'font:500 13px/1.15 ui-rounded,system-ui,-apple-system,"Google Sans",Roboto,"Noto Sans SC","Noto Sans",Segoe UI,Helvetica,Arial,sans-serif;'+
  'color:rgba(15,23,42,.92)}'+
  '#vbar .ic{color:rgba(37,99,235,.92);display:grid;place-items:center;width:24px;height:24px;border-radius:999px;'+
  'background:rgba(37,99,235,.08);box-shadow:inset 0 1px 0 rgba(255,255,255,.65)}'+
  '#vip,#vct{min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'+
  '#vip{max-width:56vw;font-variant-numeric:tabular-nums;letter-spacing:.1px}'+
  '#vct{max-width:32vw;opacity:.88}'+
  '#vbar .s{opacity:.35;flex:0 0 auto}'+
  '@media (prefers-color-scheme: dark){#vbar{background:rgba(15,23,42,.62);border-color:rgba(147,197,253,.12);color:rgba(248,250,252,.92);box-shadow:0 12px 32px rgba(0,0,0,.35)}#vbar .ic{color:rgba(147,197,253,.95);background:rgba(147,197,253,.14);box-shadow:inset 0 1px 0 rgba(255,255,255,.12)}}';

  (d.head||b).appendChild(st);
  b.appendChild(bar);

  const $ip=d.getElementById("vip"),$ct=d.getElementById("vct");
  const getT=u=>fetch(u,{cache:"no-store"}).then(r=>r.ok?r.text():Promise.reject()).then(t=>t.trim());
  const getJ=u=>fetch(u,{cache:"no-store"}).then(r=>r.ok?r.json():Promise.reject());

  (async()=>{
    let ip="";
    try{ip=await getT("https://api-ipv4.ip.sb/ip");}
    catch{try{ip=await getT("https://api-ipv6.ip.sb/ip");}
    catch{try{ip=await getT("https://api.ip.sb/ip");}catch{}}}

    let city="";
    try{const g=await getJ("https://api.ip.sb/geoip/"+encodeURIComponent(ip));city=g.city||g.region||"";}
    catch{try{const g=await getJ("https://ipapi.co/json/");ip=ip||g.ip||"";city=city||g.city||g.region||"";}catch{}}

    $ip.textContent=ip||"未知IP";
    $ct.textContent=city||"未知城市";
  })();
};

if(d.readyState==="loading") d.addEventListener("DOMContentLoaded",init,{once:true});
else init();
})();
