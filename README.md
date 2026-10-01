# Portafolio — Samuel Rodríguez

Portafolio personal hecho en **Angular 21** (componentes standalone, signals, zoneless) con **Transloco** para español/inglés.

## Correrlo en local

```bash
npm install
npm start          # http://localhost:4200
```

Build de producción:

```bash
npm run build      # sale en dist/portafolio/browser
```

## Estructura

```
src/app/
  core/
    portfolio.data.ts     ← proyectos, stack, trayectoria y datos de contacto
    portfolio.store.ts    ← estado compartido con signals (hero, explorador, filtro, inspector)
    language.service.ts   ← idioma activo (ES/EN), se guarda en localStorage
  layout/nav              ← barra superior, modo Inspeccionar y selector de idioma
  sections/
    hero                  ← nombre, sectores rotativos y vista previa + cinta de tecnologías
    projects              ← explorador de proyectos con pestañas de capturas
    timeline              ← trayectoria estilo git log
    stack                 ← tecnologías que filtran el explorador
    contact               ← formulario (abre el correo con el mensaje armado) + footer
  shared/
    inspect-tag.ts        ← etiqueta azul del modo inspector
    reveal.directive.ts   ← animación al entrar en pantalla
public/
  i18n/es.json, en.json   ← todos los textos
  projects/               ← capturas de los proyectos
  cv/                     ← aquí va el CV en PDF
```

## Pendientes antes de publicar

- [x] Correo y LinkedIn reales en `CONTACT` (`src/app/core/portfolio.data.ts`).
- [x] CV en PDF en `public/cv/Samuel-Rodriguez-CV.pdf`.
- [x] Línea de Amerika TIS en `timeline.amerika.body` (`public/i18n/es.json` y `en.json`).
- [ ] Video o captura de Mi Terraza: guardarlo en `public/projects/` y agregarlo en `shots` del proyecto `terraza`.

## Agregar o editar un proyecto

1. Agrega el objeto en `PROJECTS` (`portfolio.data.ts`) con sus `skills` y `shots`.
2. Agrega sus textos en `projects.<id>` de los dos archivos de `public/i18n/`.

## Videos de los proyectos

Cada pestaña del explorador puede ser imagen o video (`kind: 'image' | 'video'`).
Para un video, deja en `public/projects/` el `nombre.mp4`, su versión `nombre.webm` y su portada `nombre.jpg`, y agrégalo con `video('nombre', 'shots.clave')`.
Los videos se reproducen solos, sin sonido y en bucle, y se pausan al salir de pantalla.

Para convertir una grabación (recorta del segundo 10 al 30, la acelera 1.5x y la deja liviana):

```bash
ffmpeg -ss 10 -to 30 -i grabacion.mp4 -an -vf "setpts=PTS/1.5,fps=30,scale=1280:-2" \
  -c:v libx264 -crf 30 -pix_fmt yuv420p -movflags +faststart public/projects/nombre.mp4
ffmpeg -i public/projects/nombre.mp4 -c:v libvpx-vp9 -b:v 0 -crf 40 -deadline realtime -cpu-used 8 -an public/projects/nombre.webm
ffmpeg -ss 1 -i public/projects/nombre.mp4 -frames:v 1 -q:v 4 public/projects/nombre.jpg
```

## Publicar en Vercel

1. Sube el repo a GitHub.
2. En vercel.com → **Add New Project** → importa el repo.
3. Vercel detecta Angular solo. Si pregunta: build `npm run build`, output `dist/portafolio/browser`.
