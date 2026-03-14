# BBVA AgroAdvisor

Asistente de AgroFinanzas — prototipo con sensorización Bold y convenios BBVA.

## Estructura

```
index.html      ← HTML + layout (222 lín)
styles.css      ← Estilos (224 lín)
catalog.js      ← 57 merchants BBVA formateados (2699 lín)
data.js         ← Constantes, lookups, estado global (163 lín)
scoring.js      ← Motor de scoring y recomendaciones (189 lín)
api.js          ← OAuth Bold, parseo, mock (158 lín)
map.js          ← Leaflet, capas, dibujo, geoloc (149 lín)
ui.js           ← Rendering de resultados y detalle (266 lín)
app.js          ← Flujo principal, navegación, init (132 lín)
```

## Deploy en GitHub Pages

### Repo nuevo

1. [github.com/new](https://github.com/new) → nombre `agroadvisor`, público
2. Upload files → arrastrá **todos los archivos** → Commit
3. Settings → Pages → Branch: `main`, carpeta `/ (root)` → Save
4. Esperar 1-2 min → `https://TU-USUARIO.github.io/agroadvisor/`

### Actualizar

Upload files → arrastrá los archivos modificados → Commit. Se actualiza en ~30 seg.

## Para editar

| Querés cambiar... | Archivo |
|---|---|
| Un convenio/merchant | `catalog.js` (buscá por nombre) |
| Pesos del scoring | `data.js` → const W |
| Calendario agronómico | `data.js` → const CAL |
| Textos de recomendación | `scoring.js` → buildRecomendacion |
| Credenciales API | `index.html` → cfg-client/cfg-secret |
| Look & feel | `styles.css` |
| Layout de pantallas | `index.html` |
| Cómo se muestran los resultados | `ui.js` |
| Flujo de consulta | `app.js` → consultar() |
| Mapa / geoloc | `map.js` |
