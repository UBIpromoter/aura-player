// ==================== AURA VISUALIZATION ====================
// Organism viz — blob primaries with interiors, membrane bubble, tissue connections
// Extracted from index.html babel block for standalone <script> loading.
(function() {
'use strict';

const AuraVisualization = React.memo(function AuraVisualization({
  onboardingAnswers = {},
  assessCompleted = {},
  entityType = 'human',
  darkMode = true,
  size = 200,
}) {
  const canvasRef = React.useRef(null);
  const animRef = React.useRef(null);
  const propsRef = React.useRef({ onboardingAnswers, assessCompleted, entityType, darkMode, size });
  propsRef.current = { onboardingAnswers, assessCompleted, entityType, darkMode, size };

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // ═══ CONSTANTS ═══
    const PI = Math.PI, TAU = PI * 2;
    const TR = {
      O: { l:'Open',  base:[78,205,196],  acc:[255,154,139] },
      C: { l:'Consc', base:[69,183,209],  acc:[255,183,77] },
      E: { l:'Extra', base:[150,230,161], acc:[230,120,200] },
      A: { l:'Agree', base:[221,160,221], acc:[120,220,180] },
      N: { l:'Neuro', base:[247,220,111], acc:[140,160,240] },
    };
    const TK = Object.keys(TR);
    const SSC = [0.20, 0.45, 0.72, 1.0];
    const GSC = [0.35, 0.55, 0.78, 1.0];

    // Onboarding question → primary mapping (5 questions → 5 traits)
    const NEURON_MAP = [
      { colorQ:'onboard-1', posQ:'onboard-2' },
      { colorQ:'onboard-2', posQ:'onboard-3' },
      { colorQ:'onboard-3', posQ:'onboard-4' },
      { colorQ:'onboard-4', posQ:'onboard-5' },
      { colorQ:'onboard-5', posQ:'onboard-1' },
    ];

    // ═══ HELPERS ═══
    function m32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
    function rga(c,a){return`rgba(${c[0]|0},${c[1]|0},${c[2]|0},${a})`;}
    function ltn(c,n){return[Math.min(255,c[0]+n),Math.min(255,c[1]+n),Math.min(255,c[2]+n)];}
    function drk(c,n){return[Math.max(0,c[0]-n),Math.max(0,c[1]-n),Math.max(0,c[2]-n)];}
    function dst(x1,y1,x2,y2){const a=x1-x2,b=y1-y2;return Math.sqrt(a*a+b*b);}
    function bl(cs,ws){let r=0,g=0,b=0,w=0;for(let i=0;i<cs.length;i++){r+=cs[i][0]*ws[i];g+=cs[i][1]*ws[i];b+=cs[i][2]*ws[i];w+=ws[i];}return w?[r/w|0,g/w|0,b/w|0]:[128,128,128];}
    function lr3(a,b,t){return[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t,a[2]+(b[2]-a[2])*t];}
    function clamp(v,lo,hi){return v<lo?lo:v>hi?hi:v;}

    // ═══ VALUE NOISE ═══
    const PERM=new Uint8Array(512);
    (function(){const r=m32(42);for(let i=0;i<256;i++)PERM[i]=i;
      for(let i=255;i>0;i--){const j=(r()*i)|0;[PERM[i],PERM[j]]=[PERM[j],PERM[i]];}
      for(let i=0;i<256;i++)PERM[i+256]=PERM[i];})();
    function noise2(x,y){
      const xi=Math.floor(x)&255,yi=Math.floor(y)&255,xf=x-Math.floor(x),yf=y-Math.floor(y);
      const u=xf*xf*(3-2*xf),v=yf*yf*(3-2*yf);
      const a=PERM[xi]+yi,b=PERM[xi+1]+yi;
      return((PERM[a]/255*(1-u)+PERM[b]/255*u)*(1-v)+(PERM[a+1]/255*(1-u)+PERM[b+1]/255*u)*v);
    }
    function fbm(x,y,oct){let v=0,a=0.5,f=1;for(let i=0;i<oct;i++){v+=a*noise2(x*f,y*f);a*=0.5;f*=2;}return v;}

    // ═══ CONVEX HULL ═══
    function convexHull(points){
      if(points.length<3)return points.slice();
      const sorted=points.slice().sort((a,b)=>a.x-b.x||a.y-b.y);
      const cross=(O,A,B)=>(A.x-O.x)*(B.y-O.y)-(A.y-O.y)*(B.x-O.x);
      const lower=[];
      for(const p of sorted){while(lower.length>=2&&cross(lower[lower.length-2],lower[lower.length-1],p)<=0)lower.pop();lower.push(p);}
      const upper=[];
      for(let i=sorted.length-1;i>=0;i--){const p=sorted[i];while(upper.length>=2&&cross(upper[upper.length-2],upper[upper.length-1],p)<=0)upper.pop();upper.push(p);}
      return lower.slice(0,-1).concat(upper.slice(0,-1));
    }

    // ═══ CHAIKIN CORNER CUTTING ═══
    function chaikin(pts,iters){
      let cur=pts;
      for(let it=0;it<iters;it++){
        const next=[];
        for(let i=0;i<cur.length;i++){
          const a=cur[i],b=cur[(i+1)%cur.length];
          next.push({x:a.x*0.75+b.x*0.25,y:a.y*0.75+b.y*0.25});
          next.push({x:a.x*0.25+b.x*0.75,y:a.y*0.25+b.y*0.75});
        }
        cur=next;
      }
      return cur;
    }

    // ═══ MAPPING LAYER — synced from playground v2 ═══

    // Extract normalized scores from assessCompleted data
    function extractScores(completed) {
      const c = completed || {};
      const bf = { O:50, C:50, E:50, A:50, N:50 };

      // Big Five: individual tests first, quick-profile fallback
      for (const k of TK) {
        const key = 'bigfive-' + k;
        if (c[key] && c[key].score != null) {
          bf[k] = clamp(c[key].score, 0, 100);
        } else if (c['quick-profile'] && c['quick-profile'].traits && c['quick-profile'].traits[k] != null) {
          bf[k] = clamp(c['quick-profile'].traits[k], 0, 100);
        }
      }

      // Shadow: M/N/P
      const shadow = { M:25, N:20, P:15 };
      for (const s of ['M','N','P']) {
        const key = 'shadow-' + s;
        if (c[key] && c[key].score != null) shadow[s] = clamp(c[key].score, 0, 100);
      }

      // Attachment: anxiety/avoidance as strings → floats (0-5 scale)
      const attachment = { anxiety:1.5, avoidance:1.5 };
      if (c['attachment']) {
        if (c['attachment'].anxiety != null) attachment.anxiety = clamp(parseFloat(c['attachment'].anxiety) || 1.5, 0, 5);
        if (c['attachment'].avoidance != null) attachment.avoidance = clamp(parseFloat(c['attachment'].avoidance) || 1.5, 0, 5);
      }

      // Risk: subcategories (fin/soc/phys/eth, 0-100)
      const risk = { financial:40, social:50, physical:30, ethical:35 };
      if (c['risk'] && c['risk'].subcategories) {
        const sub = c['risk'].subcategories;
        if (sub.fin != null) risk.financial = clamp(sub.fin, 0, 100);
        if (sub.soc != null) risk.social = clamp(sub.soc, 0, 100);
        if (sub.phys != null) risk.physical = clamp(sub.phys, 0, 100);
        if (sub.eth != null) risk.ethical = clamp(sub.eth, 0, 100);
      }

      // Chronotype: 0-100 score
      const chronotype = (c['chronotype'] && c['chronotype'].score != null) ? clamp(c['chronotype'].score, 0, 100) : 55;

      // ADHD: 0-6 indicators
      const adhd = (c['adhd'] && c['adhd'].indicators != null) ? clamp(c['adhd'].indicators, 0, 6) : 1;

      // Depth: how many assessments completed
      const depth = Object.keys(c).length;

      return { bigFive: bf, shadow, attachment, risk, chronotype, adhd, depth };
    }

    // Derive modifier values from scores — controls all visual parameters
    function deriveModifiers(scores) {
      const md = {};
      const bf = scores.bigFive;
      const s = scores;

      // Big Five → motion components
      const oN = bf.O/100, cN = bf.C/100, eN = bf.E/100, aN = bf.A/100, nN = bf.N/100;
      const bfDrift = 0.3 + oN * 0.6;
      const bfSway  = 0.3 + eN * 0.8;
      const bfWiggle = 0.15 + nN * 0.6;
      const bfBreath = 0.4 + (1-cN)*0.5 + aN*0.3;
      const bfSpeed = 0.6 + eN*0.3 - cN*0.15;

      // Shadow — individual effects + motion
      const mNorm = s.shadow.M/100, nNorm = s.shadow.N/100, pNorm = s.shadow.P/100;
      md.machConn    = mNorm;
      md.narcInflate = nNorm;
      md.psychSharp  = pNorm;
      md.psychCool   = pNorm * 0.6;
      const shadowDrift = mNorm * 0.4;
      const shadowSway  = nNorm * 0.3;
      const shadowWiggle = pNorm * 0.5;

      // Attachment
      const anxN = s.attachment.anxiety/5, avdN = s.attachment.avoidance/5;
      md.connDensity  = 0.3 + anxN*1.4 - avdN*1.0;
      md.pulseSpeed   = 0.4 + anxN*1.2 - avdN*0.6;
      md.breathRate   = bfBreath + anxN*0.8 - avdN*0.5;
      md.breathAmp    = 0.3 + anxN*1.4 - avdN*0.8;
      md.connPulseIrr = anxN*0.5 + avdN*0.3;
      md.avoidSpread  = avdN;
      md.avoidDim     = avdN;
      const attachWiggle = anxN * 0.4;
      const attachDrift  = avdN * 0.5;

      // Risk
      const rFin = s.risk.financial/100, rSoc = s.risk.social/100, rPhy = s.risk.physical/100, rEth = s.risk.ethical/100;
      const riskDrift  = rFin*0.8;
      const riskSway   = rSoc*0.7;
      const riskWiggle = rPhy*0.6;
      const riskSpeed  = rEth*0.5;

      // Compose motion
      md.driftAmp   = bfDrift + shadowDrift + attachDrift + riskDrift*0.6;
      md.driftSpeed = bfSpeed + riskSpeed*0.4;
      md.swayAmp    = bfSway + shadowSway + riskSway*0.5;
      md.wiggleAmp  = bfWiggle + shadowWiggle + attachWiggle + riskWiggle*0.5 + (s.adhd/6)*1.5;
      md.wiggleSpeed = 0.5 + riskSpeed*0.3 + (s.adhd/6)*0.8;

      // Chronotype — subtle tempo (±15%)
      const chronoMod = 0.92 + (s.chronotype/100)*0.16;
      md.driftSpeed  *= chronoMod;
      md.wiggleSpeed *= chronoMod;

      // Risk structural
      md.riskGlow       = rFin*0.5;
      md.riskInflate    = rPhy*0.3;
      md.riskConnChaos  = rEth*0.6;
      md.riskMemBreathe = rSoc*0.5;

      // Glow — scale with assessment depth (node count)
      // 0: seed glow (barely visible), 1-2: dim seed, 3-5: moderate, 6+: full
      const d = scores.depth;
      const depthGlow = d === 0 ? 0.08 : d <= 2 ? 0.2 + d * 0.08 : d <= 5 ? 0.45 + (d - 2) * 0.12 : 1.0;
      md.glowRadius    = depthGlow * (1.0 + md.riskGlow*0.8);
      md.glowIntensity = depthGlow * (1.0 + md.riskGlow*0.6 - md.avoidDim*0.4);
      md.memOpacity    = 1.0 - pNorm*0.4 - md.avoidDim*0.2;
      md.memThickness  = 1.0 - pNorm*0.3 + md.riskMemBreathe*0.3;

      return md;
    }

    // Rank-based angular placement — dominant traits claim prominent positions
    function computeTraitAngles(scores, seed) {
      const bf = scores.bigFive;
      const vals = TK.map(k => ({ k, v: bf[k]/100 }));
      const ranked = [...vals].sort((a,b) => b.v - a.v);
      const angles = {};
      const n = ranked.length;
      const totalV = ranked.reduce((s2,r) => s2 + r.v, 0) || 1;
      const avgV = totalV / n;

      for (let i = 0; i < n; i++) {
        const r = ranked[i];
        const baseA = (i/n)*TAU - PI/2;
        const relStrength = (r.v - avgV) / avgV;
        const neighborPull = relStrength * 0.2;
        const seedJitter = Math.sin(seed * 0.1 + i * 2.7) * 0.15;
        angles[r.k] = baseA + neighborPull + seedJitter;
      }
      return angles;
    }

    // ═══ END MAPPING LAYER ═══

    // ═══ GENOME FROM ANSWERS ═══
    function deriveGenome(answers, scores) {
      // Stable seed from answer state
      const keys = Object.keys(answers || {}).sort();
      let seed = 12345;
      for (const k of keys) {
        for (let i = 0; i < k.length; i++) seed = (seed * 31 + k.charCodeAt(i)) | 0;
        const v = answers[k];
        if (v && v.answer !== undefined) {
          seed = (seed * 37 + (v.answer === 'A' ? 1 : v.answer === 'B' ? 2 : 3)) | 0;
        }
      }
      seed = Math.abs(seed) || 42;
      const r = m32(seed);

      const tv = {};
      // If we have actual Big Five scores from assessments, use those
      const hasBF = scores && scores.bigFive && TK.some(k => scores.bigFive[k] !== 50);
      if (hasBF) {
        for (const k of TK) tv[k] = clamp(scores.bigFive[k]/100, 0.02, 1.0);
      } else {
        // Existing onboarding-based derivation
        for (let i = 0; i < 5; i++) {
          const nm = NEURON_MAP[i];
          const hasColor = nm.colorQ in answers;
          const hasPos = nm.posQ in answers;
          const base = r();
          if (hasColor && hasPos) tv[TK[i]] = 0.60 + base * 0.40;
          else if (hasColor || hasPos) tv[TK[i]] = 0.30 + base * 0.30;
          else tv[TK[i]] = 0.03 + base * 0.10;
        }
      }

      const so = [...TK].sort((a, b) => tv[b] - tv[a]);
      const glow = bl([TR[so[0]].base, TR[so[1]].base], [0.65, 0.35]);
      const iord = [0,1,2,3,4,5].sort(() => r() - 0.5);
      const ints = {}; for (let i = 0; i < 5; i++) ints[TK[i]] = iord[i];
      return { tv, s: seed, dom: so[0], glow, glowAcc: TR[so[0]].acc, ints, so };
    }

    // ═══ NODE FACTORY ═══
    function mkNodes(g, oR, traitAngles, mods) {
      const r = m32(g.s + 3333), ns = [];
      const inflate = 1 + (mods ? mods.narcInflate * 0.4 + (mods.riskInflate||0) * 0.3 : 0);
      const spread = 1 + (mods ? (mods.avoidSpread||0) * 0.4 : 0);

      for (let i = 0; i < 5; i++) {
        const k = TK[i], v = g.tv[k];
        const an = traitAngles ? traitAngles[k] : ((i / 5) * TAU - PI / 2 + (v - 0.5) * 0.3);
        const br = oR * (0.28 + 0.22 * v) * spread;
        const rd = oR * (0.06 + v * 0.14) * inflate;
        ns.push({ tp:'p', k, tv:v, rgb:TR[k].base, acc:TR[k].acc, iIdx:g.ints[k],
          bA:an, bR:br, x:0, y:0, dp:0, rd, sd:g.s+i*137.5, bp:i*1.47, stg:0 });
      }
      for (let i = 0; i < 5; i++) { const p = ns[i]; for (let c = 0; c < 5; c++) {
        const o = p.bA + (c-2)*0.3 + (r()-0.5)*0.2, cr = (p.bR + oR*(0.04+r()*0.06)) * spread;
        const v = p.tv * (0.25 + r()*0.35);
        ns.push({ tp:'c', k:p.k, tv:v, rgb:p.rgb, acc:p.acc,
          bA:o, bR:cr, x:0, y:0, dp:0, rd:oR*(0.010+v*0.025)*inflate, sd:g.s+(10+i*5+c)*137.5, bp:(10+i*5+c)*0.9, stg:1 });
      }}
      const AD = [
        {a:['O','C'],n:5},{a:['E','N'],n:5},{a:['O'],n:4},{a:['E','A'],n:5},{a:['C','N'],n:4},
        {a:['O','C','E','A','N'],n:7},{a:['A','E'],n:5},{a:['N','O'],n:5},
        {a:['O','E'],n:4},{a:['C','A'],n:4},{a:['N','E','A'],n:5}
      ];
      let ai = 0;
      for (let a = 0; a < AD.length; a++) { const d = AD[a], sr2 = a < 5 ? 2 : 3;
        for (let n = 0; n < d.n; n++) {
          const ak = d.a[n % d.a.length], ai2 = TK.indexOf(ak), ap = ns[ai2];
          const sc = oR*(0.04+r()*0.10), sa = r()*TAU, v = ap.tv*(0.12+r()*0.22);
          const nb = ns[(ai2+1+Math.floor(r()*3))%5];
          const rgb = lr3(ap.rgb, nb.acc, 0.15+r()*0.2).map(x => clamp(x|0,0,255));
          ns.push({ tp:'a', k:ak, tv:v, rgb, acc:ap.acc,
            bA:ap.bA+(r()-0.5)*0.8, bR:ap.bR+sc*(0.5+r()*0.5), x:0, y:0, dp:0,
            rd:oR*(0.004+v*0.012), sd:g.s+(40+ai)*137.5, bp:(40+ai)*0.7, stg:sr2 }); ai++;
      }}
      for (let h = 0; h < 18; h++) {
        const ha = (h/18)*TAU + (r()-0.5)*0.3;
        const pi = h%5, pp = ns[pi], v = pp.tv*(0.08+r()*0.12);
        const hr = pp.bR + oR*(0.02+r()*0.06);
        const rgb = lr3(pp.rgb, pp.acc, 0.2+r()*0.3).map(x => clamp(x|0,0,255));
        ns.push({ tp:'a', k:TK[pi], tv:v, rgb, acc:pp.acc,
          bA:ha, bR:hr, x:0, y:0, dp:0, rd:oR*(0.003+v*0.006), sd:g.s+(120+h)*137.5, bp:(120+h)*0.5, stg:3 });
      }
      return ns;
    }

    function filt(ns, si, depth) {
      // At depth 1 (QP only), show top 3 dominant traits + 2 children each
      // At depth 2-3, show all 5 traits + normal children
      // At depth 4+, full viz
      if (depth != null && depth <= 1) {
        const prims = ns.filter(n => n.tp === 'p').sort((a, b) => b.tv - a.tv);
        const topKeys = new Set(prims.slice(0, 3).map(n => n.k));
        const childCount = {};
        return ns.filter(n => {
          if (n.tp === 'p') return topKeys.has(n.k);
          if (n.tp === 'c' && si >= 1 && topKeys.has(n.k)) {
            childCount[n.k] = (childCount[n.k] || 0) + 1;
            return childCount[n.k] <= 2;
          }
          return false;
        });
      }
      return ns.filter(n => n.tp==='p' || (n.tp==='c' && si>=1) || (n.tp==='a' && si>=n.stg));
    }

    // ═══ CONTOUR ═══
    function computeHull(ns, oR, stg, CX, CY) {
      const sc = SSC[stg];
      const pts = [];
      for (const n of ns) {
        const r = n.rd * sc;
        const pad = n.tp==='p' ? r*0.5+oR*0.05 : r*0.4+oR*0.03;
        const totalR = r + pad;
        const count = 24;
        for (let i = 0; i < count; i++) {
          const a = (i/count) * TAU;
          pts.push({ x: n.x + Math.cos(a)*totalR, y: n.y + Math.sin(a)*totalR });
        }
      }
      if (pts.length < 3) return [{ x:CX-20,y:CY-20 },{ x:CX+20,y:CY-20 },{ x:CX+20,y:CY+20 },{ x:CX-20,y:CY+20 }];
      let hull = convexHull(pts);

      // Corner smoothing: detect sharp angles and pull toward neighbors
      const smoothed = [];
      const n2 = hull.length;
      for (let i = 0; i < n2; i++) {
        const prev = hull[(i-1+n2)%n2], cur = hull[i], next = hull[(i+1)%n2];
        const ax = prev.x-cur.x, ay = prev.y-cur.y;
        const bx = next.x-cur.x, by = next.y-cur.y;
        const dot = ax*bx+ay*by;
        const la = Math.sqrt(ax*ax+ay*ay)||1, lb = Math.sqrt(bx*bx+by*by)||1;
        const cosA = dot/(la*lb);
        if (cosA > -0.3) {
          const blend = 0.15+0.15*Math.max(0,cosA);
          smoothed.push({
            x: cur.x*(1-blend)+(prev.x+next.x)*0.5*blend,
            y: cur.y*(1-blend)+(prev.y+next.y)*0.5*blend
          });
        } else {
          smoothed.push(cur);
        }
      }

      return chaikin(smoothed, 10);
    }

    function traceSmoothedHull(ctx, hull) {
      if (hull.length < 3) return;
      const n = hull.length;
      const tension = 0.4;
      ctx.beginPath();
      for (let i = 0; i < n; i++) {
        const p0 = hull[(i-1+n)%n], p1 = hull[i], p2 = hull[(i+1)%n], p3 = hull[(i+2)%n];
        const cp1x = p1.x+(p2.x-p0.x)*tension, cp1y = p1.y+(p2.y-p0.y)*tension;
        const cp2x = p2.x-(p3.x-p1.x)*tension, cp2y = p2.y-(p3.y-p1.y)*tension;
        if (i === 0) ctx.moveTo(p1.x, p1.y);
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
      }
      ctx.closePath();
    }

    // ═══ PHYSICS ═══
    function updPhys(ns, t, CX, CY, oR, stg, mods) {
      const md = mods || { breathRate:1, breathAmp:1, driftAmp:1, driftSpeed:1, swayAmp:1, wiggleAmp:1, wiggleSpeed:1 };
      const breath = Math.sin(t * 0.12 * md.breathRate) * 0.012 * (1 + md.breathAmp);
      const sc = SSC[stg];
      const bsc = 1 + breath;
      for (const n of ns) {
        const tOff = n.sd * 0.37;
        const wanderA = n.bA + (fbm(n.sd*0.13, t*0.0105*md.driftSpeed+tOff, 3)-0.5)*TAU*0.525*md.driftAmp;
        const wanderR = n.bR * (0.85 + fbm(n.sd*0.17+100, t*0.012*md.driftSpeed+tOff, 3)*0.45*md.driftAmp);
        const baseX = CX + Math.cos(wanderA)*wanderR*bsc*sc;
        const baseY = CY + Math.sin(wanderA)*wanderR*bsc*sc;
        const swayA = oR*sc*0.21*(0.5+md.swayAmp*0.5);
        const sx = (fbm(n.sd*0.1+t*0.0525+tOff, t*0.042, 2)*2-1)*swayA;
        const sy = (fbm(t*0.045, n.sd*0.1+t*0.057+tOff, 2)*2-1)*swayA;
        const wigA = oR*sc*0.0525*(0.4+md.wiggleAmp*0.6);
        const wx = (fbm(n.sd*0.3+t*0.27*md.wiggleSpeed, t*0.225*md.wiggleSpeed, 1)*2-1)*wigA;
        const wy = (fbm(t*0.24*md.wiggleSpeed, n.sd*0.3+t*0.285*md.wiggleSpeed, 1)*2-1)*wigA;
        n.x = baseX+sx+wx;
        n.y = baseY+sy+wy;
      }
      let cx=0, cy=0;
      for (const n of ns) { cx+=n.x; cy+=n.y; }
      cx /= ns.length; cy /= ns.length;
      const ox = CX-cx, oy = CY-cy;
      for (const n of ns) { n.x+=ox; n.y+=oy; }
      return breath;
    }

    // ═══ CONNECTIONS ═══
    function mkCon(ns, mods) {
      const cn=[], seen=new Set();
      const K = Math.max(3, Math.round(7 * (mods ? mods.connDensity : 1)));
      for (let i=0;i<ns.length;i++){const dd=[];
        for(let j=0;j<ns.length;j++){if(i===j)continue;
          const xi=Math.cos(ns[i].bA)*ns[i].bR, yi=Math.sin(ns[i].bA)*ns[i].bR;
          const xj=Math.cos(ns[j].bA)*ns[j].bR, yj=Math.sin(ns[j].bA)*ns[j].bR;
          dd.push({j,d:dst(xi,yi,xj,yj)});}
        dd.sort((a,b)=>a.d-b.d);
        for(let k=0;k<Math.min(K,dd.length);k++){const j=dd[k].j,ky=Math.min(i,j)+'-'+Math.max(i,j);
          if(seen.has(ky))continue;seen.add(ky);
          cn.push({a:i,b:j,col:bl([ns[i].rgb,ns[j].rgb],[0.5,0.5]),
            str:(ns[i].tv+ns[j].tv)/2,cs:i*31+j*17,
            isPP:ns[i].tp==='p'&&ns[j].tp==='p'});}}
      const pI=[];ns.forEach((n,i)=>{if(n.tp==='p')pI.push(i);});
      for(let i=0;i<pI.length;i++)for(let j=i+1;j<pI.length;j++){
        const ky=pI[i]+'-'+pI[j];
        if(!seen.has(ky)){seen.add(ky);const a=ns[pI[i]],b=ns[pI[j]];
          cn.push({a:pI[i],b:pI[j],col:bl([a.rgb,b.rgb],[0.5,0.5]),
            str:(a.tv+b.tv)/2,cs:pI[i]*31+pI[j]*17,isPP:true});}}
      return cn;
    }

    function mkPul(cn, sd, mods) {
      const r=m32(sd+5555), ps=[];
      const irrMod = mods ? (mods.connPulseIrr||0) + (mods.riskConnChaos||0) : 0;
      const spdMod = mods ? (mods.pulseSpeed||1) : 1;
      for(const c of cn){const ct=1+Math.floor(c.str*1.5);
        for(let i=0;i<ct;i++){
          const baseSpeed = 0.03+r()*0.05;
          const irrF = 1+(r()-0.5)*irrMod*2;
          ps.push({a:c.a,b:c.b,cs:c.cs,p:r(),sp:baseSpeed*irrF*spdMod,
            dr:r()>0.5?1:-1,col:ltn(c.col,55),sz:0.8+c.str*1.5+(c.isPP?1:0)});}}
      return ps;
    }
    function updPul(ps,dt){for(const q of ps){q.p+=q.sp*q.dr*dt;if(q.p>1)q.p-=1;if(q.p<0)q.p+=1;}}
    function cMid(a,b){return{x:(a.x+b.x)/2,y:(a.y+b.y)/2};}

    // ═══ BLOB PATH ═══
    function blobP(ctx,cx,cy,r,sd,t){
      ctx.beginPath();for(let i=0;i<=48;i++){const a=(i/48)*TAU;
        const br=r+Math.sin(a*3+t*0.12+sd)*r*0.08+Math.sin(a*5+t*0.07+sd*1.3)*r*0.04
          +Math.sin(a*2+t*0.15+sd*0.7)*r*0.05;
        ctx.lineTo(cx+Math.cos(a)*br,cy+Math.sin(a)*br);}
      ctx.closePath();
    }

    // ═══ INTERIORS — only rendered at size >= 150 ═══
    const INT=[
    {name:'Chromatin',fn(cx,n,r,col,d,t){
      const sr=m32(n.sd*8901|0),b=ltn(col,85),h=ltn(col,140);
      for(let s=0;s<9;s++){const sa=sr()*TAU,sR=sr()*r*0.35;
        let px=n.x+Math.cos(sa)*sR,py=n.y+Math.sin(sa)*sR;
        cx.beginPath();cx.moveTo(px,py);
        for(let p=0;p<30;p++){const da=sr()*1.0-0.5+Math.sin(t*0.03+s+p*0.3)*0.15,step=r*0.04+sr()*r*0.025;
          px+=Math.cos(da+p*0.5+s)*step;py+=Math.sin(da+p*0.7+s)*step;cx.lineTo(px,py);}
        cx.strokeStyle=rga(b,0.5);cx.lineWidth=0.7+sr()*0.5;cx.lineCap='round';cx.stroke();}
      for(let i=0;i<8;i++){const a=sr()*TAU,dd=sr()*r*0.6;
        const jx=n.x+Math.cos(a)*dd,jy=n.y+Math.sin(a)*dd,sz=1+sr()*2;
        const jg=cx.createRadialGradient(jx,jy,0,jx,jy,sz*3);
        jg.addColorStop(0,rga(h,0.7));jg.addColorStop(0.4,rga(b,0.2));jg.addColorStop(1,rga(b,0));
        cx.fillStyle=jg;cx.beginPath();cx.arc(jx,jy,sz*3,0,TAU);cx.fill();}}},
    {name:'Constellation',fn(cx,n,r,col,d,t){
      const sr=m32(n.sd*7913|0),b=ltn(col,90),h=ltn(col,140);
      const stars=14+Math.floor(sr()*8),pts=[];
      for(let i=0;i<stars;i++){const a=sr()*TAU,dd=r*0.08+sr()*r*0.7;
        pts.push({x:n.x+Math.cos(a)*dd,y:n.y+Math.sin(a)*dd});}
      for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){
        const dd=dst(pts[i].x,pts[i].y,pts[j].x,pts[j].y);
        if(dd<r*0.8&&sr()>0.2){cx.beginPath();cx.moveTo(pts[i].x,pts[i].y);cx.lineTo(pts[j].x,pts[j].y);
          cx.strokeStyle=rga(b,0.2*(1-dd/(r*0.8)));cx.lineWidth=0.3;cx.stroke();}}
      for(const p of pts){const sz=2+sr()*3;
        const sg=cx.createRadialGradient(p.x,p.y,0,p.x,p.y,sz*2);
        sg.addColorStop(0,rga(h,0.85));sg.addColorStop(0.4,rga(b,0.2));sg.addColorStop(1,rga(b,0));
        cx.fillStyle=sg;cx.beginPath();cx.arc(p.x,p.y,sz*2,0,TAU);cx.fill();}}},
    {name:'Vesicles',fn(cx,n,r,col,d,t){
      const sr=m32(n.sd*4567|0),b=ltn(col,70),h=ltn(col,120);
      const ct=8+Math.floor(sr()*7+n.tv*5),vpts=[];
      for(let i=0;i<ct;i++){const a=sr()*TAU,dd=r*0.12+sr()*r*0.55,sz=r*0.06+sr()*r*0.12;
        const vx=n.x+Math.cos(a)*dd,vy=n.y+Math.sin(a)*dd;vpts.push({x:vx,y:vy,sz});
        blobP(cx,vx,vy,sz,n.sd+i*71,t);cx.fillStyle=rga(drk(b,20),0.45);cx.fill();
        blobP(cx,vx,vy,sz,n.sd+i*71,t);cx.strokeStyle=rga(b,0.25);cx.lineWidth=0.5;cx.stroke();
        const vg=cx.createRadialGradient(vx,vy,0,vx,vy,sz*0.6);
        vg.addColorStop(0,rga(h,0.4));vg.addColorStop(1,rga(h,0));
        cx.fillStyle=vg;cx.beginPath();cx.arc(vx,vy,sz*0.6,0,TAU);cx.fill();}
      for(let i=0;i<vpts.length;i++)for(let j=i+1;j<vpts.length;j++){
        if(dst(vpts[i].x,vpts[i].y,vpts[j].x,vpts[j].y)<r*0.5){
          cx.beginPath();cx.moveTo(vpts[i].x,vpts[i].y);cx.lineTo(vpts[j].x,vpts[j].y);
          cx.strokeStyle=rga(b,0.15);cx.lineWidth=0.3;cx.stroke();}}}},
    {name:'Axon Tree',fn(cx,n,r,col,d,t){
      const sr=m32(n.sd*1234|0),b=ltn(col,100),h=ltn(col,150);
      const arms=4+Math.floor(sr()*2);
      for(let a=0;a<arms;a++){const bA=(a/arms)*TAU+sr()*0.5;
        let px=n.x,py=n.y,ca=bA,lw=2.5+sr()*1.5;
        for(let seg=0;seg<12;seg++){const len=(r*0.1)*(1-seg*0.035)+sr()*r*0.025;
          const nx=px+Math.cos(ca)*len,ny=py+Math.sin(ca)*len;
          cx.beginPath();cx.moveTo(px,py);cx.lineTo(nx,ny);
          cx.strokeStyle=rga(b,0.55*(1-seg*0.06));cx.lineWidth=lw;cx.lineCap='round';cx.stroke();
          px=nx;py=ny;ca+=sr()*0.7-0.35;lw*=0.82;
          if(seg>2&&sr()>0.35){const ba=ca+(sr()>0.5?0.5:-0.5);let bx=px,by=py,bw=lw*0.7;
            for(let bb=0;bb<5;bb++){const bx2=bx+Math.cos(ba+sr()*0.3)*r*0.05,by2=by+Math.sin(ba+sr()*0.3)*r*0.05;
              cx.beginPath();cx.moveTo(bx,by);cx.lineTo(bx2,by2);
              cx.strokeStyle=rga(b,0.35*(1-bb*0.12));cx.lineWidth=bw;cx.lineCap='round';cx.stroke();
              bx=bx2;by=by2;bw*=0.7;}}}}
      const sg=cx.createRadialGradient(n.x,n.y,0,n.x,n.y,r*0.22);
      sg.addColorStop(0,rga(h,0.85));sg.addColorStop(0.4,rga(b,0.35));sg.addColorStop(1,rga(b,0));
      cx.fillStyle=sg;cx.beginPath();cx.arc(n.x,n.y,r*0.22,0,TAU);cx.fill();}},
    {name:'Membrane Folds',fn(cx,n,r,col,d,t){
      const sr=m32(n.sd*6802|0),b=ltn(col,80),h=ltn(col,130);
      for(let L=0;L<7;L++){const lr=r*(0.1+L*0.12),wa=lr*0.15+sr()*lr*0.1;
        cx.beginPath();for(let s=0;s<=48;s++){const a=(s/48)*TAU;
          const w=Math.sin(a*3+t*0.05+L*2+sr()*5)*wa+Math.sin(a*5+t*0.03+L)*wa*0.4;
          cx.lineTo(n.x+Math.cos(a)*(lr+w),n.y+Math.sin(a)*(lr+w));}
        cx.closePath();cx.strokeStyle=rga(b,0.42*(1-L*0.06));cx.lineWidth=0.7+sr()*0.4;cx.stroke();}
      for(let i=0;i<10;i++){const a=sr()*TAU;
        cx.beginPath();cx.moveTo(n.x+Math.cos(a)*r*0.1,n.y+Math.sin(a)*r*0.1);
        cx.lineTo(n.x+Math.cos(a+sr()*0.2)*r*0.75,n.y+Math.sin(a+sr()*0.2)*r*0.75);
        cx.strokeStyle=rga(h,0.15);cx.lineWidth=0.3;cx.stroke();}}},
    {name:'Synaptic',fn(cx,n,r,col,d,t){
      const sr=m32(n.sd*3456|0),b=ltn(col,80),h=ltn(col,130);
      const arms=6+Math.floor(sr()*3),jns=[];
      for(let a=0;a<arms;a++){const ba=(a/arms)*TAU+sr()*0.4;
        let px=n.x,py=n.y,ca=ba;
        for(let s=0;s<8;s++){const len=r*0.09+sr()*r*0.05,nx=px+Math.cos(ca)*len,ny=py+Math.sin(ca)*len;
          cx.beginPath();cx.moveTo(px,py);cx.lineTo(nx,ny);
          cx.strokeStyle=rga(b,0.45*(1-s*0.08));cx.lineWidth=1.3-s*0.1;cx.lineCap='round';cx.stroke();
          if(s>0&&sr()>0.25)jns.push({x:nx,y:ny,sz:1.2+sr()*2.5});
          px=nx;py=ny;ca+=sr()*0.6-0.3;}}
      for(const j of jns){const jg=cx.createRadialGradient(j.x,j.y,0,j.x,j.y,j.sz*3);
        jg.addColorStop(0,rga(h,0.8));jg.addColorStop(0.3,rga(b,0.25));jg.addColorStop(1,rga(b,0));
        cx.fillStyle=jg;cx.beginPath();cx.arc(j.x,j.y,j.sz*3,0,TAU);cx.fill();}
      for(let i=0;i<jns.length;i++)for(let j=i+1;j<jns.length;j++){
        if(dst(jns[i].x,jns[i].y,jns[j].x,jns[j].y)<r*0.5&&sr()>0.4){
          cx.beginPath();cx.moveTo(jns[i].x,jns[i].y);cx.lineTo(jns[j].x,jns[j].y);
          cx.strokeStyle=rga(b,0.12);cx.lineWidth=0.25;cx.stroke();}}}}
    ];

    // ═══ MEMBRANE ═══
    function drawMem(ctx, gen, hull, mods) {
      if (hull.length < 3) return;
      const md = mods || { memThickness:1, memOpacity:1, riskMemBreathe:0 };
      const memBreathe = 1 + (md.riskMemBreathe||0) * Math.sin(performance.now()*0.002) * 0.3;
      const widths=[18,8,3.5,1.0].map(w => w * md.memThickness * memBreathe);
      const alphas=[0.035,0.065,0.11,0.32].map(a => a * md.memOpacity);
      const mc = ltn(gen.glow, 30);
      for (let pass=0; pass<4; pass++) {
        traceSmoothedHull(ctx, hull);
        ctx.strokeStyle = rga(mc, alphas[pass]);
        ctx.lineWidth = widths[pass];
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.stroke();
      }
    }

    // ═══ GLOW ═══
    function drawGlow(ctx, prims, oR, stg, CW, CH, mods) {
      const md = mods || { glowRadius:1, glowIntensity:1 };
      for (const p of prims) {
        const pc = p.rgb;
        const str = p.tv * GSC[stg] * md.glowIntensity;
        if (str < 0.03) continue;
        const sc = SSC[stg];
        const nodeR = p.rd * sc;
        const glowR = (oR*2.5 + p.tv*oR*2.0) * md.glowRadius;
        const g = ctx.createRadialGradient(p.x,p.y,nodeR*0.3,p.x,p.y,glowR);
        g.addColorStop(0,rga(pc,0.40*str));
        g.addColorStop(0.05,rga(pc,0.32*str));
        g.addColorStop(0.12,rga(pc,0.22*str));
        g.addColorStop(0.25,rga(pc,0.13*str));
        g.addColorStop(0.45,rga(pc,0.06*str));
        g.addColorStop(0.7,rga(pc,0.025*str));
        g.addColorStop(1,rga(pc,0));
        ctx.fillStyle = g;
        ctx.fillRect(0,0,CW,CH);
      }
    }

    // ═══ AI FADE ═══
    function drawAIFade(ctx, d, CX, CY, CW, CH) {
      const bg = d ? '5,10,24' : '240,242,245';
      const vR = Math.max(CW,CH)*0.8;
      const g = ctx.createRadialGradient(CX,CY,vR*0.5,CX,CY,vR);
      g.addColorStop(0,`rgba(${bg},0)`);
      g.addColorStop(0.7,`rgba(${bg},0)`);
      g.addColorStop(1,`rgba(${bg},0.3)`);
      ctx.fillStyle=g; ctx.fillRect(0,0,CW,CH);
    }

    // ═══ BODY FILL ═══
    function drawBody(ctx, prims, gen, hull, CX, CY, CW, CH) {
      if (hull.length < 3) return;
      let maxR = 0;
      for (const h of hull) { const d2 = dst(h.x,h.y,CX,CY); if (d2>maxR) maxR=d2; }
      maxR = Math.max(maxR, 50);
      const baseCol = ltn(gen.glow, 15);
      const bg = ctx.createRadialGradient(CX,CY,0,CX,CY,maxR);
      bg.addColorStop(0,rga(baseCol,0.12));
      bg.addColorStop(0.6,rga(baseCol,0.08));
      bg.addColorStop(1,rga(baseCol,0.04));
      ctx.fillStyle=bg; ctx.fillRect(0,0,CW,CH);
      for (const p of prims) {
        const pc=p.rgb, strength=p.tv*0.14, r=maxR*0.65;
        const g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,r);
        g.addColorStop(0,rga(pc,strength));
        g.addColorStop(0.4,rga(pc,strength*0.4));
        g.addColorStop(1,rga(pc,0));
        ctx.fillStyle=g; ctx.fillRect(0,0,CW,CH);
      }
    }

    // ═══ NEURAL NETWORK — only at larger sizes ═══
    function drawNeural(ctx, prims, gen, hullPts, oR, CX, CY, mods) {
      const sr = m32(gen.s+9999);
      const md = mods || { machConn:0, avoidDim:0 };
      const connAlpha = Math.max(0.02, (0.08 + md.machConn * 0.15) * (1 - (md.avoidDim||0)*0.7));
      for(let i=0;i<prims.length;i++){
        for(let j=i+1;j<prims.length;j++){
          const a=prims[i],b=prims[j];
          const col=bl([a.rgb,b.rgb],[0.5,0.5]);
          const bc=ltn(col,60);
          const count=3+Math.floor((a.tv+b.tv)*2);
          for(let f=0;f<count;f++){
            const spread=(f/(count-1||1)-0.5)*0.6;
            const dx=b.x-a.x,dy=b.y-a.y,len=Math.sqrt(dx*dx+dy*dy)||1;
            const nx=-dy/len,ny=dx/len;
            const off=spread*oR*0.08;
            const mx=(a.x+b.x)/2+nx*off,my=(a.y+b.y)/2+ny*off;
            ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.quadraticCurveTo(mx,my,b.x,b.y);
            ctx.strokeStyle=rga(bc,connAlpha);ctx.lineWidth=0.4+sr()*0.5;ctx.stroke();
          }
        }
      }
      const r2=m32(gen.s+1111);
      const dotCount=20+stg*12;
      let maxR=0;
      for(const h of hullPts){const d2=dst(h.x,h.y,CX,CY);if(d2>maxR)maxR=d2;}
      maxR=Math.max(maxR,50);
      for(let i=0;i<dotCount;i++){
        const a=r2()*TAU,dd=maxR*(0.1+r2()*0.35);
        const px=CX+Math.cos(a)*dd,py=CY+Math.sin(a)*dd;
        const dists=prims.map(p=>({p,d:dst(px,py,p.x,p.y)})).sort((a,b)=>a.d-b.d);
        if(dists.length<2)continue;
        const c=bl([dists[0].p.rgb,dists[1].p.rgb],[0.6,0.4]);
        const bc=ltn(c,70);
        const sz=0.8+r2()*1.5;
        const g=ctx.createRadialGradient(px,py,0,px,py,sz*2.5);
        g.addColorStop(0,rga(bc,0.4));g.addColorStop(0.4,rga(bc,0.1));g.addColorStop(1,rga(bc,0));
        ctx.fillStyle=g;ctx.beginPath();ctx.arc(px,py,sz*2.5,0,TAU);ctx.fill();
      }
    }

    // ═══ STATE ═══
    let CW, CH, CX, CY, oR;
    let gen, allN, actN, cons, puls;
    let hullPts = [];
    let stg, ent;
    let curScores, curMods, curTraitAngles;
    let t0 = performance.now(), tL = 0;
    const LOD_FULL = 0; // always render full detail — internals + neural on all sizes

    function init() {
      const p = propsRef.current;
      CW = CH = p.size;
      CX = CW / 2; CY = CH / 2;
      oR = Math.min(CW, CH) * 0.40;

      // Mapping layer: extract scores → derive mods → compute angles
      curScores = extractScores(p.assessCompleted);
      curMods = deriveModifiers(curScores);
      ent = p.entityType;

      // Stage from scores.depth
      stg = curScores.depth >= 4 ? 3 : curScores.depth >= 2 ? 2 : curScores.depth >= 1 ? 1 : 0;

      gen = deriveGenome(p.onboardingAnswers, curScores);
      curTraitAngles = computeTraitAngles(curScores, gen.s);
      allN = mkNodes(gen, oR, curTraitAngles, curMods);
      actN = filt(allN, stg, curScores.depth);
      cons = mkCon(actN, curMods);
      puls = mkPul(cons, gen.s, curMods);
    }

    init();
    let prevSize = CW, prevStg = stg, prevAnswerCount = Object.keys(propsRef.current.onboardingAnswers || {}).length;
    let prevAssessKeys = Object.keys(propsRef.current.assessCompleted || {}).sort().join(',');

    function frame(ts) {
      const p = propsRef.current;
      const t = (ts - t0) / 1000;
      const dt = tL ? Math.min((ts - tL) / 1000, 0.05) : 0.016;
      tL = ts;

      // Reinit on significant changes
      const newAssessKeys = Object.keys(p.assessCompleted || {}).sort().join(',');
      const newScores = extractScores(p.assessCompleted);
      const newStg = newScores.depth >= 4 ? 3 : newScores.depth >= 2 ? 2 : newScores.depth >= 1 ? 1 : 0;
      const newAnswerCount = Object.keys(p.onboardingAnswers || {}).length;
      if (p.size !== prevSize || newStg !== prevStg || newAnswerCount !== prevAnswerCount || newAssessKeys !== prevAssessKeys) {
        prevSize = p.size; prevStg = newStg; prevAnswerCount = newAnswerCount; prevAssessKeys = newAssessKeys;
        init();
      }

      ent = p.entityType;
      const d = p.darkMode;
      const sc = SSC[stg];
      const full = CW >= LOD_FULL;

      // Canvas reset per frame
      canvas.width = CW;
      canvas.height = CH;
      canvas.style.width = CW + 'px';
      canvas.style.height = CH + 'px';

      // Transparent background — organism floats in the page
      ctx.clearRect(0, 0, CW, CH);

      const breath = updPhys(actN, t, CX, CY, oR, stg, curMods);
      updPul(puls, dt);
      hullPts = computeHull(actN, oR, stg, CX, CY);

      const prims = actN.filter(n => n.tp === 'p');

      // Layer 1: Glow
      drawGlow(ctx, prims, oR, stg, CW, CH, curMods);

      // Layer 2: Membrane or AI fade
      if (ent === 'human') {
        drawMem(ctx, gen, hullPts, curMods);
      } else {
        drawAIFade(ctx, d, CX, CY, CW, CH);
      }

      // Clip ALL organism content to membrane
      ctx.save();
      if (ent === 'human' && hullPts.length >= 3) {
        traceSmoothedHull(ctx, hullPts);
        ctx.clip();
      }

      // Layer 3: Body fill
      if (ent === 'human') drawBody(ctx, prims, gen, hullPts, CX, CY, CW, CH);

      // Neural network (skip at small sizes)
      if (full) drawNeural(ctx, prims, gen, hullPts, oR, CX, CY, curMods);

      // Tissue connections — machConn boosts, avoidDim dampens
      const cAlphaScale = curMods ? (1 + curMods.machConn * 0.5) * (1 - (curMods.avoidDim||0)*0.5) : 1;
      for (const c of cons) {
        const a = actN[c.a], b = actN[c.b]; if (!a || !b) continue;
        const mid = cMid(a, b), col = c.col;
        if (c.isPP) {
          ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.quadraticCurveTo(mid.x,mid.y,b.x,b.y);
          ctx.strokeStyle=rga(col,(0.04+c.str*0.02)*cAlphaScale); ctx.lineWidth=22+c.str*12; ctx.lineCap='round'; ctx.stroke();
        }
        ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.quadraticCurveTo(mid.x,mid.y,b.x,b.y);
        ctx.strokeStyle=rga(col,(0.05+c.str*0.025)*cAlphaScale); ctx.lineWidth=6+c.str*4; ctx.lineCap='round'; ctx.stroke();
        ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.quadraticCurveTo(mid.x,mid.y,b.x,b.y);
        ctx.strokeStyle=rga(ltn(col,25),(0.35+c.str*0.12)*cAlphaScale); ctx.lineWidth=0.5+c.str*0.7; ctx.stroke();
      }

      // Energy pulses
      for (const p of puls) {
        const a = actN[p.a], b = actN[p.b]; if (!a || !b) continue;
        const mid = cMid(a, b), pr = p.p, mt = 1 - pr;
        const px = mt*mt*a.x + 2*mt*pr*mid.x + pr*pr*b.x;
        const py = mt*mt*a.y + 2*mt*pr*mid.y + pr*pr*b.y;
        const gr = ctx.createRadialGradient(px,py,0,px,py,p.sz*3);
        gr.addColorStop(0,rga(p.col,0.6));
        gr.addColorStop(0.3,rga(p.col,0.18));
        gr.addColorStop(1,rga(p.col,0));
        ctx.fillStyle=gr; ctx.beginPath(); ctx.arc(px,py,p.sz*3,0,TAU); ctx.fill();
      }

      // Nodes
      const sorted = [...actN].sort((a,b) => a.dp - b.dp);
      for (const n of sorted) {
        const r = n.rd * sc * (1 + 0.02*Math.sin(n.bp + t*0.3) + breath);
        const col = n.rgb;
        if (n.tp === 'p') {
          const hr = ctx.createRadialGradient(n.x,n.y,r*0.6,n.x,n.y,r*2.5);
          hr.addColorStop(0,rga(col,0.2)); hr.addColorStop(0.4,rga(col,0.08)); hr.addColorStop(1,rga(col,0));
          ctx.fillStyle=hr; ctx.beginPath(); ctx.arc(n.x,n.y,r*2.5,0,TAU); ctx.fill();
          blobP(ctx,n.x,n.y,r,n.sd,t); ctx.fillStyle=rga(drk(col,55),0.88); ctx.fill();
          // Interiors only at larger sizes
          if (full) {
            ctx.save(); blobP(ctx,n.x,n.y,r,n.sd,t); ctx.clip(); INT[n.iIdx].fn(ctx,n,r,col,d,t); ctx.restore();
          }
          blobP(ctx,n.x,n.y,r,n.sd,t); ctx.strokeStyle=rga(col,0.12); ctx.lineWidth=5; ctx.stroke();
          blobP(ctx,n.x,n.y,r,n.sd,t); ctx.strokeStyle=rga(col,0.28); ctx.lineWidth=2; ctx.stroke();
          blobP(ctx,n.x,n.y,r,n.sd,t); ctx.strokeStyle=rga(ltn(col,40),0.65); ctx.lineWidth=0.7; ctx.stroke();
        } else if (n.tp === 'c') {
          const g2 = ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,r*4);
          g2.addColorStop(0,rga(col,0.28)); g2.addColorStop(0.3,rga(col,0.1)); g2.addColorStop(1,rga(col,0));
          ctx.fillStyle=g2; ctx.beginPath(); ctx.arc(n.x,n.y,r*4,0,TAU); ctx.fill();
          ctx.fillStyle=rga(drk(col,25),0.82); ctx.beginPath(); ctx.arc(n.x,n.y,r,0,TAU); ctx.fill();
          ctx.fillStyle=rga(ltn(col,80),0.85); ctx.beginPath(); ctx.arc(n.x,n.y,r*0.35,0,TAU); ctx.fill();
          ctx.strokeStyle=rga(col,0.5); ctx.lineWidth=0.4; ctx.beginPath(); ctx.arc(n.x,n.y,r,0,TAU); ctx.stroke();
        } else {
          const g3 = ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,r*3);
          g3.addColorStop(0,rga(col,0.28)); g3.addColorStop(0.3,rga(col,0.08)); g3.addColorStop(1,rga(col,0));
          ctx.fillStyle=g3; ctx.beginPath(); ctx.arc(n.x,n.y,r*3,0,TAU); ctx.fill();
          ctx.fillStyle=rga(col,0.7); ctx.beginPath(); ctx.arc(n.x,n.y,r,0,TAU); ctx.fill();
        }
      }

      ctx.restore();

      // Edge vignette — fade to transparent so organism floats in app background
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      const vR = Math.max(CW, CH) * 0.5;
      const vig = ctx.createRadialGradient(CX, CY, vR * 0.55, CX, CY, vR);
      vig.addColorStop(0, 'rgba(0,0,0,0)');
      vig.addColorStop(0.7, 'rgba(0,0,0,0)');
      vig.addColorStop(0.88, 'rgba(0,0,0,0.4)');
      vig.addColorStop(1, 'rgba(0,0,0,1)');
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, CW, CH);
      ctx.restore();

      animRef.current = requestAnimationFrame(frame);
    }

    animRef.current = requestAnimationFrame(frame);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, []);

  // Responsive: canvas draws at full size, CSS scales down on small screens
  return React.createElement('div', {
    style: { display: 'flex', justifyContent: 'center', maxWidth: '100%' },
  }, React.createElement('canvas', {
    ref: canvasRef,
    style: {
      display: 'block',
      width: size + 'px',
      maxWidth: '100%',
      aspectRatio: '1 / 1',
      background: 'transparent',
    },
  }));
});

window.AuraVisualization = AuraVisualization;
})();
