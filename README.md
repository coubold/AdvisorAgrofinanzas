# BBVA AgroAdvisor

Asistente de AgroFinanzas — prototipo con sensorización Bold y convenios BBVA.

## Estructura

```
index.html       ← HTML + layout
styles.css       ← Estilos
catalog.json     ← 57 convenios BBVA (endpoint simulado)
catalog.js       ← Fallback local + fetchCatalog()
data.js          ← Constantes, lookups, anticipación, estado global
scoring.js       ← Motor de scoring, recomendaciones, anticipación
api.js           ← OAuth Bold, parseo, mock
map.js           ← Leaflet, capas, dibujo, geoloc
ui.js            ← Rendering de resultados y detalle
app.js           ← Flujo principal, navegación, init
```

## Actualizar convenios

Editá `catalog.json` directamente en GitHub — no hace falta tocar código.
El app lo fetchea al cargar. Si falla, usa el fallback de `catalog.js`.

## Deploy en GitHub Pages

1. [github.com/new](https://github.com/new) → nombre `agroadvisor`, público
2. Upload files → arrastrá **todos los archivos** → Commit
3. Settings → Pages → Branch: `main`, carpeta `/ (root)` → Save
4. URL: `https://TU-USUARIO.github.io/agroadvisor/`

## Para editar

| Querés cambiar... | Archivo |
|---|---|
| Convenios/merchants | `catalog.json` (editar en GitHub directo) |
| Pesos del scoring | `data.js` → const W |
| Calendario agronómico | `data.js` → const CAL |
| Textos de anticipación | `data.js` → const ANTICIPATION |
| Textos de recomendación | `scoring.js` → buildRecomendacion |
| Credenciales API | `index.html` → cfg-client/cfg-secret |
| Look & feel | `styles.css` |
| Layout de pantallas | `index.html` |
| Cómo se muestran los resultados | `ui.js` |
| Flujo de consulta | `app.js` → consultar() |
| Mapa / geoloc | `map.js` |
