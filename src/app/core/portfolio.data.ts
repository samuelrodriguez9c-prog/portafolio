export type SkillId =
  | 'angular'
  | 'ts'
  | 'scss'
  | 'nest'
  | 'rest'
  | 'ws'
  | 'pg'
  | 'mysql'
  | 'primeng'
  | 'material'
  | 'tailwind'
  | 'jwt';

export type ProjectId = 'goods' | 'banku' | 'agrico' | 'terraza';

export interface Shot {
  src: string;
  /** clave i18n de la etiqueta corta (pestaña) */
  label: string;
  kind: 'image' | 'video';
  /** imagen que se ve mientras carga el video */
  poster?: string;
  /** versión WebM de respaldo para navegadores sin H.264 */
  webm?: string;
}

/** Atajo para declarar un video: projects/<name>.mp4 + .webm, con portada <name>.jpg. */
const video = (name: string, label: string): Shot => ({
  kind: 'video',
  src: `projects/${name}.mp4`,
  webm: `projects/${name}.webm`,
  poster: `projects/${name}.jpg`,
  label,
});

export interface ProjectLink {
  /** clave i18n */
  label: string;
  href: string;
}

export interface Project {
  id: ProjectId;
  num: string;
  name: string;
  /** cantidad de puntos en "Lo que construí" (projects.<id>.built.<n>) */
  builtCount: number;
  stack: string[];
  skills: SkillId[];
  shots: Shot[];
  links: ProjectLink[];
  /** clave i18n opcional para el backend privado */
  lock?: string;
  /** sin capturas: carpetas reales del proyecto para mostrar su estructura */
  tree?: { root: string; items: string[] };
}

export interface Skill {
  id: SkillId;
  label: string;
}

export interface LogEntry {
  /** clave i18n base: timeline.<key>.{date,title,body} */
  key: string;
  tag: string;
  head?: boolean;
  root?: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: 'goods',
    num: '01',
    name: 'Goods',
    builtCount: 3,
    stack: ['Angular 21', 'NestJS', 'PostgreSQL', 'WebSocket', 'SCSS'],
    skills: ['angular', 'ts', 'nest', 'pg', 'scss', 'ws', 'rest'],
    shots: [
      video('goods-staff', 'shots.staff'),
      video('goods-alta', 'shots.signup'),
      video('goods-asistente', 'shots.assistant'),
      video('goods-login', 'shots.login'),
    ],
    links: [
      { label: 'links.frontendCode', href: 'https://github.com/samuelrodriguez9c-prog/goods-frontend' },
    ],
    lock: 'links.privateBackend',
  },
  {
    id: 'banku',
    num: '02',
    name: 'Bankú',
    builtCount: 4,
    stack: ['Angular', 'PrimeNG', 'SCSS', 'REST'],
    skills: ['angular', 'ts', 'scss', 'primeng', 'rest'],
    shots: [
      video('banku-mega-menu', 'shots.megaMenu'),
      video('banku-simulador', 'shots.simulator'),
      video('banku-inicio', 'shots.home'),
      video('banku-login', 'shots.login'),
    ],
    links: [{ label: 'links.live', href: 'https://www.banku.com.co' }],
  },
  {
    id: 'agrico',
    num: '03',
    name: 'Agrico',
    builtCount: 3,
    stack: ['Angular', 'SCSS', 'REST · Laravel'],
    skills: ['angular', 'ts', 'scss', 'rest'],
    shots: [
      video('agrico-inicio', 'shots.home'),
      video('agrico-catalogo', 'shots.catalog'),
      video('agrico-checkout', 'shots.checkout'),
      video('agrico-login', 'shots.login'),
    ],
    links: [{ label: 'links.live', href: 'https://agricosas.com.co' }],
  },
  {
    id: 'terraza',
    num: '04',
    name: 'Mi Terraza',
    builtCount: 3,
    stack: ['Angular 17', 'Material', 'Tailwind', 'NestJS', 'MySQL'],
    skills: ['angular', 'ts', 'nest', 'mysql', 'tailwind', 'material', 'ws', 'jwt', 'rest'],
    shots: [],
    links: [{ label: 'links.code', href: 'https://github.com/Isaito05/mi_terraza_vista' }],
    tree: {
      root: 'mi_terraza_vista/src/app/features',
      items: ['bodega', 'factura', 'pago', 'pedido', 'prodventa', 'proprov', 'proveedor', 'usuario'],
    },
  },
];

export const SKILLS: Skill[] = [
  { id: 'angular', label: 'Angular' },
  { id: 'ts', label: 'TypeScript' },
  { id: 'scss', label: 'SCSS' },
  { id: 'nest', label: 'NestJS' },
  { id: 'rest', label: 'APIs REST' },
  { id: 'ws', label: 'WebSockets' },
  { id: 'pg', label: 'PostgreSQL' },
  { id: 'mysql', label: 'MySQL' },
  { id: 'primeng', label: 'PrimeNG' },
  { id: 'material', label: 'Angular Material' },
  { id: 'tailwind', label: 'Tailwind' },
  { id: 'jwt', label: 'JWT / Passport' },
];

/** El orden del hero: cada sector apunta a un proyecto. */
export const HERO_SECTORS: { key: string; project: ProjectId }[] = [
  { key: 'hero.sectors.entrepreneurs', project: 'goods' },
  { key: 'hero.sectors.credit', project: 'banku' },
  { key: 'hero.sectors.field', project: 'agrico' },
];

export const TIMELINE: LogEntry[] = [
  { key: 'goods', tag: 'HEAD → main', head: true },
  { key: 'agrico', tag: 'agrico' },
  { key: 'terraza', tag: 'mi-terraza' },
  { key: 'amerika', tag: 'amerika-tis' },
  { key: 'sena', tag: 'init', root: true },
];

export const CONTACT = {
  /** TODO: reemplazar por tu correo y tu perfil real */
  email: 'samuelrodriguez9c@gmail.com',
  linkedin: 'https://www.linkedin.com/in/samuel-rodriguez-782382433',
  github: 'https://github.com/samuelrodriguez9c-prog',
  githubUser: 'samuelrodriguez9c-prog',
  cv: 'cv/Samuel-Rodriguez-CV.pdf',
};
