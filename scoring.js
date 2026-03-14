// SCORING ENGINE
// ═══════════════════════════════════════════════════════
// SCORING ENGINE
// Depende de: catalog.js, data.js
// ═══════════════════════════════════════════════════════

function getCatCtx(cat, cultivo, etapa) {
  const c = CAT_CONTEXT[cat];
  if (!c) return '';
  return c[etapa] || c[cultivo] || c.default || '';
}

function scoreConv(c, cultivo, conf, hist, etapa) {
  const s_cult = c.cultivos.includes(cultivo) ? 1 : (c.cultivos.includes('general') ? 0.5 : 0);
  const s_hist = hist[cultivo] || 0;
  const s_etapa = c.etapas.includes(etapa) ? 1 : (c.etapas.includes('general') ? 0.5 : 0);
  const tnaMin = c.tnaMin ?? 20;
  const s_tna = Math.max(0, 1 - tnaMin / 40);
  const s_sub = c.sub ? 1 : 0;
  const genericas = ['maquinaria_agricola', 'prestamo_campana'];
  const s_esp = genericas.includes(c.subcat) ? 0.5 : 1;

  const raw = W.cultivo * s_cult
    + W.hist * s_hist
    + W.etapa * s_etapa
    + W.tna * s_tna
    + W.subsidio * s_sub
    + W.especificidad * s_esp;

  const fac = conf >= 0.70 ? 1 : conf >= 0.45 ? 0.7 : 0.4;
  return Math.round(raw * fac * 1000) / 1000;
}

// ── Tier de recomendación (relativo al mejor score del lote) ──
function scoreTier(sc, topScore) {
  const ref = topScore || sc;
  const ratio = ref > 0 ? sc / ref : 0;
  if (ratio >= 0.90) return { label: 'Muy recomendado', color: '#1B7A55', bg: 'var(--gna)' };
  if (ratio >= 0.70) return { label: 'Recomendado', color: '#1473B7', bg: 'var(--lb)' };
  if (ratio >= 0.45) return { label: 'Buena opción', color: '#B86B00', bg: 'var(--ama)' };
  return { label: 'Disponible', color: '#9E9E9E', bg: 'var(--g1)' };
}

// ── Recomendación del asesor (texto fluido, menciona cultivos detectados) ──
function buildRecomendacion(c, cultivo, conf, etapa) {
  const cL = CROP_LABEL[cultivo] || cultivo;
  const eL = (ETAPA_LABEL[etapa] || etapa).toLowerCase();

  // Check which detected crops this convenio covers
  const allCrops = appState.detResult?.allCrops || [];
  const coveredCrops = allCrops.filter(ac => c.cultivos.includes(ac.cultivo));
  const coveredNames = coveredCrops.map(ac => CROP_LABEL[ac.cultivo]);

  // Apertura: qué cultivos tiene el lote
  let opening = '';
  if (allCrops.length > 1 && conf >= 0.45) {
    const cropList = allCrops.map(ac => `<strong>${CROP_LABEL[ac.cultivo]}</strong> (${ac.ha.toFixed(0)} ha)`).join(', ');
    opening = `En tu lote detectamos ${cropList}. Estás transitando la etapa de <strong>${eL}</strong>.`;
  } else if (conf >= 0.70) {
    opening = `Tu lote tiene <strong>${cL}</strong> en etapa de <strong>${eL}</strong>.`;
  } else if (conf >= 0.45) {
    opening = `Identificamos actividad consistente con <strong>${cL}</strong>, probablemente en <strong>${eL}</strong>.`;
  } else {
    opening = `Basándonos en la época del año, tu lote estaría transitando la etapa de <strong>${eL}</strong>.`;
  }

  // Contexto agronómico
  const catCtx = getCatCtx(c.cat, cultivo, etapa);

  // Gancho financiero — menciona para qué cultivos aplica
  let finHook = '';
  const applicability = coveredNames.length > 0 && coveredNames.length < allCrops.length
    ? ` Aplica para tu ${coveredNames.join(' y ')}.`
    : coveredNames.length === allCrops.length && allCrops.length > 1
      ? ` Aplica para todos tus cultivos.`
      : '';

  if (c.tna0) {
    finHook = `<strong>${c.nombre}</strong> te permite financiar esto a <strong>tasa 0% en dólares</strong> — cubrís el gasto sin costo financiero si cancelás en plazo.${applicability}`;
  } else if (c.sub) {
    finHook = `Con <strong>${c.nombre}</strong>, BBVA subsidia parte de la tasa nominal, reduciendo el costo real del financiamiento.${applicability}`;
  } else {
    finHook = `<strong>${c.nombre}</strong> ofrece una TNA desde ${c.tnaMin}%, competitiva para el segmento agropecuario.${applicability}`;
  }

  let text = opening;
  if (catCtx) text += ' ' + catCtx;
  text += ' ' + finHook;
  return text;
}

function buildRecomendacionGeneric(c) {
  let situacion = '';
  if (c.cat === 'financiamiento') {
    situacion = 'Aunque no identificamos un cultivo específico en este momento, es un buen momento para evaluar financiamiento para la próxima campaña.';
  } else if (c.cat === 'maquinaria') {
    situacion = 'La inversión en maquinaria con financiamiento a largo plazo es una oportunidad que no depende del cultivo actual.';
  } else {
    situacion = `Aunque no identificamos un cultivo específico, <strong>${c.nombre}</strong> ofrece condiciones abiertas a cualquier producción.`;
  }

  let finHook = '';
  if (c.tna0) {
    finHook = `Este convenio tiene <strong>tasa 0% en dólares</strong>, ideal para planificar la próxima campaña sin costo financiero.`;
  } else if (c.sub) {
    finHook = `BBVA subsidia parte de la tasa con este proveedor, reduciendo el costo efectivo del crédito.`;
  } else {
    finHook = `La TNA parte desde ${c.tnaMin}%.`;
  }

  return situacion + ' ' + finHook;
}

// ── Texto corto para tarjetas (menciona cultivos) ──
function buildShort(c, cultivo, etapa) {
  const eL = (ETAPA_LABEL[etapa] || etapa).toLowerCase();
  const allCrops = appState.detResult?.allCrops || [];
  const coveredCrops = allCrops.filter(ac => c.cultivos.includes(ac.cultivo));
  const cropStr = coveredCrops.length > 1
    ? coveredCrops.map(ac => CROP_LABEL[ac.cultivo]).join(', ')
    : CROP_LABEL[cultivo] || cultivo;

  if (c.tna0) return `Tasa 0% USD para ${cropStr} en ${eL}.`;
  if (c.sub) return `Tasa subsidiada para ${cropStr} en ${eL}.`;
  return `Desde ${c.tnaMin}% TNA para ${cropStr} en ${eL}.`;
}

function buildShortGeneric(c) {
  if (c.tna0) return `Tasa 0% en dólares disponible para cualquier campaña.`;
  if (c.sub) return `Oportunidad: tasa subsidiada por BBVA.`;
  return `Financiamiento disponible desde ${c.tnaMin}% TNA.`;
}

// ── Mock crop history with rotation ──
function mockHist(cultivo) {
  const rotaciones = {
    maiz: { maiz: 0.6, soja: 0.3, trigo: 0.1 },
    soja: { soja: 0.5, maiz: 0.3, trigo: 0.15, girasol: 0.05 },
    trigo: { trigo: 0.4, soja: 0.35, maiz: 0.2, girasol: 0.05 },
    girasol: { girasol: 0.4, soja: 0.3, trigo: 0.2, maiz: 0.1 }
  };
  return rotaciones[cultivo] || { [cultivo]: 1 };
}

function scoreAll(cultivo, conf) {
  const mes = new Date().getMonth() + 1;
  const etapa = cultivo ? (CAL[cultivo] || {})[mes] || 'general' : 'general';
  const hist = cultivo ? mockHist(cultivo) : {};

  const scored = CATALOG.map(c => ({
    ...c,
    score: cultivo ? scoreConv(c, cultivo, conf, hist, etapa) : scoreGeneric(c, mes),
    expl_short: cultivo ? buildShort(c, cultivo, etapa) : buildShortGeneric(c),
    recomendacion: cultivo ? buildRecomendacion(c, cultivo, conf, etapa) : buildRecomendacionGeneric(c)
  }));

  scored.sort((a, b) => b.score - a.score);

  const cats = {};
  const res = [];
  for (const c of scored) {
    const max = c.cat === 'maquinaria' ? 3 : 2;
    if ((cats[c.cat] || 0) < max) {
      res.push(c);
      cats[c.cat] = (cats[c.cat] || 0) + 1;
    }
    if (res.length >= 10) break;
  }

  return { etapa, mes, top: res, allScored: scored, noCrop: !cultivo };
}

// Generic scoring when no crop detected — weight financial conditions more
function scoreGeneric(c, mes) {
  const s_tna = Math.max(0, 1 - (c.tnaMin ?? 20) / 40);
  const s_sub = c.sub ? 1 : 0;
  const universal = ['financiamiento', 'maquinaria'].includes(c.cat) ? 1 : 0.5;
  return Math.round((0.40 * s_tna + 0.30 * s_sub + 0.30 * universal) * 1000) / 1000;
}

function buildShortGeneric(c) {
  if (c.tna0) return `Financiamiento con tasa 0% USD disponible.`;
  if (c.sub) return `Tasa subsidiada por BBVA — aplica a cualquier cultivo.`;
  return `TNA desde ${c.tnaMin}% — financiamiento general.`;
}

function buildExplGeneric(c) {
  return buildRecomendacionGeneric(c);
}
