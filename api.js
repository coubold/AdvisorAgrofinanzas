// API BOLD (OAuth, detección, parseo, mock)
// ═══════════════════════════════════════════════════════
// API BOLD — OAuth2, Crop Detection, Parseo, Mock
// Depende de: data.js (CROP_MAP)
// ═══════════════════════════════════════════════════════

const API_BASE = 'https://api.bold-agro.ai';
let tokenCache = { token: null, exp: 0 };

async function getToken() {
  if (tokenCache.token && Date.now() < tokenCache.exp) return tokenCache.token;

  const usr = document.getElementById('cfg-client').value;
  const pwd = document.getElementById('cfg-secret').value;
  if (!usr || !pwd) throw new Error('Sin credenciales');

  const env = document.getElementById('cfg-env').value;
  const basic = btoa(usr + ':' + pwd);

  const r = await fetch(`${API_BASE}/${env}/v1/oauth2/token?grant_type=client_credentials`, {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + basic,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

  if (!r.ok) throw new Error(`Auth ${r.status}`);
  const d = await r.json();
  tokenCache = { token: d.access_token || d.token, exp: Date.now() + (d.expires_in || 3600) * 1000 };
  return tokenCache.token;
}

async function callBold(path, body) {
  const tk = await getToken();
  const env = document.getElementById('cfg-env').value;
  const r = await fetch(`${API_BASE}/${env}/${path}`, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + tk,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  if (!r.ok) throw new Error(`API ${path} → ${r.status}`);
  return r.json();
}

// Parse API response preserving ALL data including "no detectable"
function parseDetsRaw(resp) {
  const dets = resp.detections || [resp];
  const raw = [];
  for (const det of dets) {
    for (const c of (det.crops || [])) {
      raw.push({ name: c.name, value: c.value || 0, year: det.year, month: det.month });
    }
  }
  return raw;
}

// Extract only actionable crops (for scoring)
function parseDets(resp) {
  const res = [];
  const dets = resp.detections || [resp];
  for (const det of dets) {
    const allCrops = det.crops || [];
    const totalDetectable = allCrops.reduce((a, c) => a + (c.value || 0), 0);
    for (const c of allCrops) {
      const key = c.name?.toLowerCase();
      const cult = CROP_MAP[key];
      if (cult && (c.value || 0) > 0) {
        res.push({
          cultivo: cult,
          ha: c.value,
          pct: totalDetectable > 0 ? (c.value / totalDetectable) : 0,
          year: det.year,
          month: det.month
        });
      }
    }
  }
  return res;
}

// Get ALL crops from the most recent month — returns {principal, allCrops[], conf}
function getCultivoActual(dets) {
  if (!dets.length) return null;

  // Find most recent month
  const latest = dets.reduce((a, b) => (b.year > a.year || (b.year === a.year && b.month > a.month)) ? b : a);
  const latestMonth = dets.filter(d => d.year === latest.year && d.month === latest.month);

  // Sort by ha descending
  latestMonth.sort((a, b) => b.ha - a.ha);

  const totalHa = latestMonth.reduce((a, c) => a + c.ha, 0);
  const allCrops = latestMonth.map(c => ({
    cultivo: c.cultivo,
    ha: c.ha,
    pct: totalHa > 0 ? c.ha / totalHa : 0
  }));

  const principal = allCrops[0];
  return {
    cultivo: principal.cultivo,
    conf: Math.min(principal.pct, 1),
    ha: principal.ha,
    allCrops,
    month: latest.month,
    year: latest.year
  };
}

// Mock only for when API is unreachable (CORS) — clearly marked
function mockDetect(coords) {
  return { cultivo: null, conf: 0, ha: 0, allCrops: [], isMock: true };
}

// ═══════════════════════════════════════════════════════
// FLOOD DETECTION — Parsing y análisis hídrico
// Endpoint: POST /v1/flooddetection
// ═══════════════════════════════════════════════════════

// Parse flood response: extracts water levels per month
function parseFloodRaw(resp) {
  const dets = resp.detections || [resp];
  const raw = [];
  for (const det of dets) {
    const ym = det.yearmonth;
    if (!ym) continue;
    const year = Math.floor(ym / 100);
    const month = ym % 100;
    const levels = {};
    let totalHa = 0;
    for (const lv of (det.level || [])) {
      const name = lv.name?.toLowerCase() || '';
      const val = lv.value || 0;
      totalHa += val;
      if (name.includes('alto')) levels.alto = val;
      else if (name.includes('medio')) levels.medio = val;
      else if (name.includes('bajo')) levels.bajo = val;
      else if (name.includes('no detectable')) levels.noDetectable = val;
    }
    raw.push({
      year, month, yearmonth: ym,
      alto: levels.alto || 0,
      medio: levels.medio || 0,
      bajo: levels.bajo || 0,
      noDetectable: levels.noDetectable || 0,
      totalHa
    });
  }
  // Sort chronologically
  raw.sort((a, b) => a.yearmonth - b.yearmonth);
  return raw;
}

// Classify a single month's water situation
function classifyWaterMonth(m) {
  if (m.totalHa === 0) return { status: 'sin_datos', severity: 0 };
  const pctAlto = m.alto / m.totalHa;
  const pctMedio = m.medio / m.totalHa;
  const pctBajo = m.bajo / m.totalHa;
  const pctAgua = (m.alto + m.medio + m.bajo) / m.totalHa;
  const pctSeco = m.noDetectable / m.totalHa;

  // Inundación: alto + medio > 50%
  if (pctAlto + pctMedio >= 0.50) return { status: 'inundacion', severity: 3, label: 'Inundación', emoji: '🌊' };
  // Exceso hídrico: agua total > 70%
  if (pctAgua >= 0.70) return { status: 'exceso', severity: 2, label: 'Exceso hídrico', emoji: '💧' };
  // Seca: no detectable > 80% (sin agua superficial)
  if (pctSeco >= 0.80) return { status: 'seco', severity: 1, label: 'Sin agua superficial', emoji: '☀️' };
  // Humedad moderada
  if (pctAgua >= 0.30) return { status: 'humedo', severity: 0, label: 'Humedad moderada', emoji: '🌤️' };
  // Normal
  return { status: 'normal', severity: 0, label: 'Normal', emoji: '✅' };
}

// Full flood analysis: per-campaign water profile, stress events, risk assessment
function analyzeFlood(floodRaw) {
  if (!floodRaw || !floodRaw.length) return null;

  // Classify each month
  const monthly = floodRaw.map(m => ({
    ...m,
    classification: classifyWaterMonth(m)
  }));

  // Group by campaign (jul-jun)
  const campaigns = {};
  monthly.forEach(m => {
    const campStart = m.month >= 7 ? m.year : m.year - 1;
    const key = `${campStart}/${campStart + 1}`;
    if (!campaigns[key]) campaigns[key] = [];
    campaigns[key].push(m);
  });

  // Analyze each campaign
  const campAnalysis = [];
  for (const [camp, months] of Object.entries(campaigns).sort((a, b) => a[0].localeCompare(b[0]))) {
    const startYear = parseInt(camp.split('/')[0]);
    const label = `${String(startYear).slice(-2)}/${String(startYear + 1).slice(-2)}`;

    // Count months with each status
    const statusCounts = {};
    let maxSeverity = 0;
    let worstStatus = 'normal';
    months.forEach(m => {
      const st = m.classification.status;
      statusCounts[st] = (statusCounts[st] || 0) + 1;
      if (m.classification.severity > maxSeverity) {
        maxSeverity = m.classification.severity;
        worstStatus = st;
      }
    });

    // Average water coverage across the campaign
    const avgAgua = months.reduce((a, m) => a + (m.totalHa > 0 ? (m.alto + m.medio + m.bajo) / m.totalHa : 0), 0) / months.length;
    const avgAlto = months.reduce((a, m) => a + (m.totalHa > 0 ? m.alto / m.totalHa : 0), 0) / months.length;

    // Flood months count (inundacion + exceso)
    const floodMonths = (statusCounts.inundacion || 0) + (statusCounts.exceso || 0);
    // Dry months count
    const dryMonths = statusCounts.seco || 0;

    // Campaign-level classification
    let campStatus, campLabel, campEmoji;
    if (floodMonths >= 3) {
      campStatus = 'inundacion'; campLabel = 'Campaña con exceso hídrico'; campEmoji = '🌊';
    } else if (floodMonths >= 1 && maxSeverity >= 3) {
      campStatus = 'evento_inundacion'; campLabel = 'Eventos de inundación'; campEmoji = '💧';
    } else if (dryMonths >= Math.max(months.length * 0.6, 4)) {
      campStatus = 'seca'; campLabel = 'Campaña seca'; campEmoji = '🏜️';
    } else if (dryMonths >= 3) {
      campStatus = 'estres_hidrico'; campLabel = 'Estrés hídrico parcial'; campEmoji = '⚠️';
    } else {
      campStatus = 'normal'; campLabel = 'Condición hídrica normal'; campEmoji = '✅';
    }

    campAnalysis.push({
      campaign: camp, label, months,
      status: campStatus, statusLabel: campLabel, emoji: campEmoji,
      floodMonths, dryMonths, totalMonths: months.length,
      avgAgua: Math.round(avgAgua * 100),
      avgAlto: Math.round(avgAlto * 100),
      maxSeverity
    });
  }

  // Overall risk profile
  const totalCamps = campAnalysis.length;
  const floodCamps = campAnalysis.filter(c => ['inundacion', 'evento_inundacion'].includes(c.status)).length;
  const dryCamps = campAnalysis.filter(c => ['seca', 'estres_hidrico'].includes(c.status)).length;
  const normalCamps = campAnalysis.filter(c => c.status === 'normal').length;

  let riskProfile, riskLabel, riskColor;
  if (floodCamps >= totalCamps * 0.4) {
    riskProfile = 'flood_prone'; riskLabel = 'Zona con recurrencia de exceso hídrico'; riskColor = '#1565C0';
  } else if (dryCamps >= totalCamps * 0.4) {
    riskProfile = 'drought_prone'; riskLabel = 'Zona con recurrencia de estrés hídrico'; riskColor = '#E65100';
  } else if (floodCamps > 0 && dryCamps > 0) {
    riskProfile = 'variable'; riskLabel = 'Variabilidad hídrica entre campañas'; riskColor = '#F9A825';
  } else {
    riskProfile = 'stable'; riskLabel = 'Perfil hídrico estable'; riskColor = '#2E7D32';
  }

  return {
    monthly,
    campaigns: campAnalysis,
    riskProfile, riskLabel, riskColor,
    floodCamps, dryCamps, normalCamps, totalCamps,
    hasData: true
  };
}

// ── Hist analysis for agrofinance summary (agrupado por campaña jul-jun) ──
function analyzeHist(histRaw) {
  if (!histRaw || !histRaw.length) return null;

  // Map each detection to a campaign: month 7-12 → Y/(Y+1), month 1-6 → (Y-1)/Y
  const campaigns = {};
  histRaw.forEach(d => {
    const campStart = d.month >= 7 ? d.year : d.year - 1;
    const key = `${campStart}/${campStart + 1}`;
    if (!campaigns[key]) campaigns[key] = [];
    campaigns[key].push(d);
  });

  // Collect ALL unique crops per campaign (deduplicated)
  const campCrops = [];
  for (const [camp, crops] of Object.entries(campaigns).sort((a, b) => a[0].localeCompare(b[0]))) {
    const actionable = crops.filter(c => CROP_MAP[c.name?.toLowerCase()] && c.value > 0);
    if (actionable.length) {
      // Deduplicate by crop name, keep unique crops
      const seen = new Set();
      const uniqueInCamp = [];
      for (const c of actionable) {
        const key = c.name?.toLowerCase();
        if (!seen.has(key)) {
          seen.add(key);
          uniqueInCamp.push(c.name);
        }
      }
      const startYear = parseInt(camp.split('/')[0]);
      const label = `${String(startYear).slice(-2)}/${String(startYear + 1).slice(-2)}`;
      campCrops.push({ campaign: camp, label, crops: uniqueInCamp });
    }
  }

  // Rotation check: ≥2 different crops across all campaigns
  const allCropNames = new Set();
  campCrops.forEach(c => c.crops.forEach(name => allCropNames.add(name.toLowerCase())));
  const hasRotation = allCropNames.size >= 2 && campCrops.length >= 2;

  // No deforestation: if ≥3 campaigns with crops, lote has agricultural history
  const noDeforestation = campCrops.length >= 3;

  return {
    campaigns: campCrops,
    uniqueCrops: [...allCropNames],
    hasRotation,
    noDeforestation,
    totalCampaigns: campCrops.length
  };
}
