import { FaReact, FaNodeJs, FaPython, FaPhp, FaDatabase } from "react-icons/fa";
import { SiMysql, SiJavascript, SiHtml5, SiCss3, SiExpress, SiNextdotjs } from "react-icons/si";

export const PROJECTS = [
  {
    title: "WellMap - Geolocalizador de Pozos",
    description:
      "Aplicación móvil offline para la geolocalización de pozos petroleros y el reporte de incidentes en campo. Desarrollada con HTML, CSS, JavaScript, Python y MySQL, empaquetada como APK para uso exclusivo de la empresa de Ecopetrol.",
    images: [
      "/images/wellmap.png",
      "/images/wellmap.png",
      "/images/wellmap.png",
      "/images/wellmap.png",
    ],
    techs: [<SiHtml5 />, <SiCss3 />, <SiJavascript />, <FaPython />, <SiMysql />],
    githubUrl: undefined,
    githubPrivate: true,
    demoUrl: undefined,
    demoPrivate: true,
    demoSoon: false,
  },
  {
    title: "Adsonary - Diccionario Técnico de Software",
    description:
      "Un diccionario web para aprendices de desarrollo de software, con búsqueda en tiempo real de términos y ejemplos prácticos. Desarrollado con Node.js, Express y JavaScript, usando un archivo CSV como base de datos.",
    images: [
      "/images/adsonary.png",
      "/images/adsonary.png",
      "/images/adsonary.png",
    ],
    techs: [<FaNodeJs />, <SiExpress />, <SiJavascript />],
    githubUrl: "https://github.com/Juan-Campo-developer/Adsonary-Diccionario-Tecnico-de-Software",
    demoUrl: "https://adsonary.onrender.com/",
    githubPrivate: false,
    demoPrivate: false,
    demoSoon: false,
  },
  {
    title: "Motor Sys 360 - Sistema de Rubros y Contabilidad",
    description:
      "Sistema web privado para gestionar rubros contables y reportes de consumo, enfocado en empresas de transporte. Desarrollado con Python, HTML, CSS y JavaScript. Incluye autenticación, generación de reportes, y funcionalidades offline como PWA. Conectado a base de datos SQL.",
    images: [
      "/images/motorsys.png",
      "/images/motorsys.png",
      "/images/motorsys.png",
    ],
    techs: [<FaPython />, <SiHtml5 />, <SiCss3 />, <SiJavascript />, <SiMysql />],
    githubUrl: "https://github.com/Juan-Campo-developer/Motor-Sys-360-Sistema-de-Rubros-y-Contabilidad",
    demoUrl: undefined,
    githubPrivate: false,
    demoPrivate: true,
    demoSoon: false,
  },
  {
    title: "ContaFlow - Sistema de Facturación Avanzado",
    description:
      "Plataforma web desarrollada en PHP puro para la gestión de facturación empresarial. Permite crear, editar y consultar facturas, generar reportes contables y asegurar el acceso mediante autenticación robusta. Diseñada como un servicio disponible para empresas, con interfaz moderna y conexión a base de datos SQL.",
    images: [
      "/images/contaFlow.png",
      "/images/contaFlow.png",
      "/images/contaFlow.png",
    ],
    techs: [<FaPhp />, <SiHtml5 />, <SiCss3 />, <SiMysql />],
    githubUrl: "https://github.com/Juan-Campo-developer/ContaFlow-Sistema-de-Facturacion-Avanzado",
    demoUrl: undefined,
    githubPrivate: false,
    demoPrivate: false,
    demoSoon: true,
  },
];
