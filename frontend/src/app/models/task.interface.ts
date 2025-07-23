export interface Task {
  id: number;
  title: string;
  completed: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CreateTaskDto {
  title: string;
}

export interface UpdateTaskDto {
  title?: string;
  completed?: boolean;
}

export interface TasksResponse {
  data: Task[];
  message?: string;
}

export interface TaskResponse {
  data: Task;
  message?: string;
}
