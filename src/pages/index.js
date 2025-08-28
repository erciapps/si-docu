import React, {useEffect} from 'react';
import Layout from '@theme/Layout';

export default function Home() {
  useEffect(() => {
  const cards = document.querySelectorAll('.lift-card');
  const MAX_TILT = 10, MAX_MOVE = 10, HOVER_LIFT = 24, SCALE = 1.03;

  const resetCard = (card) => {
    card.style.setProperty('--rx','0deg');
    card.style.setProperty('--ry','0deg');
    card.style.setProperty('--tx','0px');
    card.style.setProperty('--ty','0px');
    card.style.setProperty('--lift','0px');
    card.style.setProperty('--scale', 1);
    const glow = card.querySelector('.glow');
    if (glow) {
      glow.style.opacity = 0;
      glow.style.background =
        'radial-gradient(220px 140px at 50% 50%, rgba(255,255,255,.20), rgba(255,255,255,0) 65%)';
    }
  };

  const resetAll = () => cards.forEach(resetCard);

  // tu lógica de onMove/onEnter/onLeave...
  cards.forEach((card) => {
    const glow = card.querySelector('.glow');

    const onMove = (e) => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const cx = r.width / 2, cy = r.height / 2;
      const dx = x - cx, dy = y - cy;

      const rx = (-dy / cy) * MAX_TILT;
      const ry = (dx / cx) * MAX_TILT;
      const tx = (dx / cx) * MAX_MOVE;
      const ty = (dy / cy) * MAX_MOVE;

      card.style.setProperty('--rx', rx.toFixed(2) + 'deg');
      card.style.setProperty('--ry', ry.toFixed(2) + 'deg');
      card.style.setProperty('--tx', tx.toFixed(2) + 'px');
      card.style.setProperty('--ty', ty.toFixed(2) + 'px');
      card.style.setProperty('--lift', HOVER_LIFT + 'px');
      card.style.setProperty('--scale', SCALE);

      if (glow) {
        glow.style.opacity = 0.65;
        glow.style.background =
          `radial-gradient(220px 140px at ${x}px ${y}px, rgba(255,255,255,.20), rgba(255,255,255,0) 65%)`;
      }
    };

    const onEnter = () => {
      card.style.setProperty('--lift', HOVER_LIFT + 'px');
      card.style.setProperty('--scale', SCALE);
    };

    const onLeave = () => resetCard(card);

    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseenter', onEnter);
    card.addEventListener('mouseleave', onLeave);

    // estado inicial limpio
    resetCard(card);
  });

  // 🔁 Reset al volver de atrás / recuperar desde bfcache / recuperar foco
  const onPageShow = () => resetAll();
  const onPopState = () => resetAll();
  const onFocus = () => resetAll();

  window.addEventListener('pageshow', onPageShow); // incluye e.persisted=true (bfcache)
  window.addEventListener('popstate', onPopState);
  window.addEventListener('focus', onFocus);

  return () => {
    window.removeEventListener('pageshow', onPageShow);
    window.removeEventListener('popstate', onPopState);
    window.removeEventListener('focus', onFocus);
    // Limpia listeners de cada card
    cards.forEach((card) => {
      card.replaceWith(card.cloneNode(true)); // truco rápido para soltar handlers
    });
  };
}, []);


  return (
    <Layout
      title="Sistemas Informáticos"
      description="Portal principal del recurso de Sistemas Informáticos">
      <div style={{
        minHeight:'100vh',
        color:'#e2e8f0',
        background: `
          radial-gradient(1200px 800px at 15% -10%, #7a3e22 0%, rgba(122,62,34,0) 60%),
          linear-gradient(180deg, #1a0e0a, #2c140a 60%, #1a0e0a 100%)
        `
      }}>
        {/* HERO */}
        <header style={{
          maxWidth:1100, margin:'48px auto 8px', padding:'0 16px'
        }}>
          <h1 style={{margin:'0 0 6px', fontSize:'clamp(28px,3vw,40px)', letterSpacing:'.3px'}}>
            🖥️ Sistemas Informáticos
          </h1>
          <p style={{margin:0, color:'#fdba74'}}>
            Documentación, guías y prácticas del módulo.
          </p>

          <div style={{display:'flex', gap:12, flexWrap:'wrap', marginTop:16}}>
            <a href="/docs/intro" style={btnPrimary}>Entrar al temario →</a>
            <a href="/blog" style={btnGhost}>Novedades del módulo</a>
          </div>
        </header>

        {/* GRID DE TARJETAS */}
        <section style={{
          maxWidth:1100, margin:'28px auto 64px', padding:'0 16px',
          display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap:20,
          perspective:'1000px'
        }}>
          {/* Guía rápida */}
          <article className="lift-card" style={cardStyle('#4a2500','#e65100','#fb8c00')}>
            <div className="glow" style={glowStyle}></div>
            <span style={pill('#fdba74')}>Inicio</span>
            <h3 style={title}>Guía rápida</h3>
            <p style={desc}>
              Requisitos, instalación de entornos y cómo empezar en el módulo.
            </p>
            <a href="/docs/intro" style={btn('#fb8c00')}>Ver guía <span style={arrow}>→</span></a>
          </article>

          {/* Temario */}
          <article className="lift-card" style={cardStyle('#4a2500','#e65100','#fb8c00')}>
            <div className="glow" style={glowStyle}></div>
            <span style={pill('#fed7aa')}>Docs</span>
            <h3 style={title}>Temario</h3>
            <p style={desc}>
              Unidades: hardware, sistemas operativos, virtualización y redes.
            </p>
            <a href="/docs/temario" style={btn('#fb8c00')}>Abrir temario <span style={arrow}>→</span></a>
          </article>

          {/* Prácticas */}
          <article className="lift-card" style={cardStyle('#4a2500','#e65100','#fb8c00')}>
            <div className="glow" style={glowStyle}></div>
            <span style={pill('#fed7aa')}>Trabajo</span>
            <h3 style={title}>Prácticas</h3>
            <p style={desc}>
              Ejercicios de instalación, configuración y administración.
            </p>
            <a href="/docs/practicas/overview" style={btn('#fb8c00')}>Ver prácticas <span style={arrow}>→</span></a>
          </article>

          {/* Recursos */}
          <article className="lift-card" style={cardStyle('#4a2500','#e65100','#fb8c00')}>
            <div className="glow" style={glowStyle}></div>
            <span style={pill('#fed7aa')}>Extra</span>
            <h3 style={title}>Recursos</h3>
            <p style={desc}>
              Material extra: manuales, herramientas y referencias.
            </p>
            <a href="/docs/recursos" style={btn('#fb8c00')}>Abrir recursos <span style={arrow}>→</span></a>
          </article>
        </section>

        {/* CTA final */}
        <section style={{maxWidth:1100, margin:'0 auto 56px', padding:'0 16px'}}>
          <div style={{
            borderRadius:18, padding:20,
            background:'linear-gradient(135deg, rgba(255,255,255,.06), rgba(255,255,255,.03))',
            border:'1px solid rgba(255,255,255,.08)'
          }}>
            <h3 style={{margin:'0 0 8px'}}>¿Listo para empezar?</h3>
            <p style={{margin:'0 0 14px', color:'rgba(226,232,240,.85)'}}>
              Ve directo al índice o consulta recursos adicionales.
            </p>
            <div style={{display:'flex', gap:12, flexWrap:'wrap'}}>
              <a href="/docs/intro" style={btnPrimary}>Ir a /docs/intro →</a>
              <a href="/" style={btnGhost}>Volver a ErciApps</a>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

/* ====== estilos reutilizables ====== */
const title = {fontSize:20, fontWeight:800, margin:'6px 0 6px'};
const desc  = {margin:'0 0 14px', color:'rgba(255,255,255,.9)', minHeight:42};
const arrow = {transition:'transform .18s'};

const btnPrimary = {
  display:'inline-flex', alignItems:'center', gap:8,
  textDecoration:'none', color:'#0b1220', background:'#fb8c00',
  padding:'10px 14px', borderRadius:12, fontWeight:800,
  boxShadow:'0 6px 14px rgba(251,140,0,.35)'
};
const btnGhost = {
  display:'inline-flex', alignItems:'center', gap:8,
  textDecoration:'none', color:'#e2e8f0', background:'transparent',
  padding:'10px 14px', borderRadius:12, fontWeight:700,
  border:'1px solid rgba(255,255,255,.18)'
};

function btn(color){
  return {
    display:'inline-flex', alignItems:'center', gap:8,
    textDecoration:'none', color:'#0b1220', background:color,
    padding:'10px 14px', borderRadius:12, fontWeight:800,
    boxShadow:`0 6px 14px ${hexToRgba(color, .45)}`
  };
}

function pill(bg){
  return {
    display:'inline-block', fontSize:12, fontWeight:700, color:'#0b1220',
    background:bg, padding:'4px 9px', borderRadius:999, marginBottom:10
  };
}

function cardStyle(from, to){
  return {
    '--rx':'0deg','--ry':'0deg','--tx':'0px','--ty':'0px','--lift':'0px','--scale':'1',
    position:'relative', overflow:'hidden', borderRadius:18, padding:20, color:'#fff',
    border:'1px solid rgba(255,255,255,.08)',
    background:`linear-gradient(135deg, ${from}, ${to})`,
    transform:`translate3d(0, calc(-1 * var(--lift)), 0)
               translate3d(var(--tx), var(--ty), 0)
               rotateX(var(--rx)) rotateY(var(--ry)) scale(var(--scale))`,
    transition:'transform .25s cubic-bezier(.2,.8,.2,1), box-shadow .25s ease, border-color .25s ease',
    willChange:'transform'
  };
}

const glowStyle = {
  position:'absolute', inset:0, pointerEvents:'none', opacity:0, transition:'opacity .2s ease'
};

function hexToRgba(hex, a){
  const n = hex.replace('#','');
  const bigint = parseInt(n.length===3 ? n.split('').map(c=>c+c).join('') : n, 16);
  const r = (bigint >> 16) & 255, g = (bigint >> 8) & 255, b = bigint & 255;
  return `rgba(${r},${g},${b},${a})`;
}
