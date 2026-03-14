// APP (flujo principal, navegación, config, init)
// ═══════════════════════════════════════════════════════
// APP — Flujo principal, navegación, config, modal, init
// Depende de: todos los demás módulos
// ═══════════════════════════════════════════════════════

// ── Navegación entre pantallas ──

function showTab(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('scr-' + id).classList.add('active');
  if (id === 'main' && map) setTimeout(() => map.invalidateSize(), 100);
}

// ── Flujo principal de consulta ──

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

async function consultar() {
  showTab('loading');
  const dots = [0, 1, 2, 3].map(i => document.getElementById('dot' + i));
  const txs = [0, 1, 2, 3].map(i => document.getElementById('tx' + i));
  const step = (i) => {
    dots[i].className = 'lsdot done';
    if (dots[i + 1]) { dots[i + 1].className = 'lsdot run'; }
  };

  let useApi = false;
  try {
    const cid = document.getElementById('cfg-client').value;
    if (cid) { await getToken(); useApi = true; }
  } catch (e) { useApi = false; }

  await delay(600); step(0);

  const coords = appState.polygon.concat([appState.polygon[0]]);
  const geometry = { type: 'Polygon', coordinates: [coords] };
  const now = new Date();
  const custId = '4810d23c-5623-4958-befb-4bfdd5ba44a3';

  // ── Step 1: Crop Detection (for recommendation) ──
  let detResult = null;
  let apiRaw = null;
  if (useApi) {
    try {
      const cropBody = {
        geometry,
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        customerId: custId,
        surface: Math.round(appState.ha) || null
      };
      const resp = await callBold('v2/cropdetection', cropBody);
      apiRaw = parseDetsRaw(resp);
      detResult = getCultivoActual(parseDets(resp));
    } catch (e) {
      console.warn('Crop Detection failed:', e);
      detResult = mockDetect(appState.polygon);
    }
  } else {
    detResult = mockDetect(appState.polygon);
  }
  await delay(800); step(1);
  appState.detResult = detResult || { cultivo: null, conf: 0, ha: 0, allCrops: [] };
  appState.apiRaw = apiRaw;

  // ── Step 2: Crop Detection Hist (for agrofinance summary, NOT for scoring) ──
  let histAnalysis = null;
  if (useApi) {
    try {
      const histBody = { geometry, customerId: custId, surface: null };
      const histResp = await callBold('v2/cropdetection-hist', histBody);
      const histRaw = parseDetsRaw(histResp);
      histAnalysis = analyzeHist(histRaw);
    } catch (e) {
      console.warn('Crop Detection Hist failed:', e);
    }
  }
  await delay(600); step(2);
  appState.histAnalysis = histAnalysis;

  // ── Step 3: Score convenios (based on crop detection only) ──
  const cultivo = appState.detResult.cultivo;
  const conf = appState.detResult.conf || 0;
  const reco = scoreAll(cultivo, conf);
  appState.recoResult = reco;
  appState.allScored = reco.allScored;
  await delay(500); step(3);

  await delay(400);
  showReco();
}

// ── Config / Test API ──

async function testApi() {
  const al = document.getElementById('alert-cfg');
  al.className = 'alert alert-warn';
  al.style.display = 'block';
  al.textContent = 'Verificando conexión…';
  try {
    tokenCache = { token: null, exp: 0 };
    await getToken();
    al.className = 'alert alert-ok';
    al.textContent = 'Conexión exitosa. Token obtenido correctamente.';
    document.getElementById('api-status').textContent = 'API REAL';
    document.getElementById('api-status').className = 'api-status ok';
    document.getElementById('cfg-state').textContent = `Conectado · Ambiente: ${document.getElementById('cfg-env').value} · Token válido.`;
    document.getElementById('alert-api').style.display = 'none';
  } catch (e) {
    al.className = 'alert alert-err';
    al.textContent = `Error: ${e.message}. Si es CORS, la API no acepta requests directos del browser.`;
    document.getElementById('api-status').textContent = 'MOCK';
    document.getElementById('api-status').className = 'api-status mock';
  }
}

// ── Modal ──

function showModal() {
  document.getElementById('modal-bg').classList.add('show');
}

function hideModal(e) {
  if (!e || e.target === document.getElementById('modal-bg'))
    document.getElementById('modal-bg').classList.remove('show');
}

// ── Init ──

(async function init() {
  await fetchCatalog();
  initMap();

  // Auto-validar API silenciosamente
  try {
    const cid = document.getElementById('cfg-client').value;
    if (cid) {
      await getToken();
      document.getElementById('api-status').textContent = 'CONECTADO';
      document.getElementById('api-status').className = 'api-status ok';
      document.getElementById('alert-api').style.display = 'none';
    }
  } catch (e) {
    document.getElementById('api-status').textContent = 'OFFLINE';
    document.getElementById('api-status').className = 'api-status mock';
    document.getElementById('alert-api').style.display = 'none';
  }
})();
