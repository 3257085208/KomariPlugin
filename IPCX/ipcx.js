(()=>{if(window.__VBAR__)return;window.__VBAR__=1;
const d=document,b=d.body||d.documentElement;
const bar=d.createElement("div");bar.id="vbar";
bar.innerHTML='<span class="g" aria-hidden="true"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g1" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse"><stop stop-color="#60A5FA"/><stop offset="1" stop-color="#2563EB"/></linearGradient></defs><circle cx="12" cy="12" r="9" fill="url(#g1)"/><path d="M3.6 12h16.8M12 3.2c2.4 2.6 3.6 5.8 3.6 8.8S14.4 18.2 12 20.8M12 3.2C9.6 5.8 8.4 9 8.4 12s1.2 6.2 3.6 8.8" stroke="rgba(255,255,255,.85)" stroke-width="1.2" stroke-linecap="round"/></svg></span><span id="vip">IP…</span><span class="s">•</span><span id="vct">城市…</span>';
const st=d.createElement("style");st.textContent=
'#vbar{position:fixed;left:50%;bottom:12px;transform:translateX(-50%);z-index:9999;display:flex;align-items:center;gap:8px;max-width:92vw;padding:11px 14px;border-radius:18px;'+
'background:#eaf2ff;'+
'box-shadow:10px 10px 24px rgba(15,23,42,.16),-10px -10px 24px rgba(255,255,255,.95);'+
'font:13px/1.2 system-ui,-apple-system,"Google Sans",Roboto,"Noto Sans SC","Noto Sans",Segoe UI,Helvetica,Arial,sans-serif;'+
'letter-spacing:.2px;color:rgba(15,23,42,.9)}'+
'#vbar:active{box-shadow:inset 7px 7px 16px rgba(15,23,42,.16),inset -7px -7px 16px rgba(255,255,255,.95)}'+
'#vbar .g{width:18px;height:18px;display:grid;place-items:center;border-radius:999px;'+ 'box-shadow:inset 2px 2px 6px rgba(15,23,42,.12),inset -2px -2px 6px rgba(255,255,255,.9);}'+ '#vbar .g svg{display:block}'+
'#vip,#vct{min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'+
'#vip{max-width:56vw;font-variant-numeric:tabular-nums;direction:ltr}'+
'#vct{max-width:32vw;opacity:.88}'+
'#vbar .s{opacity:.35;flex:0 0 auto}';
(d.head||b).appendChild(st);b.appendChild(bar);

const $ip=d.getElementById("vip"),$ct=d.getElementById("vct");
const getT=u=>fetch(u,{cache:"no-store"}).then(r=>r.ok?r.text():Promise.reject()).then(t=>t.trim());
const getJ=u=>fetch(u,{cache:"no-store"}).then(r=>r.ok?r.json():Promise.reject());
(async()=>{
  let ip="";
  try{ip=await getT("https://api-ipv4.ip.sb/ip");}
  catch{try{ip=await getT("https://api-ipv6.ip.sb/ip");}
  catch{try{ip=await getT("https://api.ip.sb/ip");}catch{}}}

  let city="";
  try{const g=await getJ("https://api.ip.sb/geoip/"+encodeURIComponent(ip));
      city=g.city||g.region||"";}
  catch{
    // 兜底：如果 ip.sb 挂了，尝试 ipapi（同样不显示国家）
    try{const g=await getJ("https://ipapi.co/json/"); ip=ip||g.ip||""; city=city||g.city||g.region||"";}catch{}
  }

  $ip.textContent=ip||"未知IP";
  $ct.textContent=city||"未知城市";
})();
})();
