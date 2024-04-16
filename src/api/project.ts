import type { ProjectSchema } from '@/schemas/project.schema';
import type { ChangeOrderPayload, Project } from '@/types/project';
import axios, { AxiosResponse } from 'axios';

class ProjectService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getProjects(): Promise<Project[]> {
    const response: AxiosResponse<APIResponse<Project[]>> = await axios.get(
      `${this.baseUrl}/projects`,
    );
    return response.data.data;
  }

  async createProject(project: ProjectSchema): Promise<Project> {
    const response: AxiosResponse<APIResponse<Project>> = await axios.post(
      `${this.baseUrl}/projects`,
      project,
    );
    return response.data.data;
  }

  async updateProject(id: string, project: Partial<Project>): Promise<Project> {
    const response: AxiosResponse<APIResponse<Project>> = await axios.patch(
      `${this.baseUrl}/projects/${id}`,
      project,
    );
    return response.data.data;
  }

  async deleteProject(id: string): Promise<void> {
    await axios.delete(`${this.baseUrl}/projects/${id}`);
  }

  async getProjectById(id: string): Promise<Project> {
    const response: AxiosResponse<APIResponse<Project>> = await axios.get(
      `${this.baseUrl}/projects/${id}`,
    );

    return response.data.data;
  }
  async changeProjectOrder(payload: ChangeOrderPayload): Promise<void> {
    await axios.patch(`${this.baseUrl}/projects/${payload.id}/order`, payload);
  }
}

const projectService = new ProjectService('');

export default projectService;
