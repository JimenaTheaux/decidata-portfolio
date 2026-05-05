# Guía de inicio: nuevo proyecto de cliente

Stack: **Eleventy 2 · Decap CMS v3 · Vercel · GitHub OAuth**

---

## 1. Stack y estructura general

```
proyecto/
├── src/
│   ├── index.njk          # Homepage (todo embebido: HTML + CSS + JS)
│   ├── proyectos.njk      # Página de proyectos/portafolio
│   └── _data/
│       ├── general.json   # Textos y config del sitio
│       └── proyectos/     # Un JSON por proyecto/caso
│           └── nombre-proyecto.json
├── admin/
│   └── index.html         # Panel CMS (Decap CMS, config inline)
├── api/
│   ├── auth.js            # OAuth GitHub → inicia login
│   └── callback.js        # OAuth GitHub → recibe token
├── images/                # Imágenes (logo, mockups, fotos)
├── .eleventy.js           # Config Eleventy
└── vercel.json            # Config deploy
```

**Principio de funcionamiento:**
- Eleventy lee los JSON de `_data/` y genera HTML estático en `_site/`
- Vercel sirve `_site/` y expone las funciones de `api/`
- El cliente edita contenido desde `/admin` (Decap CMS) → hace commit automático a GitHub → Vercel redeploya solo

---

## 2. Secciones disponibles y qué datos necesitás

### HERO (obligatorio)
La primera sección. Hook + propuesta de valor + imagen/mockup.

| Campo | Descripción | Ejemplo |
|-------|-------------|---------|
| `hero_linea1` | Primera parte del título | `"Reemplazamos papel y WhatsApp por un "` |
| `hero_linea2` | Segunda parte (énfasis/acento) | `"sistema que funciona"` |
| `hero_parrafo` | Párrafo descriptivo | `"Te ayudo a transformar..."` |
| `propuesta_texto` | Párrafo bajo el hook de problema | `"Te armo un sistema a medida..."` |
| `cta_h2_p1` | Inicio del hook de problema | `"¿Gestionás en papel"` |
| `cta_h2_em` | Palabra en cursiva del hook | `"WhatsApp?"` |

---

### STATS / INDICADORES (opcional, hasta 4)
Números que generan confianza (proyectos, clientes, tiempo).

| Campo | Descripción | Ejemplo |
|-------|-------------|---------|
| `stat1_num` | Número del indicador 1 | `"+7"` |
| `stat1_label` | Etiqueta del indicador 1 | `"Proyectos entregados"` |
| `stat2_num` | Número 2 | `"10–20días"` |
| `stat2_label` | Etiqueta 2 | `"Tiempo de entrega"` |
| `stat3_num` | Número 3 | `"+15"` |
| `stat3_label` | Etiqueta 3 | `"Personas confiando en nosotros"` |
| `stat4_num` | Número 4 | `"100%"` |
| `stat4_label` | Etiqueta 4 | `"Personalizado"` |

---

### PROPUESTAS / BULLETS (obligatorio, 4 filas)
Tabla de propuesta de valor. "Si X → Y".

| Campo | Descripción | Ejemplo |
|-------|-------------|---------|
| `prop1_negrita` | Situación del cliente (negrita) | `"No tenés sistema"` |
| `prop1_texto` | Solución (texto normal) | `"lo creamos desde cero"` |
| `prop2_negrita` | ... | `"Tenés datos"` |
| `prop2_texto` | ... | `"los hacemos útiles"` |
| `prop3_negrita` | ... | `"Repetís tareas"` |
| `prop3_texto` | ... | `"las automatizamos"` |
| `prop4_negrita` | ... | `"Tu negocio es único"` |
| `prop4_texto` | ... | `"la solución también"` |

---

### PROYECTOS / CASOS (obligatorio, mínimo 1)
Cards de casos de estudio. Cada uno es un JSON en `src/_data/proyectos/`.

**Datos por proyecto:**

| Campo | Widget CMS | Descripción | Ejemplo |
|-------|-----------|-------------|---------|
| `titulo` | string | Nombre del cliente | `"Tu Tiempo Gym"` |
| `tag` | string | Rubro / etiqueta | `"Gimnasio · Sistema de gestión · 2026"` |
| `logo` | image | Logo del cliente | _(subir imagen)_ |
| `mockup` | image | Captura del sistema | _(subir imagen)_ |
| `descripcion` | text | Descripción corta (aparece en card) | `"Sistema de cobros para gimnasio..."` |
| `problema` | text | El dolor del cliente | `"Manejaban todo en papel y WhatsApp..."` |
| `quote` | string | Frase del cliente | `"Ahora sé exactamente quién debe y quién pagó"` |
| `quoteAutor` | string | Quién lo dijo | `"Propietaria, Tu Tiempo Gym"` |
| `solucion` | string | Solución implementada | `"App web con dashboard integrado"` |
| `funcionalidades` | list | Lista de funciones (separadas por Enter en CMS) | `["Registro de pagos", "Alertas de deuda"]` |
| `resultados` | list | Resultados medibles | `["70% menos errores de cobro", "...]` |
| `chips` | list | Tags del card | `["Gimnasio", "Cobros", "Dashboard"]` |
| `resena_texto` | text | Testimonial completo (opcional) | `"Antes tardaba 2 horas en..."` |
| `resena_nombre` | string | Nombre del testimonial | `"Agustina López"` |
| `resena_rol` | string | Rol del testimonial | `"Propietaria"` |
| `destacado` | boolean | ¿Aparece en homepage? | `true` |
| `orden` | number | Orden en homepage (1 = primero) | `1` |

> **En el CMS:** Los campos `funcionalidades`, `resultados` y `chips` son listas. Escribir cada ítem en una línea separada. No usar comas.

---

### SOBRE MÍ / ABOUT (obligatorio)
Sección de presentación personal y propuesta diferencial.

| Campo | Descripción | Ejemplo |
|-------|-------------|---------|
| `acerca_label` | Etiqueta de la sección | `"Sobre deciDATA"` |
| `acerca_h2_p1` | Título línea 1 | `"Sistemas hechos para"` |
| `acerca_h2_p2` | Título línea 2 | `"tu negocio."` |
| `acerca_h2_em` | Título línea 3 (cursiva) | `"No templates genéricos."` |
| `bio1` | Párrafo 1 de bio | `"Trabajo con pymes..."` |
| `bio2` | Párrafo 2 de bio | `"Diseño soluciones simples..."` |
| `card_bio1` | Texto del card de perfil | `"Trabajo con dueños de pymes..."` |
| `card_bio2` | Segunda línea del card | `"Trabajo directo con el cliente..."` |
| `about_tags` | Lista de habilidades/tags | `["Análisis de datos", "Indicadores"]` |
| `nombre` | Nombre completo | `"Jimena Theaux"` |
| `rol` | Rol / cargo | `"Fundadora · deciDATA"` |
| `foto_perfil` | Foto de perfil | _(subir imagen)_ |

---

### TESTIMONIOS / VALORACIONES (opcional, ilimitados)
Carrusel de reseñas. Se cargan desde el campo `resena_*` de cada proyecto.
No requieren datos adicionales en `general.json`. Si el proyecto tiene `resena_texto`, aparece automáticamente.

---

### CTA FINAL / CONTACTO (obligatorio)
Sección de llamada a la acción al final de la página.

| Campo | Descripción | Ejemplo |
|-------|-------------|---------|
| `cta_titulo` | Título del CTA | `"¿Empezamos?"` |
| `cta_sub` | Subtítulo / descripción | `"En una sola reunión identificamos tu necesidad..."` |
| `whatsapp` | Número con código de país, sin + | `"5493525529966"` |
| `whatsapp_display` | Número formateado para mostrar | `"3525-529966"` |

---

### FOOTER
| Campo | Descripción | Ejemplo |
|-------|-------------|---------|
| `footer_copy` | Texto de copyright | `"© 2026 deciDATA"` |

---

## 3. Checklist de datos a recopilar del cliente

```
DATOS BÁSICOS
[ ] Nombre del negocio / marca
[ ] Nombre del responsable (para About)
[ ] Rol / cargo
[ ] Número de WhatsApp (con código de país, sin +)
[ ] Foto de perfil (cuadrada, mínimo 400x400px)
[ ] Logo en PNG con fondo transparente (variante negra o de color)

TEXTOS HERO Y PROPUESTA
[ ] Frase principal del hero (quién sos / qué hacés)
[ ] Párrafo descriptivo (2-3 líneas)
[ ] Hook de problema (¿Gestionás en papel...?)
[ ] 4 bullets de propuesta de valor (situación → solución)

ESTADÍSTICAS (si tiene)
[ ] 4 indicadores con número y etiqueta
    (proyectos, clientes, tiempo de entrega, etc.)

SOBRE MÍ
[ ] Título de la sección
[ ] 2 párrafos de bio
[ ] 2-3 tags de habilidades

POR CADA PROYECTO/CASO
[ ] Nombre del cliente
[ ] Rubro y año
[ ] Logo del cliente (PNG transparente)
[ ] Captura del sistema (mockup o screenshot, 16:9)
[ ] Problema que tenía
[ ] Solución implementada (1 línea)
[ ] Lista de funcionalidades (3-6 ítems)
[ ] Resultados medibles (3 frases cortas)
[ ] Tags del card (3-4 palabras clave)
[ ] Frase/quote del cliente
[ ] Testimonial completo (opcional)
[ ] Nombre y rol de quien da el testimonio
```

---

## 4. Setup inicial del proyecto

### A. Clonar y configurar localmente

```bash
# 1. Clonar el repo de la plantilla o crear uno nuevo en GitHub
git clone https://github.com/JimenaTheaux/decidata-portfolio.git nuevo-cliente
cd nuevo-cliente

# 2. Instalar dependencias
npm install

# 3. Servidor de desarrollo local
npm start
# → http://localhost:8080
```

### B. Personalizar datos del cliente

1. Editar `src/_data/general.json` con todos los datos del cliente
2. Reemplazar imágenes en `images/` (logo, foto perfil)
3. Crear/editar archivos JSON en `src/_data/proyectos/` — uno por caso de estudio
4. Ajustar colores en `src/index.njk` en las variables CSS (`:root`) si el cliente tiene brand colors

**Variables de color a personalizar:**
```css
:root {
  --accent: #469A96;       /* Color principal */
  --accent-light: #E8F4F3; /* Fondo suave del acento */
  --accent-dark: #2D706D;  /* Acento oscuro (textos) */
  --black: #0D0D0D;        /* Texto principal */
}
```

### C. Actualizar referencias al cliente en `admin/index.html`

```js
backend: {
  name: 'github',
  repo: 'usuario/nombre-repo',          // ← cambiar
  branch: 'main',
  base_url: 'https://tu-dominio.vercel.app', // ← cambiar
  auth_endpoint: 'api/auth'
}
```

---

## 5. Deploy en Vercel (paso a paso)

### Requisitos previos
- Repo en GitHub (público o privado)
- Cuenta en Vercel (conectada a GitHub)
- GitHub OAuth App creada

### Pasos

**1. Crear repositorio en GitHub**
```bash
git remote set-url origin https://github.com/usuario/nuevo-repo.git
git push -u origin main
```

**2. Importar en Vercel**
- Ir a vercel.com → Add New → Import Git Repository
- Seleccionar el repo
- Framework Preset: **Other**
- Build Command: `npm run build`
- Output Directory: `_site`
- Install Command: `npm install`
- Clic en Deploy

**3. Crear GitHub OAuth App**
- Ir a GitHub → Settings → Developer settings → OAuth Apps → New OAuth App
- Application name: `[Nombre cliente] CMS`
- Homepage URL: `https://tu-sitio.vercel.app`
- Authorization callback URL: `https://tu-sitio.vercel.app/api/callback`
- Copiar **Client ID** y generar **Client Secret**

**4. Agregar variables de entorno en Vercel**
- Vercel → proyecto → Settings → Environment Variables
```
OAUTH_CLIENT_ID     = (Client ID de GitHub OAuth App)
OAUTH_CLIENT_SECRET = (Client Secret de GitHub OAuth App)
```
- Redeploy desde Vercel (para que tome las variables)

**5. Verificar**
- Ir a `https://tu-sitio.vercel.app/admin`
- Hacer login con GitHub
- Si funciona → ✅ listo

---

## 6. Gestión de contenido (para el cliente)

### Dónde entrar
`https://tu-sitio.vercel.app/admin`

### Qué puede editar
- **Proyectos** → Agregar, editar o borrar casos de estudio
- **Configuración del sitio** → Todos los textos de la homepage (hero, bio, stats, CTA, etc.)

### Cómo subir imágenes
En el CMS, usar el widget de imagen. Se suben directamente a la carpeta `images/` del repo.

### Tiempo de publicación
Los cambios tardan ~1-2 minutos en verse online (Vercel redeploya automáticamente tras cada commit del CMS).

### Conflictos de versión (si edita desde local Y desde el CMS)
```bash
git pull --rebase origin main
# Si hay conflicto en general.json → editar el archivo manualmente y conservar los valores correctos
git add src/_data/general.json
GIT_EDITOR=true git rebase --continue
git push
```

---

## 7. Personalización avanzada (para el dev)

### Agregar una sección nueva

1. Agregar el HTML en `src/index.njk` en el orden correcto
2. Agregar el CSS correspondiente en el mismo archivo (sección `<style>`)
3. Si el contenido es editable: agregar los campos en `src/_data/general.json`
4. Registrar los campos en `admin/index.html` dentro de `collections > configuracion > files > fields`

### Orden de secciones recomendado (lógica problema → solución → prueba → confianza → acción)
```
1. HERO          — hook de problema + propuesta
2. STATS         — indicadores de credibilidad
3. PROYECTOS     — casos reales (prueba)
4. TESTIMONIOS   — valoraciones de clientes (confianza)
5. SOBRE MÍ      — quién está detrás
6. CONTACTO/CTA  — llamada a la acción
```

### Filtros Eleventy disponibles (`_eleventy.js`)
- `proyectos | destacados` → solo proyectos con `destacado: true`
- `proyectos | todos` → todos los proyectos
- `objeto | dump` → JSON stringify (debug)

### Agregar página nueva
1. Crear `src/nueva-pagina.njk`
2. Eleventy la compila automáticamente a `_site/nueva-pagina/index.html`
3. Accesible en `/nueva-pagina`

---

## 8. Checklist de entrega al cliente

```
ANTES DE ENTREGAR
[ ] Todos los textos revisados con el cliente
[ ] Logo correcto en footer y nav (images/logo-cliente.png)
[ ] Foto de perfil cargada
[ ] Al menos 1 proyecto con destacado: true
[ ] WhatsApp probado (botón FAB y CTA)
[ ] Dominio personalizado configurado en Vercel (si aplica)
[ ] Variables de entorno en Vercel correctas
[ ] Login al CMS verificado

DESPUÉS DE ENTREGAR
[ ] Capacitar al cliente en el uso del CMS (/admin)
[ ] Explicar cómo agregar proyectos nuevos
[ ] Explicar que los cambios tardan 1-2 min en verse
[ ] Dejar este archivo como referencia
```

---

## 9. Referencia rápida de archivos

| ¿Qué querés cambiar? | Archivo |
|----------------------|---------|
| Textos de la homepage | `src/_data/general.json` |
| Agregar/editar proyecto | `src/_data/proyectos/nombre.json` |
| Colores del sitio | `src/index.njk` → `:root { --accent: ... }` |
| Estructura de la homepage | `src/index.njk` → sección HTML |
| Estructura de página de proyectos | `src/proyectos.njk` |
| Panel CMS (campos editables) | `admin/index.html` |
| OAuth GitHub | `api/auth.js` y `api/callback.js` |
| Config de deploy | `vercel.json` |
| Config de Eleventy | `.eleventy.js` |
