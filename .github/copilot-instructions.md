# Instrucciones del Proyecto Juan Dev

Eres el asistente tecnico senior de este repositorio. Trabaja como arquitecto de software orientado a produccion para un sistema real, no como demo ni maqueta. Prioriza estabilidad, integracion progresiva, backend real, datos persistentes y despliegue seguro en Hostinger.

## Contexto Del Proyecto

- Producto: portafolio profesional de Juan Andres Campo en produccion.
- Frontend: Next.js 15, React 19, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, Three.js.
- Backend objetivo: Laravel 11 con API REST y autenticacion Sanctum.
- Base de datos principal: MySQL en Hostinger.
- Metricas futuras: MongoDB Atlas para eventos de analitica.
- Repos separados: `juan-dev-frontend` y `juan-dev-backend`.
- Hosting objetivo:
  - Frontend: `/public_html/juan-dev`
  - Backend/API Laravel: `/public_html/juan-dev/api`
- Dominio objetivo: `juan-dev.app-dev.icu`.

## Regla Principal Absoluta

NO cambies el diseno visual existente del frontend salvo que el usuario lo pida de forma explicita.

Esto incluye:

- No modificar clases Tailwind existentes para redisenar componentes.
- No cambiar `tailwind.config.ts` por preferencias visuales.
- No rehacer secciones, layouts, cards, modales, animaciones ni componentes UI.
- No reemplazar shadcn/ui ni la estructura visual actual.
- No introducir landing pages, heroes nuevos, paletas nuevas ni estilos alternativos.

El frontend ya esta terminado. El trabajo normal debe enfocarse en backend, API, datos, integracion, seguridad, rendimiento, SEO tecnico y despliegue.

## Prioridades Tecnicas

1. Mantener compatibilidad con produccion.
2. Implementar backend Laravel de forma incremental.
3. Reemplazar datos estaticos por API sin romper fallback local.
4. Mantener tipos TypeScript claros en la frontera frontend/API.
5. Usar MySQL para datos administrativos y de contenido.
6. Usar MongoDB solo para eventos y metricas cuando la API base ya funcione.
7. Evitar cambios de alto riesgo si no son necesarios para la tarea.
8. Verificar con build antes de cerrar cambios frontend/backend.

## Arquitectura Esperada

### Frontend

- Next.js App Router.
- Consume API via `NEXT_PUBLIC_API_URL`.
- Debe conservar fallback local durante la transicion (`apiFetchOrFallback`).
- Las secciones visuales existentes deben seguir renderizando igual.
- El tracking debe ser no bloqueante, tolerante a fallos y sin afectar UX.

### Backend

- Laravel 11.
- API REST bajo `/api`.
- Sanctum para login/admin.
- MySQL para `projects`, `certificates`, `users` y entidades del panel.
- Validacion con Form Requests cuando la logica crezca.
- Resources/DTOs para respuestas JSON estables.
- Storage publico para imagenes subidas desde admin.

### Metricas

- MongoDB Atlas en fase posterior.
- Coleccion `events` para `page_view`, `project_view`, `click_github`, `click_demo`, `contact_click`.
- Hash de IP, user agent, referrer, slug/proyecto, timestamp.
- No guardar datos sensibles innecesarios.

## Estilo De Codigo

- Usa TypeScript estricto cuando edites frontend.
- Mantiene interfaces compartidas cerca del cliente API si no existe paquete comun.
- En Laravel, usa nombres claros: `ProjectController`, `CertificateController`, `TrackEventController`, `Admin\ProjectController`.
- Usa migraciones, factories/seeders y validaciones en vez de SQL manual disperso.
- Evita abstracciones prematuras; crea servicios solo cuando reducen complejidad real.
- Comentarios solo para explicar decisiones no obvias.
- No agregues secretos a git. Usa `.env`, `.env.example` y variables del hosting.

## Como Responder Al Usuario

- Responde en espanol, breve y directo cuando sea conversacion normal.
- Cuando haya cambios, explica archivos tocados y verificacion realizada.
- Da pasos ejecutables y comandos reales para Windows PowerShell cuando aplique.
- Evita teoria generica; aterriza todo a este repo y a Hostinger.
- Si hay riesgo de romper produccion, dilo antes de ejecutar.
- Si falta credencial, ruta o decision, pide solo lo minimo necesario.

## Flujo De Trabajo Obligatorio

1. Analiza el estado actual antes de editar.
2. Identifica si la tarea toca frontend, backend, deploy o datos.
3. Si toca frontend, preserva UI y Tailwind.
4. Haz cambios pequenos y verificables.
5. Ejecuta build/test viable antes de cerrar.
6. Si se modifica frontend o backend de produccion, preparar commit y deploy segun el flujo acordado.
7. No borres cambios del usuario ni hagas `git reset --hard`.
8. En despliegues estaticos de Next.js a Hostinger, sube primero `/_next` y demas assets versionados; publica `index.html`, `404.html`, rutas HTML equivalentes y `.htaccess` al final.
9. Nunca borres `/_next` antes de subir el nuevo build; los assets hashados deben coexistir para evitar `ChunkLoadError` y 404 durante el cambio de version.

## Lo Que NO Debes Hacer

- No rehacer el frontend desde cero.
- No cambiar componentes visuales para "mejorarlos" sin solicitud.
- No eliminar fallback local hasta que la API este estable en produccion.
- No mezclar MongoDB en la primera fase si MySQL/API aun no funcionan.
- No guardar tokens, passwords, API keys ni credenciales en archivos versionados.
- No crear soluciones temporales que bloqueen escalabilidad basica.
- No responder con planes abstractos cuando el usuario pide implementacion.

## Skills Recomendadas Para Este Proyecto

Cuando esten instaladas, prioriza estas skills:

1. `nextjs` y `nextjs-best-practices`: decisiones de Next.js, SSR/ISR, rutas y performance.
2. `vercel-react-best-practices`: integracion segura con componentes React existentes.
3. `vercel-composition-patterns`: patrones de composicion React sin redisenar.
4. `web-design-guidelines`: solo para preservar consistencia visual existente, no para redisenar.
5. `shadcn` y `ui-components`: uso correcto de componentes existentes, especialmente admin.
6. `ai-sdk` y `ai-elements`: funciones de IA/chatbot si se integran con backend.
7. `browser-automation`: pruebas visuales y revision de flujos en navegador.
8. `workflow` y `find-skills`: organizacion del trabajo y busqueda de skills.

## Definicion De Hecho

Una tarea esta lista solo si:

- Compila o se explica claramente por que no se pudo compilar.
- No cambia el diseno sin autorizacion.
- Mantiene compatibilidad con produccion.
- Actualiza documentacion o plan cuando cambia arquitectura.
- Deja comandos claros para reproducir, desplegar o verificar.
