/*
 FAULTLINE YEAR:2026
 Artist: Vinay K Nandishettar
 X: @VIBEZVKN
*/
window.$useRenderPreview=true;
const HASH=tokenData.hash;
const OUT_W=2400,OUT_H=3200,W=1600,K=OUT_W/W,H=OUT_H/K,M=34,CANVAS="#F1E7D2",INK="#241C15";
const PAGE_BG="transparent";
let SVG="";

const fx=v=>Math.round(v*100)/100;
class SVGCtx{
  constructor(){this.o=[];this.defs=[];this.n=0;this.st=[];this.open=0;this.d="";this.fillStyle="#000";this.strokeStyle="#000";this.lineWidth=1}
  col(v,a){const m=/^rgba\(([^)]+)\)$/.exec(v);if(!m)return a+'="'+v+'"';
    const p=m[1].split(",").map(s=>s.trim());return a+'="rgb('+p[0]+","+p[1]+","+p[2]+')" '+a+'-opacity="'+p[3]+'"'}
  save(){this.st.push({f:this.fillStyle,s:this.strokeStyle,l:this.lineWidth,o:this.open});this.open=0}
  restore(){while(this.open>0){this.o.push("</g>");this.open--}const s=this.st.pop();this.fillStyle=s.f;this.strokeStyle=s.s;this.lineWidth=s.l;this.open=s.o}
  beginPath(){this.d=""}
  moveTo(x,y){this.d+="M"+fx(x)+" "+fx(y)}
  lineTo(x,y){this.d+="L"+fx(x)+" "+fx(y)}
  closePath(){this.d+="Z"}
  rect(x,y,w,h){this.d+="M"+fx(x)+" "+fx(y)+"h"+fx(w)+"v"+fx(h)+"h"+fx(-w)+"Z"}
  arc(x,y,r){this.d+="M"+fx(x+r)+" "+fx(y)+"A"+fx(r)+" "+fx(r)+" 0 1 0 "+fx(x-r)+" "+fx(y)+"A"+fx(r)+" "+fx(r)+" 0 1 0 "+fx(x+r)+" "+fx(y)+"Z"}
  fill(){this.o.push('<path d="'+this.d+'" '+this.col(this.fillStyle,"fill")+"/>")}
  stroke(){this.o.push('<path d="'+this.d+'" fill="none" '+this.col(this.strokeStyle,"stroke")+' stroke-width="'+fx(this.lineWidth)+'" stroke-miterlimit="10"/>')}
  fillRect(x,y,w,h){this.o.push('<rect x="'+fx(x)+'" y="'+fx(y)+'" width="'+fx(w)+'" height="'+fx(h)+'" '+this.col(this.fillStyle,"fill")+"/>")}
  strokeRect(x,y,w,h){this.o.push('<rect x="'+fx(x)+'" y="'+fx(y)+'" width="'+fx(w)+'" height="'+fx(h)+'" fill="none" '+this.col(this.strokeStyle,"stroke")+' stroke-width="'+fx(this.lineWidth)+'" stroke-miterlimit="10"/>')}
  clip(){const id="k"+(this.n++);this.defs.push('<clipPath id="'+id+'"><path d="'+this.d+'"/></clipPath>');this.o.push('<g clip-path="url(#'+id+')">');this.open++}
  end(){while(this.open>0){this.o.push("</g>");this.open--}
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+W+" "+fx(H)+'" width="'+OUT_W+'" height="'+OUT_H+'" preserveAspectRatio="xMidYMid meet" style="display:block"><defs>'+this.defs.join("")+"</defs>"+this.o.join("")+"</svg>"}
}

const NP=(n,c)=>({n,c});
const PAL=[NP("Nilgiri Mist",["#2F7F6B","#E6EEE4","#D1553A","#2B3A3F","#E8B04A","#1B4D44","#9CC9B8","#F3E6C9","#7A3B2A"]),
NP("Kohinoor Ember",["#A63A50","#F0E1DA","#2E8B8F","#35302F","#E9B44C","#5C2434","#93C9C4","#F7E7CF","#3D1F2B"]),
NP("Zanzibar Dusk",["#8E3B9C","#EBE0EE","#F08A4B","#2D2A3E","#F2D04F","#4A2360","#B9A7D9","#FBE3D3","#28163A"]),
NP("Tamarind Lagoon",["#1D7A8C","#E2EEEA","#E26D5C","#243B4A","#F4B860","#14505C","#8FD0CC","#FBE9CF","#0F3340"]),
NP("Vermilion Oasis",["#E0502D","#F4E6CF","#2C8C6E","#3C342B","#F0B93A","#7A2C1A","#A6D6B8","#FAE9C6","#1F4D3B"]),
NP("Peacock Basalt",["#1B6C9E","#E3E8EC","#E8A33D","#2A2F36","#D9534F","#123F63","#8DB7D6","#F6E7C8","#6B2A2E"]),
NP("Marigold Void",["#EFA81B","#F2E8CF","#3E4C9E","#1E1E24","#D8503B","#2B2F6B","#9AA7E0","#FBE8B8","#7C2A20"]),
NP("Cardamom Frost",["#6E9F7A","#ECF0E8","#C8553D","#3A4A48","#EEC25A","#345C47","#BFDCC8","#F7EAD2","#8A3A2A"]),
NP("Jacaranda Ash",["#6F5BD0","#E8E4F4","#E57A9B","#34324A","#F0C36A","#3D3290","#A9A0EC","#FCE4DC","#5A2A5E"]),
NP("Obsidian Bloom",["#D6336C","#EFE0E4","#1E8E8A","#231F26","#F2B134","#7A1F45","#86CBC6","#FBE6D0","#3C1626"]),
NP("Sahara Indigo",["#C97B2A","#F3E6CE","#26437A","#2A2420","#E5584A","#6B3F12","#8EA6D8","#F9E8C0","#14224A"])];
const PW=[.12,.1,.1,.1,.1,.1,.09,.09,.09,.06,.05];
function rngFrom(s){let h=1779033703^s.length;for(let i=0;i<s.length;i++){h=Math.imul(h^s.charCodeAt(i),3432918353);h=h<<13|h>>>19}
h=Math.imul(h^h>>>16,2246822507);h=Math.imul(h^h>>>13,3266489909);let a=(h^=h>>>16)>>>0;
return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const pick=(r,a)=>a[Math.floor(r()*a.length)];
function wp(r,it,w){let x=r()*w.reduce((a,b)=>a+b);for(let i=0;i<it.length;i++){x-=w[i];if(x<=0)return it[i]}return it[it.length-1]}
const hx=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16));
const mix=(a,b,t)=>{const p=hx(a),q=hx(b);return"#"+p.map((v,i)=>Math.round(v+(q[i]-v)*t).toString(16).padStart(2,"0")).join("")};
const lum=h=>{const[p,q,s]=hx(h);return(.2126*p+.7152*q+.0722*s)/255};
function poly(c,pts,f,st){c.fillStyle=f;c.beginPath();pts.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.closePath();c.fill();if(st){c.strokeStyle=INK;c.lineWidth=1.4;c.stroke()}}
const DIR={Zenith:[.7,.7],Dawn:[1,.2],Dusk:[.2,1],Pale:[.7,.7]},S3=Math.sqrt(3);let SHD=INK;
const pth=(c,P)=>{c.beginPath();P.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.closePath()};
const cen=P=>P.reduce((s,p)=>[s[0]+p[0]/P.length,s[1]+p[1]/P.length],[0,0]);
const insetP=(P,k)=>{const m=cen(P);return P.map(p=>[m[0]+(p[0]-m[0])*k,m[1]+(p[1]-m[1])*k])};
const nrmls=P=>P.map((a,i)=>{const b=P[(i+1)%P.length],L=Math.hypot(b[0]-a[0],b[1]-a[1])||1;return[(b[1]-a[1])/L,-(b[0]-a[0])/L]});
function motif(c,T,f,g,mo){
  if(mo==="solid")return;
  const m=cen(T),rad=Math.min(...T.map(p=>Math.hypot(p[0]-m[0],p[1]-m[1])));
  c.save();pth(c,T);c.clip();c.fillStyle=g;c.strokeStyle=g;
  if(mo==="inset"){pth(c,insetP(T,.55));c.fill()}
  else if(mo==="nest"){pth(c,insetP(T,.72));c.fill();c.fillStyle=f;pth(c,insetP(T,.42));c.fill()}
  else if(mo==="dot"){c.beginPath();c.arc(m[0],m[1],rad*.45,0,7);c.fill()}
  else if(mo==="ring"){c.lineWidth=rad*.2;c.beginPath();c.arc(m[0],m[1],rad*.55,0,7);c.stroke()}
  else if(mo==="stripe"){c.lineWidth=rad*.3;for(let q=-4;q<=4;q+=2){c.beginPath();c.moveTo(m[0]+q*rad*.7-2*rad,m[1]-2*rad);c.lineTo(m[0]+q*rad*.7+2*rad,m[1]+2*rad);c.stroke()}}
  else if(mo==="rays"){c.lineWidth=rad*.14;T.forEach(p=>{c.beginPath();c.moveTo(m[0],m[1]);c.lineTo(p[0],p[1]);c.stroke()})}
  else if(mo==="half"){pth(c,[[m[0]-3*rad,m[1]+3*rad],[m[0]+3*rad,m[1]-3*rad],[m[0]+3*rad,m[1]+3*rad]]);c.fill()}
  else if(mo==="cross"){c.fillRect(m[0]-rad*.15,m[1]-rad,rad*.3,rad*2);c.fillRect(m[0]-rad,m[1]-rad*.15,rad*2,rad*.3)}
  c.restore()}
function prism(c,P,e,f,g,mo,sh){
  const n=P.length,N=nrmls(P),dr=DIR[sh],sc=sh==="Pale"?.75:1;
  if(e<0){const d=-e;c.save();pth(c,P);c.clip();
    poly(c,P.map(p=>[p[0]+d,p[1]+d]),mix(f,SHD,.42));
    for(let i=0;i<n;i++)if(N[i][0]+N[i][1]<-.05){const a=P[i],b=P[(i+1)%n];poly(c,[a,b,[b[0]+d,b[1]+d],[a[0]+d,a[1]+d]],mix(f,SHD,.62))}
    c.restore();pth(c,P);c.strokeStyle=INK;c.lineWidth=1.6;c.stroke();return}
  const T=P.map(p=>[p[0]-e,p[1]-e]);
  if(e>0){const k=e*1.5;for(const t of[.3,.55,.8,1])poly(c,P.map(p=>[p[0]+k*t,p[1]+k*t]),"rgba(20,14,10,.09)");
    for(let i=0;i<n;i++){const[nx,ny]=N[i];if(nx+ny>.05){const a=P[i],b=P[(i+1)%n],d=Math.max(0,nx*dr[0]+ny*dr[1]);
      poly(c,[[a[0]-e,a[1]-e],[b[0]-e,b[1]-e],b,a],mix(f,SHD,(.16+.42*d)*sc+.04),1)}}}
  poly(c,T,f,1);motif(c,T,f,g,mo);
  if(mo!=="solid"){pth(c,T);c.strokeStyle=INK;c.lineWidth=1.5;c.stroke()}
  if(e>0){c.strokeStyle="rgba(255,250,238,.5)";c.lineWidth=1.2;c.beginPath();
    for(let i=0;i<n;i++)if(N[i][0]+N[i][1]<-.05){c.moveTo(T[i][0],T[i][1]);c.lineTo(T[(i+1)%n][0],T[(i+1)%n][1])}c.stroke()}}
function hexV(cx,cy,R,fl){return Array.from({length:6},(_,k)=>{const a=(60*k-(fl?0:90))*Math.PI/180;return[cx+R*Math.cos(a),cy+R*Math.sin(a)]})}
function cellsOf(shape,sx,sy,sw,sh,R,fl){
  const o=[],add=(V,i,j)=>o.push({V,C:cen(V),i,j});
  if(shape==="Hexagon"){const dx=fl?1.5*R:S3*R,dy=fl?S3*R:1.5*R;
    for(let j=-1;j<=Math.ceil(sh/dy)+1;j++)for(let i=-1;i<=Math.ceil(sw/dx)+1;i++){
      const cx=sx+i*dx+(fl?0:(j&1?dx/2:0)),cy=sy+j*dy+(fl?(i&1?dy/2:0):0);
      if(cx<sx-R||cx>sx+sw+R||cy<sy-R||cy>sy+sh+R)continue;add(hexV(cx,cy,R,fl),i,j)}}
  else if(shape==="Triangle"){const s=R*1.9,h=S3/2*s;
    for(let j=-1;j<=Math.ceil(sh/h)+1;j++)for(let i=-2;i<=Math.ceil(sw/s)+1;i++){const x=sx+i*s+(j&1?s/2:0),y=sy+j*h;
      add([[x+s/2,y],[x+s,y+h],[x,y+h]],i,j);add([[x+s/2,y],[x+s*1.5,y],[x+s,y+h]],i,j)}}
  else{const a=R*.95;
    for(let j=-1;j<=Math.ceil(sh/a)+1;j++)for(let i=-1;i<=Math.ceil(sw/(2*a))+1;i++){const cx=sx+i*2*a+(j&1?a:0),cy=sy+j*a;add([[cx,cy-a],[cx+a,cy],[cx,cy+a],[cx-a,cy]],i,j)}}
  return o}
function pieces(V,C,t){const n=V.length;
  if(t==="Bisect"&&n>3)return[V.slice(0,n/2+1),V.slice(n/2).concat([V[0]])];
  if(t==="Cube"&&n===6)return[0,1,2].map(m=>[C,V[2*m],V[2*m+1],V[(2*m+2)%6]]);
  if(t==="Radial"||t==="Cube")return V.map((v,k)=>[C,v,V[(k+1)%n]]);
  return[V]}
const SCH=[["Triad Axis",[0,2],[4,6],3],["Hearth Field",[0,4],[8,7],2],["Glacial Field",[2,6],[3,1],0],["Terra Strata",[8,5],[7,1],4],["Monochrome Alpha",[0],[8,1,7],2],["Monochrome Beta",[2],[6,3,1],4],
["Neighbour Hues",[4,0],[8,7],2],["Chalk Field",[1,7],[6,4],2],["Noir Accent",[3,5],[8,1],0],["Prism Full",[0,2,4],[6,7,8,5],3],["Afterglow",[4,8],[0,7],5]];
const MOT=["inset","dot","ring","stripe","rays","half","cross","nest"];
const dst=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]);
const area=P=>Math.abs(P.reduce((s,p,i)=>{const q=P[(i+1)%P.length];return s+p[0]*q[1]-q[0]*p[1]},0))/2;
function clipHP(P,a,b,c){const o=[];for(let i=0;i<P.length;i++){const p=P[i],q=P[(i+1)%P.length],fp=a*p[0]+b*p[1]-c,fq=a*q[0]+b*q[1]-c;
  if(fp<=0)o.push(p);if((fp<0&&fq>0)||(fp>0&&fq<0)){const t=fp/(fp-fq);o.push([p[0]+(q[0]-p[0])*t,p[1]+(q[1]-p[1])*t])}}return o}
function voronoi(S){const F=[[M,M],[W-M,M],[W-M,H-M],[M,H-M]];
  return S.map((s,i)=>{let P=F;for(let j=0;j<S.length&&P.length>2;j++)if(j!==i){const t=S[j];P=clipHP(P,t[0]-s[0],t[1]-s[1],(t[0]*t[0]+t[1]*t[1]-s[0]*s[0]-s[1]*s[1])/2)}return P})}
function generate(seed){
  const r=rngFrom(seed),c=new SVGCtx();
  const pal=wp(r,PAL,PW);
  const shading=wp(r,["Zenith","Dawn","Dusk","Pale"],[.45,.15,.15,.25]);
  const strat=wp(r,["Drift","Anchor","Scatter","Uniform","Altitude"],[.3,.2,.15,.1,.25]);
  const mm=wp(r,["Quiet","Inlaid","Richly Inlaid"],[.2,.45,.35]);
  const sc=wp(r,SCH,[.14,.12,.12,.1,.08,.08,.09,.07,.07,.07,.06]),dom=sc[1].map(i=>pal.c[i]),acc=pal.c[sc[3]];let sup=sc[2].map(i=>pal.c[i]);
  if(![...dom,...sup,acc].some(v=>lum(v)>.7))sup.push(pal.c[7]);
  const RELS=["Shelf","Checker","Slope","Spires","Swell","Basins","Summit","Steps"],RW=[.12,.1,.1,.14,.18,.14,.14,.08];
  const relief0=wp(r,RELS,RW),uniform=r()<.45;
  const til=wp(r,["Hive","Facet","Lozenge","Mosaic"],[.4,.14,.14,.32]),stack=r()<.4,fl=r()<.5;
  const ang=wp(r,["Parallel","Splayed","Scattered"],[.35,.35,.3]),abase=pick(r,[0,15,30])*Math.PI/180,afan=pick(r,[20,40,60])*Math.PI/180;
  const plateMode=wp(r,["Gentle","Stepped","Chasm"],[.3,.4,.3]),maxLv={Gentle:1,Stepped:3,Chasm:4}[plateMode],LV=plateMode==="Chasm"?34:24;
  SHD=mix([...pal.c].sort((a,b)=>lum(a)-lum(b))[0],INK,.5);
  const pool=[...new Set([...dom,...sup,acc])],ramp=pool.slice().sort((a,b)=>lum(a)-lum(b)),mains=dom.filter(v=>lum(v)>=.22);
  const role=()=>{const x=r();let v=x<.58?pick(r,dom):x<.9?pick(r,sup):acc;if(lum(v)<.22&&r()<.55)v=pal.c[7];return v};
  const dens=wp(r,["Sparse","Medium","Dense"],[.3,.45,.25]),n=dens==="Sparse"?7+Math.floor(r()*4):dens==="Medium"?9+Math.floor(r()*8):17+Math.floor(r()*13);
  const spac=wp(r,["Loose","Even","Clustered"],[.35,.4,.25]),X=()=>M+r()*(W-2*M),Y=()=>M+r()*(H-2*M);
  let S=[];
  if(spac==="Clustered"){const cs=Array.from({length:2+Math.floor(r()*2)},()=>[X(),Y()]);
    for(let i=0;i<n;i++){const q=pick(r,cs),sp=200+r()*250;S.push([Math.min(W-M-5,Math.max(M+5,q[0]+(r()+r()+r()-1.5)*sp)),Math.min(H-M-5,Math.max(M+5,q[1]+(r()+r()+r()-1.5)*sp))])}}
  else for(let i=0;i<n;i++)S.push([X(),Y()]);
  if(spac==="Even")for(let it=0;it<2;it++)S=voronoi(S).map((P,i)=>P.length>2?cen(P):S[i]);
  const a1=(r()-.5)*.008,b1=(r()-.5)*.008,ph=r()*6.28;
  const G=voronoi(S).filter(P=>P.length>2&&area(P)>400).map(P=>{const g=cen(P);
    const lv=maxLv?Math.max(0,Math.min(maxLv,Math.round(maxLv*(.5+.5*Math.sin(g[0]*a1+g[1]*b1+ph))+(r()-.5)*1.2))):0;return{P,g,lv,ar:area(P)}});
  G.sort((a,b)=>a.lv-b.lv||a.g[1]-b.g[1]);
  c.fillStyle=CANVAS;c.fillRect(0,0,W,H);
  c.save();c.beginPath();c.rect(M,M,W-2*M,H-2*M);c.clip();
  let prev=null,maxE=0,stk=false;const used=new Set(),shapes=new Set();
  for(const {P:P0,lv,ar} of G){
    const E=lv*LV,Q=P0.map(p=>[p[0]-E,p[1]-E]),cc=cen(Q),rho=Math.max(...Q.map(p=>dst(p,cc)));
    const R=Math.min(130,Math.max(34,Math.sqrt(ar)*pick(r,[.08,.11,.16,.22]))),step=Math.min(22,Math.max(4,R*.16));
    const shape=til==="Hive"?"Hexagon":til==="Facet"?"Triangle":til==="Lozenge"?"Diamond":pick(r,["Hexagon","Triangle","Diamond","Hexagon"]);shapes.add(shape);
    const type=wp(r,["Whole","Bisect","Cube","Radial"],[.15,.2,.3,.35]);used.add(type);
    const relief=uniform?relief0:wp(r,RELS,RW);
    const th=ang==="Parallel"?abase:ang==="Splayed"?abase+afan*(cc[0]/W):r()*Math.PI/2,co=Math.cos(th),si=Math.sin(th);
    const rot=p=>{const dx=p[0]-cc[0],dy=p[1]-cc[1];return[cc[0]+dx*co-dy*si,cc[1]+dx*si+dy*co]};
    const bx0=Math.min(...Q.map(p=>p[0]))-R*1.5,bx1=Math.max(...Q.map(p=>p[0]))+R*1.5,by0=Math.min(...Q.map(p=>p[1]))-R*1.5,by1=Math.max(...Q.map(p=>p[1]))+R*1.5;
    const cl=cellsOf(shape,cc[0]-rho-2*R,cc[1]-rho-2*R,2*rho+4*R,2*rho+4*R,R,fl).map(o=>{const V=o.V.map(rot);return{V,C:cen(V),i:o.i,j:o.j}})
      .filter(o=>o.C[0]>=bx0&&o.C[0]<=bx1&&o.C[1]>=by0&&o.C[1]<=by1);
    if(!cl.length)continue;
    const np=pieces(cl[0].V,cl[0].C,type).length,mo=Array.from({length:np},()=>r()<(mm==="Quiet"?.3:mm==="Inlaid"?.5:.75)?pick(r,MOT):"solid");
    const main=pick(r,(mains.length?mains:dom).filter(v=>v!==prev).length?(mains.length?mains:dom).filter(v=>v!==prev):dom);prev=main;let cur=main;
    const aK=r()<.85?Math.floor(r()*np):-1,cand=[...pool,CANVAS,INK],items=[];
    for(const {V,C,i,j} of cl){
      pieces(V,C,type).forEach((P,k)=>{
        const d=Math.min(1,dst(C,cc)/rho);
        const hz=relief==="Shelf"?(k+i+2*j+99)%3:relief==="Checker"?(((i+j)&1)*2+(k&1)):relief==="Slope"?((i%4)+4)%4:
          relief==="Swell"?Math.round(1.5+1.5*Math.sin(i*.8+j*.55)):relief==="Basins"?((i*2+j*3+99)%5===0?-2:((i+j)&1)+1):
          relief==="Summit"?Math.round(6*(1-d)):relief==="Steps"?Math.abs(((i+j+96)%8)-4):(r()<.22?3+Math.floor(r()*4):0);
        const tot=lv*2+hz;
        const f=(k===aK&&strat!=="Scatter"&&strat!=="Altitude")?acc:strat==="Uniform"?main:strat==="Scatter"?role():strat==="Altitude"?ramp[Math.round(Math.max(0,Math.min(1,(tot+2)/(maxLv*2+8)))*(ramp.length-1))]:strat==="Anchor"?(r()<.1?role():main):(r()<.08&&(cur=role()),cur);
        const cs=cand.filter(v=>Math.abs(lum(v)-lum(f))>.18),g=cs.length?cs[Math.abs(k*3+(strat==="Scatter"?i+j:0))%cs.length]:CANVAS;
        const t=Math.min(.24,Math.max(0,tot)*.035),e=hz>=0?Math.min(hz*step,R*1.3):Math.max(hz*step*.6,-R*.5);maxE=Math.max(maxE,Math.abs(e)+E);
        items.push({P,e,f:mix(f,CANVAS,t),g:mix(g,CANVAS,t),mo:mo[k],hz,step,key:C[0]+C[1]})})}
    if(E>0)prism(c,P0,E,mix(main,SHD,.1),CANVAS,"solid",shading);
    c.save();pth(c,Q);c.clip();items.sort((a,b)=>a.hz-b.hz||a.key-b.key);
    items.forEach(b=>{if(stack&&b.e>=b.step*3){stk=true;const e1=b.e*.5;prism(c,b.P,e1,mix(b.f,SHD,.15),b.g,"solid",shading);
      prism(c,insetP(b.P,.66).map(p=>[p[0]-e1,p[1]-e1]),b.e-e1,b.f,b.g,b.mo,shading)}else prism(c,b.P,b.e,b.f,b.g,b.mo,shading)});
    c.restore();pth(c,Q);c.strokeStyle=INK;c.lineWidth=2;c.stroke()}
  c.restore();
  c.strokeStyle=INK;c.lineWidth=3;c.strokeRect(M,M,W-2*M,H-2*M);c.lineWidth=1;c.strokeRect(.5,.5,W-1,H-1);
  const rows=[["palette",pal.n],["colour scheme",sc[0]],["colour logic",strat],["plates",dens],["spacing",spac],["plate angles",ang],["plate lift",plateMode],["relief",uniform?relief0:"Varied"],["tiling",til],["shapes",[...shapes].sort().join(" \u00b7 ")],["cell splits",[...used].sort().join(" \u00b7 ")],["max depth",(Math.round(maxE/50)*50)+" px"],["stacked",stk?"on":"off"],["light",shading],["inlay",mm]];
  window.$features=Object.fromEntries(rows);
  SVG=c.end();
  return rows}

generate(HASH);
const st=document.createElement("style");
st.textContent="html,body{margin:0;padding:0;width:100%;height:100%;overflow:hidden;background:"+PAGE_BG+"}body{display:flex;align-items:center;justify-content:center}svg{display:block}";
document.head.appendChild(st);
const host=document.createElement("div");host.innerHTML=SVG;
const EL=host.firstChild;(document.body||document.documentElement).appendChild(EL);
document.querySelectorAll("canvas").forEach(k=>k.remove());const fit=()=>{const s=Math.min((innerWidth||OUT_W)/OUT_W,(innerHeight||OUT_H)/OUT_H);EL.style.width=OUT_W*s+"px";EL.style.height=OUT_H*s+"px"};
fit();addEventListener("resize",fit);
window.getSVG=()=>new XMLSerializer().serializeToString(EL);
(function p(n){if(typeof window.$renderPreview==="function")window.$renderPreview();else if(n<100)setTimeout(()=>p(n+1),50)})(0);
