// RENDERING UI (recomendaciones, lista, detalle)
// ═══════════════════════════════════════════════════════
// RENDERING UI — Recomendaciones, lista, detalle
// Depende de: data.js, scoring.js, api.js
// ═══════════════════════════════════════════════════════

function icoStyle(cat) {
  const p = (CAT_ICO[cat] || '#F2F2F2:#555').split(':');
  return `background:${p[0]};color:${p[1]}`;
}

function icoInits(n) {
  const w = n.trim().split(' ');
  return w.length === 1 ? w[0].slice(0, 2).toUpperCase() : (w[0][0] + w[1][0]).toUpperCase();
}

// ── Pantalla principal de recomendaciones ──

function showReco() {
  const det = appState.detResult;
  const cultivo = det?.cultivo;
  const conf = det?.conf || 0;
  const { etapa, top, noCrop } = appState.recoResult;
  const histA = appState.histAnalysis;
  const lnombre = document.getElementById('inp-nombre').value || 'Sin nombre';

  // ── Header ──
  const allCrops = det?.allCrops || [];
  if (cultivo) {
    const cropNames = allCrops.map(c => `${CROP_EMOJI[c.cultivo] || ''} ${CROP_LABEL[c.cultivo]} (${c.ha.toFixed(0)} ha)`).join(', ');
    document.getElementById('reco-title').textContent = `${lnombre}`;
    document.getElementById('crop-tag').textContent = CROP_LABEL[cultivo] || cultivo;
    document.getElementById('etapa-tag').textContent = ETAPA_LABEL[etapa] || etapa;

    // Show all crops as tags
    const tagsContainer = document.getElementById('crop-tag').parentElement;
    const existingExtra = tagsContainer.querySelectorAll('.ph-tag-crop-extra');
    existingExtra.forEach(el => el.remove());
    allCrops.forEach(c => {
      const tag = document.createElement('span');
      tag.className = 'ph-tag ph-tag-crop ph-tag-crop-extra';
      tag.textContent = `${CROP_EMOJI[c.cultivo] || ''} ${CROP_LABEL[c.cultivo]} ${c.ha.toFixed(0)} ha`;
      tagsContainer.insertBefore(tag, document.getElementById('etapa-tag'));
    });
    document.getElementById('crop-tag').style.display = 'none';
  } else {
    document.getElementById('reco-title').textContent = `📊 ${lnombre} — Sin cultivo detectado`;
    document.getElementById('crop-tag').style.display = '';
    document.getElementById('crop-tag').textContent = 'Sin cultivo';
    document.getElementById('etapa-tag').textContent = 'General';
  }

  const locParts = [document.getElementById('inp-loc').value, document.getElementById('inp-prov').value].filter(Boolean).join(', ');
  document.getElementById('reco-sub').textContent =
    `${(appState.ha || 0).toFixed(0)} ha${locParts ? ' · ' + locParts : ''}`;
  document.getElementById('n-tag').textContent = `${top.length} convenios recomendados`;

  // ── API raw response display (deshabilitado) ──
  let apiRawHtml = '';

  // ── Hist summary panel + green badge ──
  let histHtml = '';
  if (histA && histA.campaigns.length) {
    const timeline = histA.campaigns.map(c => {
      const emoji = CROP_EMOJI[CROP_MAP[c.crop?.toLowerCase()]] || '🌿';
      return `<div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:.5px solid var(--g2);">
        <span style="font-size:11px;font-weight:700;color:var(--g4);min-width:44px;">${c.label}</span>
        <span style="font-size:14px;">${emoji}</span>
        <span style="font-size:12px;font-weight:600;color:var(--g9);">${c.crop}</span>
        <span style="font-size:11px;color:var(--g4);margin-left:auto;">${c.ha?.toFixed(0)} ha</span>
      </div>`;
    }).join('');

    // Green badge
    let badge = '';
    if (histA.noDeforestation) {
      badge = `<div style="display:flex;align-items:center;gap:8px;padding:10px 14px;background:#E8F5E9;border:1px solid #A5D6A7;border-radius:12px;margin-top:10px;">
        <span style="font-size:20px;">🌿</span>
        <div>
          <div style="font-size:12px;font-weight:700;color:#2E7D32;">Lote con uso agrícola histórico verificado</div>
          <div style="font-size:11px;color:#558B2F;line-height:1.4;">${histA.totalCampaigns} campañas registradas${histA.hasRotation ? ` con rotación de cultivos (${histA.uniqueCrops.map(c => (CROP_LABEL[CROP_MAP[c?.toLowerCase()]] || c)).join(', ')}). La rotación es un indicador de manejo sustentable y preservación del suelo.` : '.'}${histA.noDeforestation ? ' Este lote no presenta indicios de deforestación reciente.' : ''}</div>
        </div>
      </div>`;
    } else if (histA.hasRotation) {
      badge = `<div style="display:flex;align-items:center;gap:8px;padding:10px 14px;background:#E8F5E9;border:1px solid #A5D6A7;border-radius:12px;margin-top:10px;">
        <span style="font-size:20px;">🔄</span>
        <div>
          <div style="font-size:12px;font-weight:700;color:#2E7D32;">Rotación de cultivos detectada</div>
          <div style="font-size:11px;color:#558B2F;">Cultivos registrados: ${histA.uniqueCrops.map(c => (CROP_LABEL[CROP_MAP[c?.toLowerCase()]] || c)).join(', ')}. La diversificación productiva reduce el riesgo crediticio.</div>
        </div>
      </div>`;
    }

    // Agrofinance insight
    let insight = '';
    if (histA.hasRotation) {
      insight = `<div style="font-size:12px;color:var(--g6);line-height:1.5;margin-top:8px;padding:10px 12px;background:var(--lb);border-radius:10px;">
        <strong style="color:var(--nv);">Perfil agrofinanciero:</strong> Este lote muestra ${histA.totalCampaigns} campañas con ${histA.uniqueCrops.length} cultivos diferentes. La rotación ${histA.uniqueCrops.map(c => (CROP_LABEL[CROP_MAP[c?.toLowerCase()]] || c)).join(' → ')} es consistente con un esquema de producción sustentable. Desde el punto de vista crediticio, la diversificación de cultivos reduce la exposición a riesgos climáticos y de mercado concentrados en un solo commodity.
      </div>`;
    } else if (histA.totalCampaigns >= 2) {
      const mainCrop = histA.campaigns[histA.campaigns.length - 1]?.crop;
      insight = `<div style="font-size:12px;color:var(--g6);line-height:1.5;margin-top:8px;padding:10px 12px;background:var(--lb);border-radius:10px;">
        <strong style="color:var(--nv);">Perfil agrofinanciero:</strong> Este lote muestra continuidad productiva en ${mainCrop} durante ${histA.totalCampaigns} campañas. La especialización indica inversión estructural en el cultivo, lo que puede favorecer el acceso a convenios específicos de la cadena.
      </div>`;
    }

    histHtml = `<div style="padding:12px 16px;background:var(--w);border-bottom:.5px solid var(--g2);">
      <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:var(--g4);margin-bottom:6px;">Historial del lote por campaña</div>
      <div style="background:var(--g1);border-radius:12px;padding:10px 14px;">${timeline}</div>
      ${badge}${insight}
    </div>`;
  } else if (!cultivo) {
    // No crop detected AND no agricultural history
    histHtml = `<div style="padding:16px;background:var(--w);border-bottom:.5px solid var(--g2);">
      <div style="display:flex;align-items:center;gap:10px;padding:14px 16px;background:var(--g1);border-radius:12px;">
        <span style="font-size:22px;">🏜️</span>
        <div>
          <div style="font-size:13px;font-weight:700;color:var(--g9);">Sin actividad agrícola detectada</div>
          <div style="font-size:12px;color:var(--g6);line-height:1.5;margin-top:2px;">Este lote no presenta cultivos actuales ni historial de producción agrícola en las campañas analizadas. Las recomendaciones se basan en las mejores condiciones financieras generales.</div>
        </div>
      </div>
    </div>`;
  }

  // ── Summary stats ──
  const tasa0 = top.filter(c => c.tna0).length;
  const subsi = top.filter(c => c.sub).length;
  const catSet = new Set(top.map(c => c.cat));
  document.getElementById('reco-summary').innerHTML = apiRawHtml + histHtml + `
    <div style="display:flex;gap:12px;padding:10px 16px;overflow-x:auto;">
      <div class="reco-stat"><div class="reco-stat-n">${top.length}</div><div class="reco-stat-l">convenios<br>seleccionados</div></div>
      <div class="reco-stat"><div class="reco-stat-n">${catSet.size}</div><div class="reco-stat-l">categorías<br>representadas</div></div>
      <div class="reco-stat"><div class="reco-stat-n" style="color:var(--gn)">${tasa0}</div><div class="reco-stat-l">con tasa<br>0% USD</div></div>
      <div class="reco-stat"><div class="reco-stat-n" style="color:var(--am)">${subsi}</div><div class="reco-stat-l">con tasa<br>subsidiada</div></div>
    </div>`;

  // ── Category filter chips ──
  const catCounts = {};
  let anticCount = 0;
  top.forEach(c => {
    catCounts[c.cat] = (catCounts[c.cat] || 0) + 1;
    if (c.anticipar) anticCount++;
  });
  let chips = `<div class="cat-chip active" data-cat="all" onclick="filterCat('all')">Todos <span class="chip-count">(${top.length})</span></div>`;
  for (const [cat, count] of Object.entries(catCounts)) {
    chips += `<div class="cat-chip" data-cat="${cat}" onclick="filterCat('${cat}')">${CAT_LABEL[cat] || cat} <span class="chip-count">(${count})</span></div>`;
  }
  if (anticCount > 0) {
    chips += `<div class="cat-chip" data-cat="anticipar" onclick="filterCat('anticipar')" style="border-color:var(--am);">Anticipar <span class="chip-count">(${anticCount})</span></div>`;
  }
  document.getElementById('cat-bar').innerHTML = chips;
  appState.activeCatFilter = 'all';

  renderList(top);

  // Auto-seleccionar el convenio más recomendado
  if (top.length) {
    const firstCard = document.querySelector('.ccard');
    if (firstCard) firstCard.classList.add('selected');
    showDetalle(top[0], 0);
  }

  showTab('reco');
}

// ── Filtro por categoría ──

function filterCat(cat) {
  appState.activeCatFilter = cat;
  document.querySelectorAll('.cat-chip').forEach(c => {
    c.classList.toggle('active', c.dataset.cat === cat);
  });
  let filtered;
  if (cat === 'all') {
    filtered = appState.recoResult.top;
  } else if (cat === 'anticipar') {
    filtered = appState.recoResult.top.filter(c => c.anticipar);
  } else {
    filtered = appState.recoResult.top.filter(c => c.cat === cat);
  }
  renderList(filtered);
}

// ── Lista de convenios ──

function renderList(items) {
  const list = document.getElementById('reco-list');
  list.innerHTML = '';
  const topScore = appState.recoResult?.top?.[0]?.score || 1;

  items.forEach((c, i) => {
    const tier = scoreTier(c.score, topScore);

    const tags = [];
    if (c.anticipar) tags.push('<span class="tpill" style="background:#FEF3DE;color:#B86B00;">Anticipar</span>');
    if (c.tna0) tags.push('<span class="tpill tg">Tasa 0% USD</span>');
    if (c.sub && !c.tna0) tags.push('<span class="tpill tg">Subsidiado BBVA</span>');
    if (c.usd && !c.tna0) tags.push('<span class="tpill tb">USD disponible</span>');
    if (!c.ars && c.usd) tags.push('<span class="tpill tb">Solo USD</span>');
    if (c.subcat !== 'maquinaria_agricola' && c.subcat !== 'prestamo_campana' && c.subcat !== 'semillas_certificadas')
      tags.push(`<span class="tpill ta">${SUBCAT_LABEL[c.subcat] || c.subcat}</span>`);

    const div = document.createElement('div');
    div.className = 'ccard';
    div.dataset.idx = i;
    div.innerHTML = `
      <div class="ctop">
        <div class="cico" style="${icoStyle(c.cat)}">${icoInits(c.nombre)}</div>
        <div style="flex:1;min-width:0;">
          <div class="cnm">${c.nombre}</div>
          <div class="cct">${CAT_LABEL[c.cat] || c.cat} · ${SUBCAT_LABEL[c.subcat] || c.subcat}</div>
        </div>
        <span style="font-size:11px;font-weight:700;color:${tier.color};background:${tier.bg};padding:3px 10px;border-radius:8px;white-space:nowrap;">${tier.label}</span>
      </div>
      <div class="ctgs">${tags.join('')}</div>
      <div class="cex">${c.expl_short}</div>
    `;
    div.onclick = () => {
      document.querySelectorAll('.ccard').forEach(d => d.classList.remove('selected'));
      div.classList.add('selected');
      showDetalle(c, i);
    };
    list.appendChild(div);
  });
}

// ── Detalle de un convenio ──

function showDetalle(c, idx) {
  const { etapa } = appState.recoResult;
  const tnaMin = c.tnaMin;
  const maxPlazo = c.subs.reduce((a, b) => Math.max(a, b.dias || 0), 0);
  const maxPlazoLabel = c.subs.find(s => s.dias === maxPlazo)?.plazo || '–';
  const maxSub = c.subs.reduce((a, b) => Math.max(a, b.subsidio || 0), 0);
  const topScore = appState.recoResult?.top?.[0]?.score || 1;
  const tier = scoreTier(c.score, topScore);

  // Build recommendation text
  const det = appState.detResult || {};
  const cultivo = det.cultivo;
  const conf = det.conf || 0;
  const recoText = c.recomendacion || (cultivo ? buildRecomendacion(c, cultivo, conf, etapa) : buildRecomendacionGeneric(c));
  const recoLabel = c.anticipar ? 'Anticipar para la próxima etapa' : 'Recomendación del asesor';
  const recoBg = c.anticipar ? 'background:var(--ama);' : 'background:var(--g1);';

  document.getElementById('det-wrap').innerHTML = `
    <div class="det-card">
      <div class="det-card-hdr">
        <div class="det-hero">
          <div class="det-ico" style="${icoStyle(c.cat)}">${icoInits(c.nombre)}</div>
          <div>
            <div class="det-nm">${c.nombre}</div>
            <div class="det-cat">${CAT_LABEL[c.cat] || c.cat} · ${SUBCAT_LABEL[c.subcat] || c.subcat}</div>
          </div>
          <div class="det-sc">
            <div class="det-scv" style="color:${tier.color}">${tier.label}</div>
          </div>
        </div>
      </div>
      <div style="padding:16px 20px;">
        <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:${c.anticipar ? 'var(--am)' : 'var(--g4)'};margin-bottom:8px;">${recoLabel}</div>
        <div style="font-size:14px;line-height:1.65;color:var(--g9);${recoBg}border-radius:12px;padding:16px 18px;">${recoText}</div>
      </div>
      <div class="det-sec">Condiciones disponibles</div>
      <div class="cgrid">
        <div class="cbox"><div class="clbl">TNA mínima</div><div class="cv ${tnaMin === 0 ? 'cv-y' : ''}">${tnaMin === 0 ? '0 %' : (tnaMin ?? '–') + '%'}</div></div>
        <div class="cbox"><div class="clbl">Tasa cero USD</div><div class="cv ${c.tna0 ? 'cv-y' : ''}">${c.tna0 ? 'Sí' : 'No'}</div></div>
        <div class="cbox"><div class="clbl">Plazo máximo</div><div class="cv">${maxPlazoLabel}</div></div>
        <div class="cbox"><div class="clbl">Subsidio máx.</div><div class="cv">${maxSub ? maxSub + ' pts' : '–'}</div></div>
      </div>
      <div class="det-sec">Sub-productos</div>
      <div class="subs-wrap">
        ${c.subs.map(s => `
          <div class="sub-row">
            <div class="smon ${s.mon === 'USD' ? 'susd' : 'sars'}">${s.mon}</div>
            <div class="sinf">
              <div class="sds">${CAT_LABEL[c.cat] || c.cat} ${s.mon}</div>
              <div class="spl">${s.plazo}${s.am ? ' · ' + s.am : ''}</div>
            </div>
            <div class="stna-col">
              <div class="stnav ${s.tna === 0 ? 'stnav-z' : ''}">${s.tna === 0 ? '0%' : s.tna + '%'}</div>
              <div class="stnal">TNA</div>
              ${s.subsidio ? `<div class="ssub">-${s.subsidio} pts sub.</div>` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
    <button class="cta-p" style="margin-bottom:10px;" onclick="showModal()">Contactar ejecutivo BBVA</button>
    <button class="cta-s">Compartir análisis</button>
  `;
}
