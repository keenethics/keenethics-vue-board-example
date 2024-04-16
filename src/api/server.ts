import type { ProjectSchema } from '@/schemas/project.schema';
import { onSort } from '@/shared/sort';
import type { ChangeOrderPayload, Project } from '@/types/project';
import { delay, http, HttpResponse } from 'msw';
import { setupWorker } from 'msw/browser';

let projects: Project[] = JSON.parse(localStorage.getItem('projects') || '[]');
const persistData = (): void => {
  localStorage.setItem('projects', JSON.stringify(projects));
};
export const worker = setupWorker(
  http.get('/projects', async () => {
    await delay(1000);
    return HttpResponse.json({
      data: projects,
    });
  }),

  http.post<never, ProjectSchema>('/projects', async ({ request }) => {
    await delay(1000);
    const newProjectData = await request.json();
    const maxOrder = projects.reduce(
      (max, project) => Math.max(max, project.order),
      0,
    );
    const newProject: Project = {
      ...newProjectData,
      id: Math.random().toString(16).slice(2),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'active',
      order: maxOrder + 1,
      isFavorite: false,
    };

    projects.push(newProject);
    persistData();
    return HttpResponse.json({
      data: newProject,
    });
  }),
  http.delete<{ id: string }>('/projects/:id', async ({ params }) => {
    await delay(1000);
    const projectId = params.id;
    const index = projects.findIndex((project) => project.id === projectId);
    if (index !== -1) {
      projects.splice(index, 1);
      persistData();
    }
    return HttpResponse.json({ status: 'ok' });
  }),
  http.patch<{ id: string }, Partial<Project>>(
    '/projects/:id',
    async ({ params, request }) => {
      const projectId = params.id;
      const updatedProject = await request.json();
      const index = projects.findIndex((project) => project.id === projectId);
      if (index === -1) {
        return HttpResponse.json(
          { error: 'Project not found' },
          { status: 404 },
        );
      }
      projects[index] = {
        ...projects[index],
        ...updatedProject,
        updatedAt: new Date().toISOString(),
      };
      persistData();
      return HttpResponse.json({ data: projects[index] });
    },
  ),
  http.get<{ id: string }>('/projects/:id', async ({ params }) => {
    const projectId = params.id;
    const project = projects.find((p) => p.id === projectId);
    if (!project) {
      return HttpResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    return HttpResponse.json({ data: project });
  }),
  http.patch<{ id: string }, ChangeOrderPayload>(
    '/projects/:id/order',
    async ({ params, request }) => {
      const payload: ChangeOrderPayload = await request.json();
      const project = projects.find((p) => p.id === params.id);
      if (!project) {
        return HttpResponse.json(
          { error: 'Project not found' },
          { status: 404 },
        );
      }
      projects = onSort(projects, payload);
      persistData();
      return HttpResponse.json({
        status: 'ok',
      });
    },
  ),
);
