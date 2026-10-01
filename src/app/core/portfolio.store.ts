import { Injectable, computed, signal } from '@angular/core';
import { HERO_SECTORS, PROJECTS, ProjectId, SKILLS, SkillId } from './portfolio.data';

/**
 * Estado compartido de la página con signals:
 * el hero, el explorador de proyectos, el filtro del stack y el modo inspector
 * se comunican a través de este store.
 */
@Injectable({ providedIn: 'root' })
export class PortfolioStore {
  readonly projects = PROJECTS;
  readonly skills = SKILLS;
  readonly sectors = HERO_SECTORS;

  readonly inspect = signal(false);
  readonly heroIndex = signal(0);
  readonly heroTouched = signal(false);
  readonly projectId = signal<ProjectId>('goods');
  readonly shotIndex = signal(0);
  readonly skillId = signal<SkillId | null>(null);

  readonly heroProject = computed(
    () => PROJECTS.find((p) => p.id === HERO_SECTORS[this.heroIndex()].project)!,
  );

  readonly project = computed(() => PROJECTS.find((p) => p.id === this.projectId())!);

  readonly shot = computed(() => {
    const shots = this.project().shots;
    return shots.length ? shots[Math.min(this.shotIndex(), shots.length - 1)] : null;
  });

  readonly skill = computed(() => SKILLS.find((s) => s.id === this.skillId()) ?? null);

  readonly projectsWithSkill = computed(() => {
    const id = this.skillId();
    return id ? PROJECTS.filter((p) => p.skills.includes(id)) : [];
  });

  skillCount(id: SkillId): number {
    return PROJECTS.filter((p) => p.skills.includes(id)).length;
  }

  matchesSkill(id: ProjectId): boolean {
    const skill = this.skillId();
    return !skill || PROJECTS.find((p) => p.id === id)!.skills.includes(skill);
  }

  toggleInspect(): void {
    this.inspect.update((v) => !v);
  }

  nextHero(): void {
    this.heroIndex.update((i) => (i + 1) % HERO_SECTORS.length);
  }

  pickHero(i: number): void {
    this.heroTouched.set(true);
    this.heroIndex.set(i);
  }

  openHeroProject(): void {
    this.heroTouched.set(true);
    this.selectProject(HERO_SECTORS[this.heroIndex()].project);
  }

  selectProject(id: ProjectId): void {
    this.projectId.set(id);
    this.shotIndex.set(0);
  }

  toggleSkill(id: SkillId): void {
    this.skillId.update((current) => (current === id ? null : id));
  }
}
