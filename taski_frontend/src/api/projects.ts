import { data } from "react-router-dom";
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

export type projectProgressType = {
  progressPercentage: number;
  totalTasks: number;
  completedTasks: number;
};

export type paginatedProjects = {
  projects: projectList;
  currentPage: number;
  totalPages: number;
};

const PROJECTS_API = "/projects";

export const getAllProjects = async (
  page: number
): Promise<paginatedProjects> => {
  page = page ? page : 0;
  try {
    const response = await api.get(`${PROJECTS_API}?page=${page}&size=9`);
    const data = response.data;
    return {
      projects: data.content,
      currentPage: data.pageable.pageNumber,
      totalPages: data.totalPages,
    };
  } catch (err) {
    throw err;
  }
};

export const createProject = async (
  project: createProjectType
): Promise<void> => {
  try {
    await api.post(PROJECTS_API, project);
  } catch (err) {
    throw err;
  }
};

export const getProjectById = async (id: number): Promise<projectType> => {
  try {
    const response = await api.get(`${PROJECTS_API}/${id}`);
    return response.data;
  } catch (err) {
    throw data("Project not found", { status: 404 });
  }
};

export const getProjectProgress = async (
  projectId: number
): Promise<projectProgressType> => {
  try {
    const response = await api.get(`${PROJECTS_API}/${projectId}/progress`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const deleteProject = async (id: number): Promise<void> => {
  try {
    await api.delete(`${PROJECTS_API}/${id}`);
  } catch (err) {
    throw err;
  } 
};
