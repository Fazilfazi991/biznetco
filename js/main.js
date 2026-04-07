// ─── INIT URL PARAMS ───
const urlParams = new URLSearchParams(window.location.search);

// ─── ADMIN VIEWS ───
function admView(name,el){
  document.querySelectorAll('.adm-view').forEach(v=>v.classList.remove('on'));
  document.querySelectorAll('.adm-tab').forEach(t=>t.classList.remove('on'));
  const v=document.getElementById('adv-'+name);if(v)v.classList.add('on');
  if(el)el.classList.add('on');
}

// ─── SHOW DETAIL ───
const showData={
  gulfood:{name:'Gulfood 2026',emoji:'🍽️',date:'17–21 Feb 2026',loc:'Dubai World Trade Centre, UAE',industry:'Food & Beverage',desc:'The world\'s largest annual food & beverage trade show. Gulfood connects food industry professionals with buyers, distributors, and decision-makers from 190+ countries. Over 5,000 exhibitors across 26 product sectors.',website:'https://gulfood.com',freq:'Annual',size:'5,000+ exhibitors · 100,000+ visitors',highlights:['World\'s largest food trade show','26 product sectors — dairy to specialty food','Dedicated buyer matchmaking sessions','Investor & startup programme'],suppliers:12,color:'#16a34a'},
  gitex:{name:'GITEX Global 2025',emoji:'💻',date:'13–17 Oct 2025',loc:'Dubai World Trade Centre, UAE',industry:'IT & Technology',desc:'The world\'s largest tech show and startup event. 6,500+ exhibitors across AI, cybersecurity, cloud, and emerging tech.',website:'https://gitex.com',freq:'Annual',size:'6,500+ exhibitors · 180,000+ visitors',highlights:['AI & Future Tech dedicated zones','GITEX Startup Movement — 1,000+ startups','Investor matchmaking','Global Government Summit'],suppliers:8,color:'#2563eb'},
  arabhealth:{name:'Arab Health 2026',emoji:'🏥',date:'26–29 Jan 2026',loc:'Dubai World Trade Centre, UAE',industry:'Healthcare',desc:'The largest healthcare exhibition and conference in the Middle East & Africa. Showcases medical technologies, devices, diagnostics, and health services.',website:'https://arabhealthonline.com',freq:'Annual',size:'3,000+ exhibitors · 55,000+ visitors',highlights:['Medical devices & diagnostics','Pharma & lab equipment','Hospital design & infrastructure','CME accredited conference'],suppliers:6,color:'#7c3aed'},
  adipec:{name:'ADIPEC 2025',emoji:'⚡',date:'4–7 Nov 2025',loc:'ADNEC, Abu Dhabi, UAE',industry:'Energy & Petroleum',desc:'The world\'s most impactful energy event. Brings together energy ministers, CEOs, and innovators shaping the future of energy — from oil & gas to renewables.',website:'https://adipec.com',freq:'Annual',size:'2,200+ exhibitors · 160,000+ visitors',highlights:['Oil & gas equipment & services','Energy transition technologies','Offshore & marine zone','Technical conference & awards'],suppliers:4,color:'#f59e0b'},
  hannover:{name:'Hannover Messe 2026',emoji:'🏭',date:'22–26 Mar 2026',loc:'Hannover Exhibition Grounds, Germany',industry:'Manufacturing',desc:'The world\'s leading trade fair for industrial technology. Covers automation, energy, digital transformation, and industrial supply chains.',website:'https://hannovermesse.de',freq:'Annual',size:'4,000+ exhibitors · 130,000+ visitors',highlights:['Industrial automation & robotics','Digital factory & IIoT','Energy & mobility','Hydrogen & decarbonisation'],suppliers:9,color:'#0a1f44'},
  ces:{name:'CES 2026',emoji:'📱',date:'7–10 Jan 2026',loc:'Las Vegas Convention Center, USA',industry:'Consumer Electronics',desc:'The most influential tech event in the world. Showcases breakthrough technologies — from 8K TVs to autonomous vehicles, smart homes, and health tech.',website:'https://ces.tech',freq:'Annual',size:'4,500+ exhibitors · 135,000+ visitors',highlights:['Consumer electronics & gadgets','Automotive & mobility tech','Health & wellness tech','Startup & innovation zones'],suppliers:5,color:'#2563eb'},
  anuga:{name:'Anuga 2025',emoji:'🌾',date:'4–8 Oct 2025',loc:'Cologne Exhibition Centre, Germany',industry:'Food & Beverage',desc:'The world\'s leading trade fair for food and beverages. Global meeting point for the food & beverage sector — buyers from 200+ countries across 10 specialised trade fairs.',website:'https://anuga.com',freq:'Biennial',size:'7,500+ exhibitors · 170,000+ visitors',highlights:['10 specialised shows in one','Organic & health food','Beverages & dairy','Retail & foodservice buyers'],suppliers:7,color:'#16a34a'},
  big5:{name:'Big 5 Global 2025',emoji:'🏗️',date:'24–27 Nov 2025',loc:'Dubai World Trade Centre, UAE',industry:'Construction',desc:"The Middle East's largest construction and building materials exhibition. Connects construction professionals with suppliers of building materials, systems, and technologies.",website:'https://big5construct.com',freq:'Annual',size:'2,500+ exhibitors · 75,000+ visitors',highlights:['Building materials & products','Structural & civil engineering','Smart building technology','MEP (mechanical, electrical, plumbing)'],suppliers:3,color:'#92400e'}
};

function openShow(key){
  window.location.href = 'show-detail.html?show=' + key;
}

// ─── STATE ───
let currentPlan = 'free';
let selectedEmoji = '🌾';
let editingProdId = null;

// Initial Nav State for Auth (UI update)
document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('biz_logged_in') === 'true';
    if(isLoggedIn) {
        if(document.getElementById('loginBtn')) document.getElementById('loginBtn').style.display='none';
        if(document.getElementById('registerBtn')) document.getElementById('registerBtn').style.display='none';
        if(document.getElementById('tnAvatar')) document.getElementById('tnAvatar').style.display='flex';
        if(document.getElementById('dashBtn')) document.getElementById('dashBtn').style.display='block';
    }
});

// ─── SEARCH & FILTER ───
function fc(el, group) {
  el.closest('.fchips').querySelectorAll('.fchip').forEach(c => c.classList.remove('on'));
  el.classList.add('on');
}

function runSearch() {
  const inputEl = document.getElementById('dirInput');
  if(!inputEl) return;
  const q = inputEl.value.trim();
  const defView = document.getElementById('dirDefaultView');
  const srchView = document.getElementById('dirSearchView');
  if(!defView || !srchView) return;

  if(q) {
    defView.style.display='none'; srchView.style.display='block';
    document.getElementById('searchTerm').textContent=q;
    document.getElementById('searchCount').textContent=Math.floor(Math.random()*6)+3;
    const pname1=document.getElementById('prc-pname-1');
    const pname2=document.getElementById('prc-pname-2');
    const emoji1=document.getElementById('prc-emoji-1');
    const ql=q.toLowerCase();
    if(ql.includes('honey')){ pname1.textContent='Raw Sidr Honey — Export Grade'; pname2.textContent='Manuka Honey MGO 300+ Certified'; emoji1.textContent='🍯'; }
    else if(ql.includes('steel')||ql.includes('pipe')){ pname1.textContent='Stainless Steel Pipes — Grade 316'; pname2.textContent='Galvanized Steel Pipe — API 5L'; emoji1.textContent='🔩'; }
    else if(ql.includes('solar')||ql.includes('panel')){ pname1.textContent='Solar Panel 550W Monocrystalline'; pname2.textContent='Solar Panel 400W Bifacial'; emoji1.textContent='⚡'; }
    else if(ql.includes('glove')||ql.includes('medical')){ pname1.textContent='Nitrile Examination Gloves (Box 100)'; pname2.textContent='Latex Surgical Gloves — Sterile'; emoji1.textContent='🧤'; }
    else if(ql.includes('chocolate')||ql.includes('bounty')){ pname1.textContent='Bounty Chocolate Gift Box 250g'; pname2.textContent='Mixed Chocolate Gift Set — 12pc'; emoji1.textContent='🍫'; }
    else if(ql.includes('rice')){ pname1.textContent='Basmati Rice Premium — 25kg Export'; pname2.textContent='Jasmine Rice Grade A — 50kg Bulk'; emoji1.textContent='🍚'; }
    else { pname1.textContent=q+' — Export Grade'; pname2.textContent=q+' — Premium Quality'; emoji1.textContent='📦'; }
  } else { clearSearch(); }
}

function clearSearch() {
  const inputEl = document.getElementById('dirInput');
  if(inputEl) inputEl.value='';
  if(document.getElementById('dirDefaultView')) document.getElementById('dirDefaultView').style.display='block';
  if(document.getElementById('dirSearchView')) document.getElementById('dirSearchView').style.display='none';
}

function hs(txt) { 
    document.getElementById('heroInput').value=txt; 
}

function doHeroSearch() {
  const q = document.getElementById('heroInput').value.trim();
  if(q) {
      window.location.href = 'directory.html?q=' + encodeURIComponent(q);
  }
}

// ─── AUTH ───
// These are for the auth.html page
function switchAuth(tab) {
  document.querySelectorAll('.auth-tab').forEach(t=>t.classList.remove('on'));
  document.querySelectorAll('.auth-panel').forEach(p=>p.classList.remove('on'));
  const tid='at'+tab.charAt(0).toUpperCase()+tab.slice(1);
  const pid='ap'+tab.charAt(0).toUpperCase()+tab.slice(1);
  if(document.getElementById(tid)) document.getElementById(tid).classList.add('on');
  if(document.getElementById(pid)) document.getElementById(pid).classList.add('on');
}

function doLogin() {
  localStorage.setItem('biz_logged_in', 'true');
  document.querySelectorAll('.auth-panel').forEach(p=>p.classList.remove('on'));
  if(document.getElementById('apSuccess')) document.getElementById('apSuccess').classList.add('on');
  
  setTimeout(() => {
     const next = urlParams.get('next') || 'dashboard.html';
     window.location.href = next;
  }, 1000);
}

function doRegister(){ doLogin(); }

function logout() {
  localStorage.removeItem('biz_logged_in');
  window.location.href = 'index.html';
}

// ─── MODALS ───
function openReqModal(){ 
    const md = document.getElementById('reqModal');
    if(md) {
        md.classList.add('open'); 
        document.body.style.overflow='hidden'; 
    } else {
        window.location.href = 'requirements.html#post';
    }
}
function closeReqModal(){ if(document.getElementById('reqModal')) { document.getElementById('reqModal').classList.remove('open'); document.body.style.overflow=''; } }
if(document.getElementById('reqModal')) document.getElementById('reqModal').addEventListener('click',function(e){if(e.target===this)closeReqModal();});

// PRODUCT MODAL
const prodData={
  1:{name:'Wheat Flour 25kg',cat:'Grains & Cereals',pack:'25kg bag',moq:'1 tonne',price:'AED 65-80/bag',desc:'Premium grade wheat flour. Export ready.',emoji:'🌾',certs:['halal','iso']},
  2:{name:'Basmati Rice Premium',cat:'Grains & Cereals',pack:'50kg bag',moq:'500kg',price:'AED 120-150/50kg',desc:'Long grain aged basmati for retail and food service.',emoji:'🍚',certs:['halal']},
  3:{name:'Sunflower Oil',cat:'Oils & Fats',pack:'5L / 20L',moq:'200 units',price:'AED 18-22/L',desc:'Refined sunflower oil in 5L PET and 20L bulk containers.',emoji:'🫒',certs:['halal']}
};
function openProdModal() {
  editingProdId=null;
  document.getElementById('prodModalTitle').textContent='Add Product';
  document.getElementById('prodModalSaveBtn').textContent='Save Product →';
  ['pm-name','pm-pack','pm-moq','pm-price','pm-cert-other','pm-desc'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
  const cat=document.getElementById('pm-cat'); if(cat)cat.value='';
  ['halal','organic','iso','fda','ce','kosher'].forEach(c=>{const el=document.getElementById('cert-'+c);if(el)el.checked=false;});
  const first=document.querySelector('.emoji-opt'); if(first)selectEmoji(first,'🌾');
  document.getElementById('prodModal').classList.add('open'); document.body.style.overflow='hidden';
}
function openEditProd(id) {
  editingProdId=id; const d=prodData[id]; if(!d)return;
  document.getElementById('prodModalTitle').textContent='Edit Product';
  document.getElementById('prodModalSaveBtn').textContent='Update Product →';
  document.getElementById('pm-name').value=d.name;
  document.getElementById('pm-cat').value=d.cat;
  document.getElementById('pm-pack').value=d.pack;
  document.getElementById('pm-moq').value=d.moq;
  document.getElementById('pm-price').value=d.price;
  document.getElementById('pm-desc').value=d.desc;
  document.getElementById('pm-cert-other').value='';
  ['halal','organic','iso','fda','ce','kosher'].forEach(c=>{const el=document.getElementById('cert-'+c);if(el)el.checked=(d.certs||[]).includes(c);});
  const emojiEl=Array.from(document.querySelectorAll('.emoji-opt')).find(e=>e.textContent.trim()===d.emoji);
  if(emojiEl)selectEmoji(emojiEl,d.emoji);
  document.getElementById('prodModal').classList.add('open'); document.body.style.overflow='hidden';
}
function closeProdModal(){ if(document.getElementById('prodModal')) { document.getElementById('prodModal').classList.remove('open'); document.body.style.overflow=''; } }
function saveProd(){
  const name=document.getElementById('pm-name').value.trim();
  if(!name){showToast('⚠️ Add a product name');return;}
  closeProdModal(); showToast(editingProdId?'✅ Product updated!':'✅ Product added!');
}
function deleteProd(id){
  const row=document.getElementById('pr-'+id);
  if(row){row.style.opacity='0';row.style.transition='opacity .3s';setTimeout(()=>{row.remove();showToast('Product deleted');},300);}
}
function selectEmoji(el,emoji){
  document.querySelectorAll('.emoji-opt').forEach(e=>e.classList.remove('on'));
  el.classList.add('on'); selectedEmoji=emoji;
}
if(document.getElementById('prodModal')) document.getElementById('prodModal').addEventListener('click',function(e){if(e.target===this)closeProdModal();});

const dashTitles={overview:'Overview',profile:'My Profile',products:'Products',matches:'My Matches',visibility:'Listing Visibility',upgrade:'Plans & Upgrade',settings:'Settings'};
const dashSubs={overview:'Welcome back, Ahmed',profile:'Edit your company details',products:'Manage your product catalogue',matches:'Your automatic match results',visibility:'Control what buyers can see',upgrade:'Choose the right plan',settings:'Account & notification settings'};
function dashView(name,mobEl){
  document.querySelectorAll('.dview').forEach(v=>v.classList.remove('on'));
  document.querySelectorAll('.ds-item').forEach(b=>b.classList.remove('on'));
  const dv=document.getElementById('dv-'+name); if(dv)dv.classList.add('on');
  const dni=document.getElementById('dni-'+name); if(dni)dni.classList.add('on');
  if(mobEl){document.querySelectorAll('.dmn-item').forEach(m=>m.classList.remove('on'));mobEl.classList.add('on');}
  if(document.getElementById('dtbTitle'))document.getElementById('dtbTitle').textContent=dashTitles[name]||name;
  if(document.getElementById('dtbSub'))document.getElementById('dtbSub').textContent=dashSubs[name]||'';
  const dm=document.querySelector('.dash-main'); if(dm)dm.scrollTo(0,0);
}
function selectPlan(plan){ currentPlan=plan; applyPlan(); showToast('✅ Switched to '+plan.charAt(0).toUpperCase()+plan.slice(1)+'!'); setTimeout(()=>dashView('overview'),1200); }
function applyPlan(){
  const p=currentPlan;
  const dotC={free:'#9eaab6',pro:'#00b89c',premium:'#f59e0b'};
  if(document.getElementById('dsPlanDot'))document.getElementById('dsPlanDot').style.background=dotC[p];
  if(document.getElementById('dsPlanName'))document.getElementById('dsPlanName').textContent=p.charAt(0).toUpperCase()+p.slice(1);
  const banEl=document.getElementById('planBanner');
  if(banEl){
    banEl.className='plan-banner '+p;
    document.getElementById('pbBadge').className='pb-badge '+p;
    document.getElementById('pbBadge').textContent=p.toUpperCase()+' PLAN';
    if(p==='free'){
      document.getElementById('pbTitle').textContent="You're on Free";
      document.getElementById('pbDesc').textContent="Upgrade to Pro to make products searchable and unlock 5 matches.";
      document.getElementById('pbRight').innerHTML=`<button class="btn btn-teal" style="font-size:12px;padding:8px 14px;" onclick="dashView('upgrade')">Upgrade →</button>`;
    } else if(p==='pro'){
      document.getElementById('pbTitle').textContent="You're on Pro";
      document.getElementById('pbDesc').textContent="Products visible in search · 5 matches · Featured listing.";
      document.getElementById('pbRight').innerHTML=`<button class="btn" style="background:var(--ink);color:#fff;font-size:12px;padding:8px 14px;" onclick="dashView('upgrade')">→ Premium</button>`;
    } else {
      document.getElementById('pbTitle').textContent="You're on Premium";
      document.getElementById('pbDesc').textContent="Full access · 10+ matches · Unlimited products · Requirement contacts unlocked.";
      document.getElementById('pbRight').innerHTML=`<span style="font-size:12px;color:var(--green);font-weight:600;">✓ Full access</span>`;
    }
  }
  if(document.getElementById('dStatMatches'))document.getElementById('dStatMatches').textContent=p==='free'?'3':p==='pro'?'5':'10+';
  if(document.getElementById('dStatMatchSub'))document.getElementById('dStatMatchSub').textContent=p==='free'?'1 visible':'All unlocked';
  if(document.getElementById('dStatProdSub'))document.getElementById('dStatProdSub').textContent=p==='free'?'Hidden from buyers':p==='pro'?'Visible in search (up to 10)':'Unlimited & visible';
  if(document.getElementById('visCurrentPlan'))document.getElementById('visCurrentPlan').textContent=p.charAt(0).toUpperCase()+p.slice(1);
  ['free','pro','premium'].forEach(pl=>{
    const el=document.getElementById('po-'+pl); if(!el)return;
    el.className='plan-opt'+(pl===p?' curr':pl==='pro'&&p==='free'?' pop':'');
    const btn=el.querySelector('.po-btn'); if(!btn)return;
    btn.disabled=false;
    if(pl===p){btn.textContent='Active Plan';btn.className='po-btn po-btn-curr';btn.disabled=true;}
    else if(pl==='pro'){btn.textContent='Upgrade to Pro';btn.className='po-btn po-btn-teal';btn.onclick=()=>selectPlan('pro');}
    else if(pl==='premium'){btn.textContent='Get Premium';btn.className='po-btn po-btn-navy';btn.onclick=()=>selectPlan('premium');}
    else{btn.textContent='Switch to Free';btn.className='po-btn po-btn-curr';btn.onclick=()=>selectPlan('free');}
  });
}
function handleProdToggle(){
  if(currentPlan==='free'){showToast('Upgrade to Pro to enable product search visibility');return;}
  document.getElementById('prodSearchToggle').classList.toggle('on');
  showToast('Product search visibility updated');
}
function showToast(msg){
  const t=document.getElementById('toast'); if(!t) return;
  t.textContent=msg; t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),2800);
}
const pts=['organic honey','solar panels','medical gloves','steel pipes 316','Bounty chocolate boxes','basmati rice bulk'];
let pi=0;
setInterval(()=>{pi=(pi+1)%pts.length;const i=document.getElementById('heroInput');if(i&&document.activeElement!==i)i.placeholder='Search: '+pts[pi]+'...';},3200);
applyPlan();

