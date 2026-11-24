# Portafolio — Billy Smith Capellán Arciniega

Portafolio estático responsive con **modo claro/oscuro** y **idioma ES/EN**.
HTML + CSS + JavaScript vanilla, sin build ni dependencias de npm.

## Estructura

| Archivo | Función |
| --- | --- |
| `index.html` | Estructura semántica, metadatos SEO/OG y texto bilingual mediante `data-i18n` |
| `style.css` | Tokens de tema oscuro/claro, componentes, responsive y accesibilidad |
| `i18n.js` | Diccionario de interfaz en español e inglés |
| `data.js` | Contenido editable bilingüe: tecnologías, proyectos, trayectoria, CV y disponibilidad |
| `app.js` | Tema, idioma, render data-driven, navegación, drawer y validación |
| `cv/cv-es.pdf`, `cv/cv-en.pdf` | CVs reales en español e inglés, enlazados desde el navbar, hero y footer |
| `favicon.svg` | Identidad B/S |
| `img/` | Retratos y capturas originales de los proyectos |

## Ejecutar en local

Desde esta carpeta:

```powershell
python -m http.server 8000
```

Abre `http://localhost:8000`. También funciona abriendo `index.html` directamente.

## Controles

- **Tema:** botón de luna/sol en el navbar. Se guarda en `localStorage` y respeta
  `prefers-color-scheme` la primera vez.
- **Idioma:** botón `ES`/`EN` en el navbar. Traduce toda la interfaz, los proyectos,
  la trayectoria, los metadatos y los mensajes del formulario. Se guarda en `localStorage`.
- **CV:** los enlaces `ES` y `EN` descargan los PDFs reales.

## Personalización

1. Edita textos de proyectos, tecnologías y trayectoria en `data.js` (campos `{ es, en }`).
2. Edita textos de interfaz en `i18n.js`.
3. `data.profile.availability` está marcado como PROVISIONAL: confírmalo o elimínalo.
4. Los enlaces de repositorio/demo de proyectos siguen sin publicarse; al rellenar
   `repoUrl` y `demoUrl` aparecen automáticamente en el panel de detalles.
5. `og:image` usa ruta relativa: sustitúyela por una URL absoluta al despliegue.

## Notas técnicas y privacidad

- Los PDFs del CV contienen datos personales (documento de identidad, fecha de nacimiento,
  dirección, teléfonos y referencias). Al publicar el sitio, esos archivos serán accesibles
  públicamente. Revisa si deseas versiones públicas sanitizadas.
- Las tarjetas y el panel de detalles usan la misma captura original. El marco de la tarjeta mantiene
  una proporción 16:10 y `object-fit: contain` muestra la imagen completa sin zoom ni recortes.
- El formulario valida y abre `mailto:`; no simula envíos ni guarda datos.
- Las animaciones y el drawer respetan `prefers-reduced-motion`.
- Los logos de tecnologías usan devicon con fallback a monogramas locales.
