import type { ProjectSchema } from '@/schemas/project.schema';

type ProjectStatus = 'active' | 'archived' | 'deleted';
export interface Project extends ProjectSchema, Resource {
  status: ProjectStatus;
  order: number;
  isFavorite: boolean;
}

export interface ChangeOrderPayload {
  id: string;
  from: number;
  to: number;
}
