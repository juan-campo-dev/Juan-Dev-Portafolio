# Checklist Deploy Hostinger - Juan Dev Frontend

## 1. Build Estático

PowerShell desde la raíz del frontend:

```powershell
.\deploy\hostinger\build-static.ps1
```

Salida esperada:

```txt
Compiled successfully
out/
```

## 2. Subir Por FTP

Subir el contenido de `out/` a:

```txt
/home/u201159527/domains/app-dev.icu/public_html/juan-dev
```

No subir:

```txt
.env
.env.local
.next
node_modules
.git
.claude
.agents
skills
skills-lock.json
```

## 3. Verificar Producción

Abrir:

```txt
https://juan-dev.app-dev.icu
```

Checklist navegador:

```txt
Home carga
Proyectos cargan desde API o fallback local
Modal abre sin romper scroll
No hay errores rojos en consola
No hay 404 en /_next/static/*
No hay CORS al pedir /api/projects
```

## 4. Si API Falla

El frontend queda vivo con fallback local.

Revisar:

```txt
NEXT_PUBLIC_API_URL=https://juan-dev.app-dev.icu/api
https://juan-dev.app-dev.icu/api/projects
```

## 5. Si Hay 404 Al Refrescar

Confirmar que existe:

```txt
/public_html/juan-dev/.htaccess
```

Con contenido equivalente a `deploy/hostinger/frontend.htaccess`.