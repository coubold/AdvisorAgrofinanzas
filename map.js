// MAPA LEAFLET (init, capas, dibujo, geoloc)
// ═══════════════════════════════════════════════════════
// MAPA LEAFLET — Init, capas, dibujo, búsqueda de localidad
// Depende de: data.js (appState), Leaflet + Leaflet.Draw
// ═══════════════════════════════════════════════════════

let map, drawLayer, drawnItems, osmLayer, satLayer;

function initMap() {
  map = L.map('map', { center: [-33.3, -61.5], zoom: 7, zoomControl: false });
  L.control.zoom({ position: 'bottomright' }).addTo(map);

  osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19, attribution: '© OSM'
  });
  satLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19, attribution: '© Esri'
  });
  osmLayer.addTo(map);

  drawnItems = new L.FeatureGroup();
  map.addLayer(drawnItems);

  drawLayer = new L.Control.Draw({
    edit: { featureGroup: drawnItems },
    draw: {
      polyline: false, rectangle: false, circle: false,
      circlemarker: false, marker: false,
      polygon: { shapeOptions: { color: '#02A5A5', weight: 2, fillOpacity: 0.15 } }
    }
  });
  map.addControl(drawLayer);

  map.on(L.Draw.Event.CREATED, e => {
    drawnItems.clearLayers();
    drawnItems.addLayer(e.layer);
    onPolygon(e.layer);
  });

  map.on(L.Draw.Event.DELETED, () => {
    appState.polygon = null;
    appState.ha = 0;
    document.getElementById('ha-disp').style.display = 'none';
    document.getElementById('btn-consultar').disabled = true;
  });
}

function setLayer(l) {
  if (l === 'sat') {
    map.removeLayer(osmLayer);
    satLayer.addTo(map);
    document.getElementById('btn-sat').classList.add('active');
    document.getElementById('btn-osm').classList.remove('active');
  } else {
    map.removeLayer(satLayer);
    osmLayer.addTo(map);
    document.getElementById('btn-osm').classList.add('active');
    document.getElementById('btn-sat').classList.remove('active');
  }
}

function calcHa(ll) {
  const coords = ll.map(c => [c.lng * Math.PI / 180, c.lat * Math.PI / 180]);
  coords.push(coords[0]);
  let area = 0;
  const R = 6371000;
  for (let i = 0; i < coords.length - 1; i++) {
    const [l1, p1] = coords[i];
    const [l2, p2] = coords[i + 1];
    area += (l2 - l1) * (2 + Math.sin(p1) + Math.sin(p2));
  }
  return Math.abs(area * R * R / 2) / 10000;
}

function onPolygon(layer) {
  const ll = layer.getLatLngs()[0];
  const ha = calcHa(ll);
  appState.ha = ha;
  appState.polygon = ll.map(c => [c.lng, c.lat]);
  document.getElementById('ha-disp').textContent = `${ha.toFixed(1)} ha`;
  document.getElementById('ha-disp').style.display = 'block';
  document.getElementById('btn-consultar').disabled = false;
}

// ── Búsqueda de localidad — Nominatim autocomplete ──

let locTimer = null;

function debounceLoc() {
  clearTimeout(locTimer);
  const q = document.getElementById('loc-input').value.trim();
  if (q.length < 3) {
    document.getElementById('loc-results').classList.remove('show');
    return;
  }
  locTimer = setTimeout(() => searchLoc(), 350);
}

async function searchLoc() {
  const q = document.getElementById('loc-input').value.trim();
  if (!q) return;
  const resultsDiv = document.getElementById('loc-results');

  // Coordenadas directas
  const coordMatch = q.match(/^(-?\d+\.?\d*)[,\s]+(-?\d+\.?\d*)$/);
  if (coordMatch) {
    const lat = parseFloat(coordMatch[1]);
    const lng = parseFloat(coordMatch[2]);
    map.setView([lat, lng], 14);
    resultsDiv.classList.remove('show');
    document.getElementById('loc-input').value = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    return;
  }

  try {
    const resp = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q + ' Argentina')}&limit=6&countrycodes=ar`);
    const data = await resp.json();
    if (!data.length) {
      resultsDiv.innerHTML = '<div class="loc-item" style="color:var(--g4);">Sin resultados</div>';
      resultsDiv.classList.add('show');
      return;
    }
    resultsDiv.innerHTML = data.map(r => {
      const parts = r.display_name.split(',');
      const main = parts[0];
      const sub = parts.slice(1, 3).join(',').trim();
      return `<div class="loc-item" onclick="goToLoc(${r.lat},${r.lon},this)" data-name="${main}" data-prov="${(parts[parts.length - 3] || '').trim()}"><b>${main}</b><br><span style="color:var(--g4)">${sub}</span></div>`;
    }).join('');
    resultsDiv.classList.add('show');
  } catch (e) {
    resultsDiv.innerHTML = '<div class="loc-item" style="color:var(--g4);">Error de búsqueda</div>';
    resultsDiv.classList.add('show');
  }
}

function goToLoc(lat, lng, el) {
  map.setView([lat, lng], 14);
  document.getElementById('loc-results').classList.remove('show');
  const name = el.dataset.name || '';
  const prov = el.dataset.prov || '';
  document.getElementById('loc-input').value = name;
  if (!document.getElementById('inp-loc').value && name) document.getElementById('inp-loc').value = name;
  if (!document.getElementById('inp-prov').value && prov) document.getElementById('inp-prov').value = prov;
}

// Cerrar dropdown al clickear fuera
document.addEventListener('click', e => {
  if (!e.target.closest('.loc-search')) document.getElementById('loc-results')?.classList.remove('show');
});
