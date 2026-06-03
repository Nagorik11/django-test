# Solución: Error "Failed: root directory not found"

## El Problema

```
2026-06-03T00:16:33.915Z	Failed: root directory not found
```

Esto significa que Cloudflare Pages no puede encontrar el **Root directory** configurado.

## ¿Dónde está el problema?

En tu configuración de Cloudflare Pages, el campo **"Root directory"** está mal.

### ❌ INCORRECTO:
- `distill_site`
- `/distill_site`
- `distill_site/`
- Cualquier ruta específica

### ✅ CORRECTO:
- **VACÍO** (dejar en blanco)
- O poner: `/`

## Cómo Corregirlo en el Dashboard

### Paso 1: Entra al Dashboard
1. Abre https://dash.cloudflare.com
2. Ve a **Pages**
3. Abre tu proyecto `django-testing`

### Paso 2: Abre Build Settings
1. Click en **Settings** (en la parte superior)
2. Click en **Builds & Deployments** (en el menú izquierdo)
3. Busca la sección **Build settings**

### Paso 3: VERIFICA estos campos EXACTAMENTE

| Campo | Valor Correcto | Nota |
|-------|-----------------|------|
| **Root directory** | **(VACÍO)** | ⚠️ Este es el problema |
| **Framework preset** | `None` | Debe ser None |
| **Build command** | `cd distill_site && pipenv install && pipenv run python manage.py distill-local ../public --collectstatic --force` | Copia exactamente |
| **Deploy command** | **(VACÍO)** | Déjalo vacío |
| **Build output directory** | `public` | Importante |

### Paso 4: Si el campo "Root directory" tiene algo...
1. Haz click en el campo
2. **Borra todo lo que haya**
3. Déjalo completamente **VACÍO**
4. Click en **Save**

### Paso 5: Dispara un nuevo Build
Desde tu terminal local:
```bash
cd /workspaces/django-test
git add .
git commit -m "Trigger rebuild - fix root directory"
git push origin main
```

## Verificación Manual

Si quieres verificar que el comando de build funciona, ejecuta esto localmente:

```bash
cd /workspaces/django-test
cd distill_site && pipenv install && pipenv run python manage.py distill-local ../public --collectstatic --force
```

Debería ver: `Site generation complete.`

## Si AÚN sigue fallando

Contáctame con una captura de pantalla del dashboard mostrando:
- El campo "Root directory" 
- El campo "Build command"
- El campo "Build output directory"

## Variables de Entorno (Si las necesitas)

Si Django necesita variables especiales, en Cloudflare Pages puedes agregar:

1. Click en **Environment variables** (en Build settings)
2. Agrega si es necesario:
   - **Name:** `DJANGO_SETTINGS_MODULE`
   - **Value:** `distill_site.settings`

Pero probablemente no las necesites.
