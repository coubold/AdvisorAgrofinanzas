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
