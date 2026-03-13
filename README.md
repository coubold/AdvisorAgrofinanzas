# BBVA AgroAdvisor

Asistente de AgroFinanzas — prototipo con sensorización Bold y convenios BBVA.

## Deploy en GitHub Pages (5 minutos)

### Paso 1: Crear el repo

1. Andá a [github.com/new](https://github.com/new)
2. Nombre: `agroadvisor` (o el que quieras)
3. Dejalo **público**
4. **NO** marques "Add a README" (ya tenemos uno)
5. Click **Create repository**

### Paso 2: Subir los archivos

En la página del repo vacío, clickeá **"uploading an existing file"** y arrastrá estos dos archivos:

- `index.html`
- `README.md`

Click **Commit changes**.

### Paso 3: Activar GitHub Pages

1. En el repo, andá a **Settings** → **Pages** (menú lateral)
2. En **Source**, elegí **Deploy from a branch**
3. En **Branch**, elegí `main` y carpeta `/ (root)`
4. Click **Save**

### Paso 4: Esperar 1-2 minutos

GitHub Pages tarda un poco la primera vez. Tu URL va a ser:

```
https://TU-USUARIO.github.io/agroadvisor/
```

Abrí esa URL desde el celu y listo.

### Actualizar después

Cada vez que quieras actualizar, subí el `index.html` nuevo al repo (Upload files → drag → Commit). GitHub Pages se actualiza solo en ~30 segundos.

## Notas

- **CORS**: La API Bold no acepta requests directos desde el browser. El advisor funciona en modo mock (sin detección real) hasta que se implemente un proxy server-side.
- **iOS Safari**: Compatible. El mapa Leaflet y el draw funcionan con touch.
- **Credenciales**: Las credenciales de producción están embebidas en el HTML. Para un deploy real, moverlas a un backend.
