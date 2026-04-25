# Checklist Deploy Hostinger - Juan Dev API

## 1. MySQL En Hostinger

1. hPanel -> Bases de datos -> MySQL.
2. Crear base:
   - Nombre: `u201159527_juan_dev` o el que Hostinger genere.
   - Usuario: `u201159527_juan_dev` o el que Hostinger genere.
   - Password: fuerte, solo en `.env` de producción.
3. Abrir phpMyAdmin.
4. Importar `database/sql/hostinger_production.sql`.
5. Verificar conteos:
   - `projects`: 16
   - `certificates`: 15

## 2. Backend Por FTP

Subir el contenido del backend a:

```txt
/home/u201159527/domains/app-dev.icu/public_html/juan-dev/api
```

No subir:

```txt
.env
database/database.sqlite
node_modules
.git
.idea
.vscode
storage/logs/*.log
```

Copiar `deploy/hostinger/api-root.htaccess` como:

```txt
/public_html/juan-dev/api/.htaccess
```

Crear manualmente este archivo en Hostinger:

```txt
/public_html/juan-dev/api/.env
```

Usar `deploy/hostinger/production.env.example` como base y pegar los datos reales de MySQL.

## 3. Permisos

En File Manager o WinSCP:

```txt
storage                  775
storage/framework        775
storage/logs             775
bootstrap/cache          775
```

Si sale 500:

```txt
storage/logs/laravel.log
```

## 4. Limpiar Cache En Producción


Si Hostinger permite Terminal:

```bash
cd /home/u201159527/domains/app-dev.icu/public_html/juan-dev/api
php artisan optimize:clear
php artisan config:cache
php artisan route:cache
```

Sin SSH: subir el proyecto ya optimizado y borrar manualmente archivos viejos en:

```txt
bootstrap/cache/*.php
```

Luego volver a probar.

## 5. URLs De Validación

```txt
https://juan-dev.app-dev.icu/api/health
https://juan-dev.app-dev.icu/api/projects
https://juan-dev.app-dev.icu/api/projects/vence-pro
https://juan-dev.app-dev.icu/api/certificates
```

Respuesta esperada:

```txt
JSON, status 200, sin HTML de error, sin 500, sin CORS.
```

## 6. Errores Comunes

`500`:

```txt
APP_KEY vacío, .env mal escrito, vendor incompleto, permisos storage/cache, DB incorrecta.
```

`404 en /api/projects`:

```txt
Falta .htaccess en /api o se subió Laravel dentro de /api/api por error.
```

`SQLSTATE Access denied`:

```txt
DB_DATABASE, DB_USERNAME o DB_PASSWORD no coinciden con Hostinger.
```

`CORS`:

```txt
CORS_ALLOWED_ORIGINS debe ser exactamente https://juan-dev.app-dev.icu
```

`419`:

```txt
Para endpoints públicos no aplica CSRF. Si aparece, la ruta quedó en web.php o falta api.php.
```