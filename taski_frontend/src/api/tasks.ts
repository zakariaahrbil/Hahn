import { api } from "./clients";

export type taskType = {
  id: number;
  title: string;
  description: string;
  state: string;
  deadline: string;
};

export type taskList = taskType[];

export type createTaskType = {
  title: string;
  description: string;
  deadline: string;
};

export type paginatedTasks = {
  tasks: taskList;
  currentPage: number;
  totalPages: number;
  totalElements: number;
};

const TASKS_API = (projectId: number) => `/projects/${projectId}/tasks`;

export const getAllTasks = async (
  projectId: number,
  page: number,
  sort?: string,
  sortDir?: "asc" | "desc",
  search?: string
): Promise<paginatedTasks> => {
  page = page ? page : 0;
  try {
    let url: string;
    if (search) {
      if(sort === "created_at") {
        sort = "createdAt";
      }
      url = `${TASKS_API(projectId)}/search?query=${encodeURIComponent(
        search
      )}&page=${page}&size=9&sort=${sort || "createdAt"},${sortDir || "desc"}`;
    } else {
      url = `${TASKS_API(projectId)}?page=${page}&size=9&sort=${
        sort || "created_at"
      },${sortDir || "desc"}`;
    }
    const response = await api.get(url);
    const data = response.data;
    return {
      tasks: data.content,
      currentPage: data.pageable.pageNumber,
      totalPages: data.totalPages,
      totalElements: data.totalElements,
    };
  } catch (err) {
    throw err;
  }
};

export const createTask = async (
  projectId: number,
  task: createTaskType
): Promise<void> => {
  try {
    await api.post(TASKS_API(projectId), task);
  } catch (err) {
    throw err;
  }
};

export const changeTaskStatus = async (
  projectId: number,
  taskId: number
): Promise<void> => {
  try {
    await api.patch(`${TASKS_API(projectId)}/${taskId}/change-status`);
  } catch (err) {
    throw err;
  }
};

export const deleteTask = async (
  projectId: number,
  taskId: number
): Promise<void> => {
  try {
    await api.delete(`${TASKS_API(projectId)}/${taskId}`);
  } catch (err) {
    throw err;
  }
};
