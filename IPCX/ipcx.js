(()=>{if(window.__VBAR__)return;window.__VBAR__=1;
const d=document,b=d.body||d.documentElement;
const bar=d.createElement("div");bar.id="vbar";
bar.innerHTML='<span class="d"></span><span id="vip">IP…</span><span class="s">•</span><span id="vct">城市…</span>';
const st=d.createElement("style");st.textContent=
'#vbar{position:fixed;left:50%;bottom:12px;transform:translateX(-50%);z-index:9999;display:flex;align-items:center;gap:8px;max-width:92vw;padding:10px 12px;border-radius:16px;'+
'background:rgba(219,234,254,.78);border:1px solid rgba(59,130,246,.22);'+
'backdrop-filter:blur(12px) saturate(160%);-webkit-backdrop-filter:blur(12px) saturate(160%);'+
'box-shadow:0 12px 30px rgba(2,6,23,.12);'+
'font:13px/1.2 system-ui,-apple-system,"Google Sans",Roboto,"Noto Sans SC","Noto Sans",Segoe UI,Helvetica,Arial,sans-serif;'+
'letter-spacing:.2px;color:rgba(15,23,42,.92)}'+
'#vbar .d{width:8px;height:8px;border-radius:99px;background:rgba(59,130,246,.92);flex:0 0 auto}'+
'#vip,#vct{min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'+
'#vip{max-width:56vw;font-variant-numeric:tabular-nums;direction:ltr}'+
'#vct{max-width:32vw;opacity:.85}'+
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
