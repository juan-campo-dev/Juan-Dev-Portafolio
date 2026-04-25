SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'admin',
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`, `tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `projects` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `slug` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `category` varchar(255) NOT NULL,
  `client` varchar(255) DEFAULT NULL,
  `technologies` json NOT NULL,
  `platforms` json DEFAULT NULL,
  `images` json DEFAULT NULL,
  `github_url` varchar(255) DEFAULT NULL,
  `github_private` tinyint(1) NOT NULL DEFAULT 1,
  `demo_url` varchar(255) DEFAULT NULL,
  `demo_private` tinyint(1) NOT NULL DEFAULT 1,
  `demo_soon` tinyint(1) NOT NULL DEFAULT 0,
  `featured` tinyint(1) NOT NULL DEFAULT 0,
  `status` varchar(255) NOT NULL DEFAULT 'published',
  `year` smallint unsigned DEFAULT NULL,
  `sort_order` int unsigned NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `projects_slug_unique` (`slug`),
  KEY `projects_category_index` (`category`),
  KEY `projects_featured_index` (`featured`),
  KEY `projects_status_index` (`status`),
  KEY `projects_sort_order_index` (`sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `certificates` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `issuer` varchar(255) NOT NULL,
  `issued_label` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `highlight` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `credential_url` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'published',
  `sort_order` int unsigned NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `certificates_category_index` (`category`),
  KEY `certificates_status_index` (`status`),
  KEY `certificates_sort_order_index` (`sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `track_events` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  `project_id` bigint unsigned DEFAULT NULL,
  `project_slug` varchar(255) DEFAULT NULL,
  `payload` json DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `track_events_type_index` (`type`),
  KEY `track_events_project_slug_index` (`project_slug`),
  KEY `track_events_created_at_index` (`created_at`),
  KEY `track_events_project_id_foreign` (`project_id`),
  CONSTRAINT `track_events_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT IGNORE INTO `migrations` (`migration`, `batch`) VALUES
('0001_01_01_000000_create_users_table', 1),
('2026_04_25_163414_create_personal_access_tokens_table', 1),
('2026_04_25_170000_create_projects_table', 1),
('2026_04_25_170001_create_certificates_table', 1),
('2026_04_25_170002_create_track_events_table', 1);

INSERT INTO `projects` (`id`, `slug`, `title`, `description`, `category`, `client`, `technologies`, `platforms`, `images`, `github_url`, `github_private`, `demo_url`, `demo_private`, `demo_soon`, `featured`, `status`, `year`, `sort_order`, `created_at`, `updated_at`) VALUES
(1, 'vence-pro', 'Vence Pro 360 — Seguimiento Documental de Flotas', 'Sistema multiplataforma (Web, PWA, APK, EXE + Chatbot WhatsApp) para seguimiento documental de flotas de representantes de ventas en Postobón. Construido con PHP, JavaScript, MySQL, Docker e IA. Procesa flujos críticos para +600 clientes activos.', 'empresarial', 'Postobón / Gaseosas Lux S.A.S.', JSON_ARRAY('PHP','JavaScript','MySQL','Docker','IA'), JSON_ARRAY('web','pwa','apk','exe'), JSON_ARRAY('/images/projects/vence-pro.png','/images/projects/vence-pro-2.png','/images/projects/vence-pro-3.png'), NULL, 1, NULL, 1, 0, 1, 'published', 2025, 1, NOW(), NOW()),
(2, 'luxcontrol', 'LuxControl — Control de Acceso de Personal y Equipos', 'Aplicación Web/PWA/EXE para control de entrada y salida de personal y equipos en planta. Integra flujos administrativos con SAP (anticipos, viáticos, facturas) y Webdox (contratos digitales) automatizando la gestión de RRHH.', 'empresarial', 'Postobón / Gaseosas Lux S.A.S.', JSON_ARRAY('JavaScript','PHP','MySQL'), JSON_ARRAY('web','pwa','exe'), JSON_ARRAY('/images/projects/luxcontrol.png','/images/projects/luxcontrol-2.png'), NULL, 1, NULL, 1, 0, 1, 'published', 2025, 2, NOW(), NOW()),
(3, 'luna-sofia', 'Luna Sofía — ERP Distribuciones (+600 clientes)', 'ERP completo (React + Laravel) con +50 módulos: cartera, comisiones, pedidos, inventarios (+1.700 productos). Auditoría de rutas con Google Maps API, gestión multi-rol (Admin, Vendedor, Repartidor, Cliente) y Chatbot IA. Ventas >$114M mensuales.', 'empresarial', 'Luna Sofía Distribuciones', JSON_ARRAY('React','Laravel','MySQL','Google Maps','IA'), JSON_ARRAY('web','apk'), JSON_ARRAY('/images/projects/luna-sofia.png','/images/projects/luna-sofia-2.png','/images/projects/luna-sofia-3.png'), NULL, 1, NULL, 1, 0, 1, 'published', 2025, 3, NOW(), NOW()),
(4, 'sgi-fermar', 'SGI FERMAR — Sistema de Gestión Integral', 'Sistema de gestión integral con PHP, JavaScript, MySQL y arquitectura MVC. Ciclo completo: requerimientos, modelado relacional, APIs REST y despliegue en producción con Docker. Módulo Python/IA para análisis.', 'empresarial', 'Montajes y Construcciones Fermar S.A.S.', JSON_ARRAY('PHP','JavaScript','MySQL','Python','Docker'), JSON_ARRAY('web'), JSON_ARRAY('/images/projects/sgi-fermar.png','/images/projects/sgi-fermar-2.png'), NULL, 1, NULL, 1, 0, 1, 'published', 2026, 4, NOW(), NOW()),
(5, 'cotizapp', 'CotizaApp — Cotizaciones e Inventario', 'Aplicación web para cotizaciones e inventariado con PHP, JavaScript/React y MySQL. Frontend con Bootstrap y despliegue corporativo. Control de versiones con Git y buenas prácticas de documentación.', 'empresarial', 'Tecniconstrucciones BR S.A.S.', JSON_ARRAY('PHP','React','MySQL','Bootstrap'), JSON_ARRAY('web'), JSON_ARRAY('/images/projects/cotizapp.png','/images/projects/cotizapp-2.png'), NULL, 1, NULL, 1, 0, 0, 'published', 2024, 5, NOW(), NOW()),
(6, 'novedapp', 'Novedapp — Reporte de Novedades Operativas', 'Plataforma para el reporte de novedades operativas en campo con PHP, Vue.js y MySQL. Integración de APIs REST, validaciones con POO y despliegue en servidor de producción.', 'empresarial', 'JPLUMSER Service', JSON_ARRAY('PHP','Vue.js','MySQL'), JSON_ARRAY('web'), JSON_ARRAY('/images/projects/novedapp.png','/images/projects/novedapp-2.png'), NULL, 1, NULL, 1, 0, 0, 'published', 2024, 6, NOW(), NOW()),
(7, 'fleet-app', 'Fleet App — Gestión de Flotas Logísticas', 'Aplicación web para gestión integral de flotas logísticas con React + Laravel + MySQL. Auditoría de rutas en tiempo real con Google Maps API y panel multi-rol.', 'empresarial', 'EasyLogística', JSON_ARRAY('React','Laravel','MySQL','Google Maps'), JSON_ARRAY('web'), JSON_ARRAY('/images/projects/fleet-app.png','/images/projects/fleet-app-2.png'), NULL, 1, 'https://fleet.app-dev.icu', 0, 0, 1, 'published', 2025, 7, NOW(), NOW()),
(8, 'wellmapp', 'Wellmapp — Geolocalizador de Pozos Petroleros', 'App móvil (APK + iOS) offline para geolocalización de +15.000 pozos petroleros y reporte de incidentes en campo. Construida con Python, Flask y geolocalización GPS para uso exclusivo de Ecopetrol.', 'empresarial', 'Ecopetrol', JSON_ARRAY('Python','Flask','HTML5','CSS3'), JSON_ARRAY('apk','ios'), JSON_ARRAY('/images/wellmap.png','/images/wellmap.png'), NULL, 1, NULL, 1, 0, 0, 'published', 2024, 8, NOW(), NOW()),
(9, 'web-tecniconstrucciones', 'Web Tecniconstrucciones — Sitio Corporativo', 'Página web corporativa de Tecniconstrucciones BR con React, Bootstrap y Chatbot IA integrado para atención de clientes potenciales.', 'empresarial', 'Tecniconstrucciones BR S.A.S.', JSON_ARRAY('React','Bootstrap','IA'), JSON_ARRAY('web'), JSON_ARRAY('/images/projects/tecniconstrucciones.png','/images/projects/tecniconstrucciones-2.png'), NULL, 1, NULL, 1, 0, 0, 'published', 2024, 9, NOW(), NOW()),
(10, 'printflow', 'PrintFlow — Plataforma de Gestión de Impresión', 'Plataforma multiplataforma (Web, PWA, APK, EXE) para gestión de flujos de impresión y pedidos. Construida con JavaScript, PHP y MySQL.', 'personal', NULL, JSON_ARRAY('JavaScript','PHP','MySQL'), JSON_ARRAY('web','apk','pwa','exe'), JSON_ARRAY('/images/projects/printflow.png','/images/projects/printflow-2.png'), 'https://github.com/Juan-Campo-developer/printflow', 0, 'https://printflow.app-dev.icu', 0, 0, 1, 'published', 2025, 10, NOW(), NOW()),
(11, 'situr', 'Situr — Sistema Turístico Inteligente', 'Plataforma web turística con HTML, CSS y Python que incluye un Chatbot IA para recomendaciones personalizadas de destinos y rutas.', 'personal', NULL, JSON_ARRAY('HTML5','CSS3','Python','IA'), JSON_ARRAY('web'), JSON_ARRAY('/images/projects/situr.png','/images/projects/situr-2.png'), 'https://github.com/Juan-Campo-developer/situr', 0, NULL, 1, 1, 0, 'published', 2024, 11, NOW(), NOW()),
(12, 'microgreens', 'Microgreens — Cultivos Hidropónicos', 'Sitio web educativo y de gestión para cultivos de microgreens hidropónicos. Construido con HTML, CSS y Flask (Python).', 'personal', NULL, JSON_ARRAY('HTML5','CSS3','Flask','Python'), JSON_ARRAY('web'), JSON_ARRAY('/images/projects/microgreens.png','/images/projects/microgreens-2.png'), 'https://github.com/Juan-Campo-developer/microgreens', 0, NULL, 1, 1, 0, 'published', 2024, 12, NOW(), NOW()),
(13, 'adsonary', 'Adsonary — Diccionario Técnico de Software', 'Diccionario web para aprendices de desarrollo, con búsqueda en tiempo real de términos y ejemplos prácticos. Construido con Node.js, Express y JavaScript usando un CSV como base de datos.', 'personal', NULL, JSON_ARRAY('Node.js','Express','JavaScript'), JSON_ARRAY('web'), JSON_ARRAY('/images/adsonary.png','/images/adsonary.png'), 'https://github.com/Juan-Campo-developer/Adsonary-Diccionario-Tecnico-de-Software', 0, 'https://adsonary.onrender.com/', 0, 0, 0, 'published', 2024, 13, NOW(), NOW()),
(14, 'mallapp', 'Mallapp — Directorio Comercial de Centros Comerciales', 'Aplicación web para directorio interactivo de tiendas, promociones y eventos en centros comerciales. Búsqueda por categorías y mapa interno.', 'personal', NULL, JSON_ARRAY('JavaScript','PHP','MySQL'), JSON_ARRAY('web'), JSON_ARRAY('/images/projects/mallapp.png','/images/projects/mallapp-2.png'), NULL, 0, NULL, 1, 1, 0, 'published', 2024, 14, NOW(), NOW()),
(15, 'votaciones-sena', 'Sistema de Votaciones SENA', 'Sistema web de votaciones electrónicas para representantes de aprendices del SENA. Autenticación segura, conteo en tiempo real y resultados auditables.', 'academico', 'SENA — CIDT Barrancabermeja', JSON_ARRAY('PHP','JavaScript','MySQL','HTML5'), JSON_ARRAY('web'), JSON_ARRAY('/images/projects/votaciones-sena.png','/images/projects/votaciones-sena-2.png'), 'https://github.com/Juan-Campo-developer/votaciones-sena', 0, NULL, 1, 0, 0, 'published', 2024, 15, NOW(), NOW()),
(16, 'tentaapp', 'Tentaapp — Experimento Mobile', 'Aplicación móvil experimental construida como APK para probar flujos de UX y arquitectura cliente-servidor ligera.', 'experimental', NULL, JSON_ARRAY('JavaScript','Node.js'), JSON_ARRAY('apk'), JSON_ARRAY('/images/projects/tentaapp.png','/images/projects/tentaapp-2.png'), NULL, 1, NULL, 1, 1, 0, 'published', 2024, 16, NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `category` = VALUES(`category`), `client` = VALUES(`client`), `technologies` = VALUES(`technologies`), `platforms` = VALUES(`platforms`), `images` = VALUES(`images`), `github_url` = VALUES(`github_url`), `github_private` = VALUES(`github_private`), `demo_url` = VALUES(`demo_url`), `demo_private` = VALUES(`demo_private`), `demo_soon` = VALUES(`demo_soon`), `featured` = VALUES(`featured`), `status` = VALUES(`status`), `year` = VALUES(`year`), `sort_order` = VALUES(`sort_order`), `updated_at` = NOW();

INSERT INTO `certificates` (`id`, `title`, `issuer`, `issued_label`, `category`, `highlight`, `status`, `sort_order`, `created_at`, `updated_at`) VALUES
(1, 'Top 3 Nacional — WorldSkills Colombia 2025', 'WorldSkills Colombia', '2025', 'distinction', 'Tecnologías Web · Estándares internacionales', 'published', 1, NOW(), NOW()),
(2, 'Oracle Database @ AWS Certified Architect Professional', 'Oracle / AWS', 'Dic 2025', 'certification', NULL, 'published', 2, NOW(), NOW()),
(3, 'Diseño de Elementos Vectoriales en Illustrator', 'Adobe', 'Jun 2024', 'certification', NULL, 'published', 3, NOW(), NOW()),
(4, 'Carrera de Desarrollo Full Stack (52 semanas)', 'Coderhouse', 'Sep 2023', 'course', 'Top 10 mejores estudiantes', 'published', 4, NOW(), NOW()),
(5, 'JavaScript', 'Coderhouse · 34h', 'Jul 2022', 'course', NULL, 'published', 5, NOW(), NOW()),
(6, 'React.js', 'Coderhouse · 28h', 'Sep 2022', 'course', NULL, 'published', 6, NOW(), NOW()),
(7, 'Programación Backend', 'Coderhouse · 86h', 'Mar 2023', 'course', NULL, 'published', 7, NOW(), NOW()),
(8, 'Programación con Java', 'Coderhouse · 37h', 'Dic 2022', 'course', NULL, 'published', 8, NOW(), NOW()),
(9, 'Desarrollo Web', 'Coderhouse · 38h', 'May 2022', 'course', NULL, 'published', 9, NOW(), NOW()),
(10, 'Next.js: El framework de React para producción', 'Udemy · 36.5h', 'Mar 2024', 'course', NULL, 'published', 10, NOW(), NOW()),
(11, 'Nest: Desarrollo backend escalable con Node', 'Udemy · 25h', 'Jun 2024', 'course', NULL, 'published', 11, NOW(), NOW()),
(12, 'React: De cero a experto — Hooks y MERN', 'Udemy · 54h', 'Oct 2023', 'course', NULL, 'published', 12, NOW(), NOW()),
(13, 'JavaScript Moderno: Guía para dominar el lenguaje', 'Udemy · 22.5h', 'Sep 2023', 'course', NULL, 'published', 13, NOW(), NOW()),
(14, 'Node: De cero a experto', 'Udemy · 20h', 'May 2023', 'course', NULL, 'published', 14, NOW(), NOW()),
(15, 'Principios SOLID y Clean Code', 'Udemy · 8.5h', 'Nov 2023', 'course', NULL, 'published', 15, NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `issuer` = VALUES(`issuer`), `issued_label` = VALUES(`issued_label`), `category` = VALUES(`category`), `highlight` = VALUES(`highlight`), `status` = VALUES(`status`), `sort_order` = VALUES(`sort_order`), `updated_at` = NOW();

SET FOREIGN_KEY_CHECKS = 1;