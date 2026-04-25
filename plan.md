# Plan Tecnico De Produccion - Juan Dev

Este documento guia la evolucion del portafolio Juan Dev desde frontend terminado hacia sistema completo con Laravel, MySQL, metricas y panel admin. La regla principal es conservar el diseno actual del frontend y construir alrededor de el.

## 0. Estado Actual

- Frontend listo: Next.js 15 + React 19 + TypeScript + Tailwind.
- Diseno terminado: no se modifica UI, clases Tailwind ni componentes visuales salvo orden expresa.
- Datos actuales: proyectos y certificados cargados localmente como fallback.
- Backend: repo creado, aun vacio.
- Produccion objetivo: Hostinger compartido.
- Arquitectura final en hosting:
  - Frontend: `/public_html/juan-dev`
  - Backend Laravel/API: `/public_html/juan-dev/api`
- Comunicacion esperada:
  - Browser carga `https://juan-dev.app-dev.icu`.
  - Frontend consume `https://juan-dev.app-dev.icu/api/api/...` si Laravel queda dentro de `/api/public` expuesto como backend.
  - Alternativa recomendada si Hostinger permite rewrite limpio: `https://juan-dev.app-dev.icu/api/...` apuntando al `public/index.php` de Laravel.

## 1. Instalacion De Skills Vercel

Ejecutar desde la raiz del repo frontend. El CLI real usa el formato `owner/repo@skill`. Para este proyecto se instalan en alcance de proyecto para GitHub Copilot, Claude Code y agentes compatibles mediante `.agents/skills` y `.claude/skills`.

### Comandos Exactos

```powershell
npx --yes skills add vercel-labs/agent-skills@vercel-react-best-practices -y --copy --agent claude-code amp
npx --yes skills add vercel-labs/agent-skills@vercel-composition-patterns -y --copy --agent claude-code amp
npx --yes skills add sickn33/antigravity-awesome-skills@nextjs-best-practices -y --copy --agent claude-code amp
npx --yes skills add vercel-labs/vercel-plugin@nextjs -y --copy --agent claude-code amp
npx --yes skills add vercel-labs/agent-skills@web-design-guidelines -y --copy --agent claude-code amp
npx --yes skills add vercel-labs/vercel-plugin@shadcn -y --copy --agent claude-code amp
npx --yes skills add yonatangross/orchestkit@ui-components -y --copy --agent claude-code amp
npx --yes skills add vercel/ai@ai-sdk -y --copy --agent claude-code amp
npx --yes skills add vercel/ai-elements@ai-elements -y --copy --agent claude-code amp
npx --yes skills add vercel/workflow@workflow -y --copy --agent claude-code amp
npx --yes skills add sickn33/antigravity-awesome-skills@browser-automation -y --copy --agent claude-code amp
npx --yes skills add vercel-labs/skills@find-skills -y --copy --agent claude-code amp
```

### Comando PowerShell Con Progreso En Color

```powershell
$skills = @(
  "vercel-labs/agent-skills@vercel-react-best-practices",
  "vercel-labs/agent-skills@vercel-composition-patterns",
  "sickn33/antigravity-awesome-skills@nextjs-best-practices",
  "vercel-labs/vercel-plugin@nextjs",
  "vercel-labs/agent-skills@web-design-guidelines",
  "vercel-labs/vercel-plugin@shadcn",
  "yonatangross/orchestkit@ui-components",
  "vercel/ai@ai-sdk",
  "vercel/ai-elements@ai-elements",
  "vercel/workflow@workflow",
  "sickn33/antigravity-awesome-skills@browser-automation",
  "vercel-labs/skills@find-skills"
)

foreach ($skill in $skills) {
  Write-Host "Instalando $skill" -ForegroundColor Cyan
  npx --yes skills add $skill -y --copy --agent claude-code amp
}
```

### Skills Instaladas En El Proyecto

- `vercel-react-best-practices`: mejores practicas React/Next desde Vercel Engineering.
- `vercel-composition-patterns`: patrones de composicion React escalables; equivalente correcto para `vercel-react-patterns`.
- `nextjs-best-practices`: checklist especifico de buenas practicas Next.js.
- `nextjs`: guia oficial Vercel para App Router, Server Components, metadata y rendering.
- `web-design-guidelines`: auditoria visual y accesibilidad; se usa solo para preservar diseno existente.
- `shadcn`: guia oficial para shadcn/ui, util para admin sin romper el UI publico.
- `ui-components`: patrones de componentes UI reutilizables.
- `ai-sdk`: Vercel AI SDK para chatbot/agentes/streaming.
- `ai-elements`: componentes para interfaces IA si el chatbot evoluciona.
- `workflow`: Vercel Workflow para procesos durables y tareas largas.
- `browser-automation`: automatizacion navegador para pruebas visuales y flujos.
- `find-skills`: busqueda de skills nuevas cuando aparezca una necesidad puntual.

### Prioridad Para Este Proyecto

1. `nextjs` + `nextjs-best-practices`: rutas, SSR/ISR, metadata, performance y deploy Next.js.
2. `vercel-react-best-practices`: integrar API y estado sin romper componentes existentes.
3. `vercel-composition-patterns`: patrones limpios para fallback local, loading/error states y datos remotos.
4. `browser-automation`: verificar visualmente que el frontend sigue igual luego de integrar API.
5. `workflow`: dividir tareas grandes en pasos seguros.
6. `web-design-guidelines`: preservar consistencia visual, no redisenar.
7. `shadcn` + `ui-components`: usar componentes existentes correctamente si aparece una pantalla admin.
8. `ai-sdk`: evolucionar chatbot/IA con arquitectura estable.
9. `ai-elements`: UI de IA si se expande el chatbot.
10. `find-skills`: descubrir skills adicionales cuando aparezca una necesidad puntual.

## 2. Fase 1 - Backend Base Laravel

Objetivo: levantar Laravel 11 con MySQL funcionando antes de conectar frontend.

### Comandos Locales

Ejecutar desde `C:\Users\USUARIO\Desktop\proyectos` cuando PHP y Composer esten disponibles.

```powershell
composer create-project laravel/laravel juan-dev-backend "^11.0"
Set-Location juan-dev-backend
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan key:generate
php artisan migrate
php artisan serve
```

### Configuracion `.env`

```env
APP_NAME="Juan Dev API"
APP_ENV=production
APP_KEY=
APP_DEBUG=false
APP_URL=https://juan-dev.app-dev.icu/api

FRONTEND_URL=https://juan-dev.app-dev.icu
SANCTUM_STATEFUL_DOMAINS=juan-dev.app-dev.icu,localhost:3000,127.0.0.1:3000
SESSION_DOMAIN=.app-dev.icu

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=juan_dev
DB_USERNAME=juan_dev_user
DB_PASSWORD=CAMBIAR_EN_HOSTINGER

MONGO_DB_URI=
MONGO_DB_DATABASE=juan_dev_metrics
```

### Archivos Iniciales

- `.env.example`: publicar variables sin secretos.
- `config/cors.php`: permitir `https://juan-dev.app-dev.icu` y `http://localhost:3000`.
- `routes/api.php`: rutas publicas y privadas.
- `app/Models/Project.php`
- `app/Models/Certificate.php`

## 3. Fase 2 - Base De Datos MySQL

Objetivo: persistir proyectos, certificados y usuarios admin.

### Tabla `projects`

Campos:

- `id`: bigint autoincrement.
- `slug`: string unico, indexado.
- `name`: string.
- `description`: text.
- `category`: enum/string (`empresarial`, `personal`, `academico`, `experimental`).
- `client`: string nullable.
- `technologies`: JSON.
- `platforms`: JSON.
- `image`: string nullable.
- `gallery`: JSON nullable.
- `demo_url`: string nullable.
- `github_url`: string nullable.
- `featured`: boolean default false.
- `status`: string default `published` (`draft`, `published`, `archived`).
- `year`: unsigned small integer nullable.
- `sort_order`: unsigned integer default 0.
- `created_at`, `updated_at`.

### Tabla `certificates`

Campos:

- `id`: bigint autoincrement.
- `name`: string.
- `issuer`: string.
- `date`: date nullable.
- `image`: string nullable.
- `credential_url`: string nullable.
- `category`: string nullable.
- `sort_order`: unsigned integer default 0.
- `created_at`, `updated_at`.

### Tabla `users`

Usar tabla base de Laravel. Agregar si hace falta:

- `role`: string default `admin`.
- `is_active`: boolean default true.

### Comandos Para Migraciones

```powershell
php artisan make:model Project -mfs
php artisan make:model Certificate -mfs
php artisan make:migration add_admin_fields_to_users_table --table=users
php artisan migrate
```

### Seeders

- Migrar los 16 proyectos reales desde el frontend a `ProjectSeeder`.
- Migrar los 15 certificados reales a `CertificateSeeder`.
- Crear un usuario admin inicial con password desde `.env`, no hardcodeado.

## 4. Fase 3 - API REST

Objetivo: exponer datos limpios para frontend y panel admin.

### Endpoints Publicos

```http
GET /api/projects
GET /api/projects/{slug}
GET /api/certificates
POST /api/track-event
```

### Endpoints Admin Protegidos

```http
POST /api/auth/login
POST /api/auth/logout
GET /api/admin/projects
POST /api/admin/projects
PUT /api/admin/projects/{id}
DELETE /api/admin/projects/{id}
GET /api/admin/certificates
POST /api/admin/certificates
PUT /api/admin/certificates/{id}
DELETE /api/admin/certificates/{id}
GET /api/admin/metrics/summary
```

### Controllers

```powershell
php artisan make:controller Api/ProjectController --api
php artisan make:controller Api/CertificateController --api
php artisan make:controller Api/TrackEventController
php artisan make:controller Api/AuthController
php artisan make:controller Api/Admin/ProjectController --api
php artisan make:controller Api/Admin/CertificateController --api
php artisan make:controller Api/Admin/MetricsController
```

### Validacion

Usar Form Requests para escritura:

```powershell
php artisan make:request StoreProjectRequest
php artisan make:request UpdateProjectRequest
php artisan make:request StoreCertificateRequest
php artisan make:request UpdateCertificateRequest
php artisan make:request TrackEventRequest
```

### Respuestas JSON

Formato recomendado:

```json
{
  "data": {},
  "meta": {},
  "message": "ok"
}
```

Para listas:

```json
{
  "data": [],
  "meta": {
    "total": 16
  }
}
```

## 5. Fase 4 - Conexion Frontend

Objetivo: cambiar datos hardcodeados por API sin romper produccion.

### Reglas

- No eliminar `projects-data.tsx` hasta que API este estable.
- Usar fallback local si la API falla.
- No cambiar layout ni clases Tailwind de las secciones.
- Mapear respuesta API al shape actual que consumen `ProjectsSection` y `ProjectCard`.

### Variables Frontend

`.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

Produccion:

```env
NEXT_PUBLIC_API_URL=https://juan-dev.app-dev.icu/api/api
```

Si se configura rewrite limpio en Hostinger:

```env
NEXT_PUBLIC_API_URL=https://juan-dev.app-dev.icu/api
```

### Archivos A Tocar

- `lib/api-client.ts`: ya existe wrapper.
- `components/sections/projects-section.tsx`: consumir API manteniendo fallback.
- `components/sections/certificates-section.tsx`: consumir API manteniendo fallback.
- `lib/tracking.ts`: enviar eventos reales cuando backend exista.

## 6. Fase 5 - MongoDB Para Metricas

Objetivo: guardar eventos sin cargar MySQL con analitica.

### Instalacion Backend

```powershell
composer require mongodb/laravel-mongodb
```

### Configuracion `.env`

```env
MONGO_DB_URI=mongodb+srv://USUARIO:PASSWORD@cluster.mongodb.net/?retryWrites=true&w=majority
MONGO_DB_DATABASE=juan_dev_metrics
```

### Coleccion `events`

Campos:

- `type`: `page_view`, `project_view`, `click_github`, `click_demo`, `contact_click`.
- `project_id`: nullable.
- `project_slug`: nullable.
- `ip_hash`: hash irreversible.
- `user_agent`: string recortado.
- `referrer`: nullable.
- `metadata`: objeto opcional.
- `created_at`: datetime.

### Flujo

1. Frontend llama `POST /api/track-event`.
2. Laravel valida `type` y metadata.
3. Laravel hashea IP con `hash_hmac` usando `APP_KEY`.
4. Guarda evento en Mongo.
5. Responde `204 No Content` o `{ "message": "tracked" }`.

## 7. Fase 6 - Panel Admin

Objetivo: administrar contenido sin tocar codigo.

### Ruta

- Frontend admin: `/admin`.
- API protegida: `/api/admin/*`.

### Funciones Minimas

- Login admin con Sanctum.
- CRUD proyectos.
- CRUD certificados.
- Subir imagen principal y galeria.
- Activar/desactivar proyecto.
- Ordenar proyectos por `sort_order`.
- Ver metricas basicas: visitas, clicks, proyectos mas vistos.

### Enfoque Visual

- Funcional primero.
- Usar componentes existentes de `components/ui`.
- No tocar diseno publico del portafolio.
- Mantener admin separado de la experiencia publica.

## 8. Fase 7 - Deploy En Hostinger

Objetivo: publicar sin romper produccion.

### Frontend

Si se mantiene Next SSR, Hostinger compartido puede limitar Node. Opciones:

1. Produccion real recomendada: Vercel para frontend y Hostinger para API.
2. Si debe ser Hostinger compartido: export estatico solo si se acepta perder SSR/API routes de Next.
3. Si Hostinger permite Node en el plan actual: subir build standalone y configurar proceso Node.

El usuario ya definio que el frontend debe vivir en:

```text
/public_html/juan-dev
```

### Backend Laravel

Estructura recomendada:

```text
/public_html/juan-dev/api
  app/
  bootstrap/
  config/
  database/
  public/
    index.php
  routes/
  storage/
  vendor/
  .env
```

Si el document root no puede apuntar a `api/public`, crear rewrite en `/public_html/juan-dev/api/.htaccess` para dirigir a `public/index.php`.

### Variables En Produccion

- `APP_ENV=production`
- `APP_DEBUG=false`
- `APP_URL=https://juan-dev.app-dev.icu/api`
- `FRONTEND_URL=https://juan-dev.app-dev.icu`
- Credenciales MySQL de Hostinger.
- URI Mongo Atlas cuando se active fase de metricas.

### Deploy FTP

1. Construir localmente.
2. Subir frontend a `/public_html/juan-dev`.
3. Subir backend a `/public_html/juan-dev/api`.
4. Ejecutar migraciones si hay SSH disponible.
5. Si no hay SSH, preparar SQL exportable o endpoint temporal protegido para migracion inicial.
6. Verificar:
   - `https://juan-dev.app-dev.icu`
   - `https://juan-dev.app-dev.icu/api/api/projects` o ruta limpia configurada.

## 9. Fase 8 - Escalado

Objetivo: mejorar sin redisenar.

### SEO

- Crear `/projects/[slug]` con metadata dinamica.
- Open Graph por proyecto.
- Sitemap y robots.
- JSON-LD de perfil profesional y proyectos destacados.

### Performance

- Optimizar imagenes reales de proyectos.
- Cachear `GET /api/projects` y `GET /api/certificates`.
- Usar ISR si frontend queda en plataforma compatible.
- Lazy load de componentes pesados 3D/chatbot si impactan LCP.

### Seguridad

- Sanctum para admin.
- Rate limiting para login y tracking.
- Validacion estricta de uploads.
- No exponer stack traces.
- Backups MySQL y export de metricas.

### Observabilidad

- Logs Laravel por errores de API.
- Dashboard admin con metricas agregadas.
- Alertas manuales iniciales por errores 500.

## 10. Orden Real De Ejecucion

1. Verificar PHP, Composer y MySQL local o preparar entorno alterno.
2. Crear backend Laravel.
3. Crear migraciones MySQL.
4. Seeders con proyectos/certificados reales.
5. Implementar `GET /api/projects`.
6. Implementar `GET /api/certificates`.
7. Conectar frontend con fallback.
8. Deploy backend minimo.
9. Deploy frontend conectado.
10. Agregar tracking Mongo.
11. Agregar admin.
12. Agregar SEO avanzado y cache.

## 11. Primer Hito Tecnico

El primer hito real es:

```http
GET /api/projects
```

Debe devolver los 16 proyectos reales desde MySQL y el frontend debe poder mostrarlos sin cambiar su diseno.

Cuando este endpoint funcione en local y produccion, el proyecto deja de ser solo portafolio estatico y pasa a ser sistema con datos reales.
