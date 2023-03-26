const API_URL = 'https://intership-liga.ru';

interface RequestOptions {
  method: 'POST' | 'DELETE' | 'PATCH';
  body?: string;
  headers?: { 'Content-Type': string };
}

interface Task {
  id?: number;
  name: string;
  info: string;
  isImportant: boolean;
}

class BasicAgent {
  constructor(private _apiUrl: string) {}
  fetch = async <T>(url?: string, options?: RequestOptions): Promise<T> | never => {
    const res = await fetch(`${this._apiUrl}${url}`, options);
    if (res.ok) {
      const data = (await res.json()) as T;
      return data;
    } else {
      throw new Error('Произошла ошибка');
    }
  };
}

class TaskAgent extends BasicAgent {
  constructor() {
    super(API_URL);
  }

  getTasks = async (): Promise<Task[] | void> => {
    try {
      const tasks = await this.fetch<Task[]>('/tasks');
      console.log('Получены задачи:', tasks);
    } catch (e) {
      console.log(e);
    }
  };

  readTask = async (taskId: number): Promise<Task | void> => {
    try {
      const task = await this.fetch<Task>(`/tasks/${taskId}`);
      if (Object.keys(task).length) console.log(`Загрузка задачи ${taskId}:`, task);
      if (!Object.keys(task).length) throw new Error(`Загрузка задачи ${taskId}: ошибка, попробуйте другой ID`);
    } catch (e) {
      console.log(`Ошибка при загрузке задачи id${taskId}: ${e}`);
    }
  };

  addTask = async (newTask: Task): Promise<Task | void> => {
    try {
      const postTask = await this.fetch<Task>('/tasks', {
        method: 'POST',
        body: JSON.stringify(newTask),
        headers: { 'Content-Type': 'application/json' },
      });
      if (Object.keys(postTask).length) console.log(`Создана задача id#${postTask.id}:`, postTask);
    } catch (e) {
      console.log(`Ошибка при создании задачи. ${e}`);
    }
  };

  removeTask = async (taskId: number): Promise<void> => {
    try {
      await this.fetch<Task>(`/tasks/${taskId}`, { method: 'DELETE' });
      console.log(`Задача ${taskId} успешно удалена`);
    } catch (e) {
      console.log(`Ошибка при создании удалении задачи id#${taskId}. ${e}`);
    }
  };

  editTask = async (taskId: number, newTask: Task): Promise<Task | void> => {
    try {
      const editTask = await this.fetch<Task>(`/tasks/${taskId}`, {
        method: 'PATCH',
        body: JSON.stringify(newTask),
        headers: { 'Content-Type': 'application/json' },
      });
      if (Object.keys(editTask).length) console.log(`Изменена задача id#${taskId}:`, editTask);
      if (!Object.keys(editTask).length) throw new Error(`Задача id#${taskId} не была изменена`);
    } catch (e) {
      console.log(`Ошибка при изменение задачи id#${taskId}. ${e}`);
    }
  };
}

const TaskAgentInstance = new TaskAgent();

TaskAgentInstance.getTasks();

TaskAgentInstance.addTask({
  name: 'Antis',
  info: `${Date.now().toLocaleString()}`,
  isImportant: false,
});

// TaskAgentInstance.editTask(128, {
//   name: 'Antis123_edited',
//   info: '42_edited',
//   isImportant: true,
// });

TaskAgentInstance.readTask(128);

// TaskAgentInstance.removeTask(128);
