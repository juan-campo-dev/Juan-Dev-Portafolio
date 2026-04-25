# Plan Tecnico De Produccion - Juan Dev

> Documento ACTUALIZADO al estado real del sistema. Refleja lo que ya existe en disco y lo que falta para llegar a `https://juan-dev.app-dev.icu/api/projects` devolviendo JSON.

---

## 0. Donde Esta Cada Cosa

Todo vive ahora dentro del **mismo repo** `Repositorio-main`:

```
Repositorio-main/
├── app/                  <-- Frontend Next.js (App Router)
├── components/           <-- UI (intacta)
├── lib/
├── backend/              <-- Laravel 11 API completa
│   ├── app/
│   ├── routes/api.php
│   ├── database/sql/hostinger_production.sql
│   └── deploy/hostinger/
├── deploy/hostinger/     <-- Scripts de empaquetado frontend
└── plan.md

C:\Users\USUARIO\Desktop\proyectos\
└── deploy-packages/      <-- ZIPs (fuera del repo, no versionados)
    ├── juan-dev-frontend-hostinger.zip
    └── juan-dev-backend-api-hostinger.zip
```

En Hostinger:

- Frontend: `/public_html/juan-dev/`
- Backend Laravel: `/public_html/juan-dev/api/`

---

## 1. Estado Real

### Frontend (`Repositorio-main`) - LISTO

- Next.js 15 + React 19 + TS + Tailwind, diseno intacto.
- `components/sections/projects-section.tsx` consume API con fallback local.
- `lib/tracking.ts` envia eventos a `/api/track-event` sin bloquear UX.
- `next.config.mjs` soporta `STATIC_EXPORT=true` para Hostinger compartido.
- Build estatico verificado, ZIP generado.

### Backend (`backend/`) - LISTO LOCAL, FALTA SUBIR

- Laravel 11.51 + PHP 8.4 + Sanctum 4.3.
- Modelos: `Project`, `Certificate`, `TrackEvent`, `User`.
- Migraciones: `users`, `personal_access_tokens`, `projects`, `certificates`, `track_events`.
- Controllers API: `ProjectController`, `CertificateController`, `TrackEventController`.
- Resources JSON: `ProjectResource`, `CertificateResource`.
- Seeders: 16 proyectos reales + 15 certificados.
- Rutas API en `routes/api.php`:
  - `GET /api/health`
  - `GET /api/projects`
  - `GET /api/projects/{slug}`
  - `GET /api/certificates`
  - `POST /api/track-event`
  - `GET /api/user` (auth:sanctum)
- CORS configurado para `https://juan-dev.app-dev.icu`.
- SQL listo: `database/sql/hostinger_production.sql`.
- Tests 2/2 PASS, Pint PASS.
- ZIP con `vendor/` --no-dev empaquetado.

### Hostinger - PENDIENTE

- DB MySQL creada y VACIA: `u201159527_juandev`.
- Subdominio `juan-dev.app-dev.icu` apuntando a `/public_html/juan-dev`.
- Falta: subir backend ZIP, importar SQL, crear `.env`, probar `/api/projects`.

---

## 2. Hito Actual: PRIMERA VICTORIA

```
https://juan-dev.app-dev.icu/api/projects -> JSON con 16 proyectos
```

---

## 3. Deploy Backend a Hostinger (HACER AHORA)

### 3.1 Subir el ZIP via File Manager / FTP

1. Hostinger File Manager (o WinSCP) -> ir a `/home/u201159527/domains/app-dev.icu/public_html/juan-dev/`.
2. Crear carpeta `api/` si no existe.
3. Subir `C:\Users\USUARIO\Desktop\proyectos\deploy-packages\juan-dev-backend-api-hostinger.zip` dentro de `api/`.
4. Extraer ahi mismo. Estructura esperada:

```
public_html/juan-dev/api/
├── app/
├── bootstrap/
├── config/
├── database/
├── public/          <-- aqui esta index.php de Laravel
├── routes/
├── storage/
├── vendor/          <-- ya viene instalado --no-dev
├── artisan
├── composer.json
└── .htaccess        <-- redirige /api/* a public/index.php
```

NO subir: `node_modules`, `tests/`, `.git`, `.env` local, `database/database.sqlite`.

5. Borrar el ZIP del servidor despues de extraer.

### 3.2 Crear `.env` en Hostinger (NUNCA en git)

En File Manager, crear `/public_html/juan-dev/api/.env`. Pega tu password real envuelta en comillas dobles porque tiene `$`:

```env
APP_NAME="Juan Dev API"
APP_ENV=production
APP_KEY=
APP_DEBUG=false
APP_URL=https://juan-dev.app-dev.icu/api

LOG_CHANNEL=daily
LOG_LEVEL=error

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=u201159527_juandev
DB_USERNAME=u201159527_juandev
DB_PASSWORD="TU_PASSWORD_AQUI"

SESSION_DRIVER=database
SESSION_LIFETIME=120
SESSION_DOMAIN=.app-dev.icu

CACHE_STORE=file
QUEUE_CONNECTION=sync

SANCTUM_STATEFUL_DOMAINS=juan-dev.app-dev.icu
FRONTEND_URL=https://juan-dev.app-dev.icu

TRACK_IP_HASH_SALT=cambia-esto-por-algo-largo-y-aleatorio
```

> La contrasena que pegaste en el chat quedo expuesta. Recomiendo rotarla en Hostinger -> Bases de datos.

### 3.3 Generar APP_KEY

Opcion sin SSH (en tu PC):

```powershell
cd C:\Users\USUARIO\Desktop\proyectos\Repositorio-main\backend
php artisan key:generate --show
```

Copia el `base64:...` y pegalo en `APP_KEY=` del `.env` en Hostinger.

Con SSH:

```bash
cd ~/domains/app-dev.icu/public_html/juan-dev/api
php artisan key:generate --force
```

### 3.4 Importar SQL en phpMyAdmin

1. Hostinger -> Bases de datos -> phpMyAdmin -> entrar a `u201159527_juandev`.
2. Pestana **Importar**.
3. Subir `C:\Users\USUARIO\Desktop\proyectos\Repositorio-main\backend\database\sql\hostinger_production.sql`.
4. Ejecutar. Crea tablas + inserta 16 proyectos + 15 certificados.

### 3.5 Permisos

Via File Manager -> Permisos:

- `storage/` y subcarpetas: `775`
- `bootstrap/cache/`: `775`

### 3.6 Probar

1. `https://juan-dev.app-dev.icu/api/health` -> `{"status":"ok"}`
2. `https://juan-dev.app-dev.icu/api/projects` -> array JSON con 16 proyectos.

Si responde JSON: **PRIMERA VICTORIA REAL**.

---

## 4. Errores Comunes Y Solucion

### 500 Internal Server Error

- Ver `storage/logs/laravel.log` en File Manager.
- Causas: `APP_KEY` vacio, permisos `storage/` mal (debe ser 775), `.env` con sintaxis rota.

### 404 en `/api/...`

- Falta `.htaccess` en `/public_html/juan-dev/api/`.
- Verificar `/public_html/juan-dev/api/public/.htaccess` (default Laravel).

### DB no conecta

- En Hostinger usa `DB_HOST=127.0.0.1` (no `localhost`).
- Probar credenciales en phpMyAdmin manualmente.
- Password con `$` debe ir en comillas dobles en `.env`.

### CORS bloqueado

- `config/cors.php` ya permite `https://juan-dev.app-dev.icu`. Si cambias dominio, edita y resube.

---

## 5. Siguiente Bloque (DESPUES de ver JSON)

1. Subir frontend ZIP a `/public_html/juan-dev/` con `.env.production`.
2. Validar que `projects-section.tsx` consume endpoint real.
3. MongoDB Atlas para metricas.
4. Panel admin con Sanctum.

---

## 6. Comandos Utiles

```powershell
# Reempaquetar backend
cd C:\Users\USUARIO\Desktop\proyectos\Repositorio-main\backend
.\deploy\hostinger\package-backend.ps1

# Reempaquetar frontend
cd C:\Users\USUARIO\Desktop\proyectos\Repositorio-main
.\deploy\hostinger\package-frontend.ps1

# Generar APP_KEY sin tocar .env local
cd C:\Users\USUARIO\Desktop\proyectos\Repositorio-main\backend
php artisan key:generate --show
```
