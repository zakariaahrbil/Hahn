import { api } from "./clients";

export type listProjectType = {
  id: number;
  title: string;
};

export type projectList = listProjectType[];

export type projectType = {
  id: number;
  title: string;
  description: string;
  createdAt: string;
};

export type createProjectType = {
  title: string;
  description: string;
};

const PROJECTS_API = "/projects";

export const getAllProjects = async (page: number): Promise<projectList> => {
  page = page ? page:0;
  try {
    const response = api.get(`${PROJECTS_API}?page=${page}&size=10`);
    const data = (await response).data;
    return data.content;
  } catch (err) {
    throw err;
  }
};
