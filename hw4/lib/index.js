"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const API_URL = 'https://intership-liga.ru';
class BasicAgent {
    constructor(_apiUrl) {
        this._apiUrl = _apiUrl;
        this.fetch = (url, options) => __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${this._apiUrl}${url}`, options);
            if (res.ok) {
                const data = (yield res.json());
                return data;
            }
            else {
                throw new Error('Произошла ошибка');
            }
        });
    }
}
class TaskAgent extends BasicAgent {
    constructor() {
        super(API_URL);
        this.getTasks = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const tasks = yield this.fetch('/tasks');
                console.log('Получены задачи:', tasks);
            }
            catch (e) {
                console.log(e);
            }
        });
        this.readTask = (taskId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const task = yield this.fetch(`/tasks/${taskId}`);
                if (Object.keys(task).length)
                    console.log(`Загрузка задачи ${taskId}:`, task);
                if (!Object.keys(task).length)
                    throw new Error(`Загрузка задачи ${taskId}: ошибка, попробуйте другой ID`);
            }
            catch (e) {
                console.log(`Ошибка при загрузке задачи id${taskId}: ${e}`);
            }
        });
        this.addTask = (newTask) => __awaiter(this, void 0, void 0, function* () {
            try {
                const postTask = yield this.fetch('/tasks', {
                    method: 'POST',
                    body: JSON.stringify(newTask),
                    headers: { 'Content-Type': 'application/json' },
                });
                if (Object.keys(postTask).length)
                    console.log(`Создана задача id#${postTask.id}:`, postTask);
            }
            catch (e) {
                console.log(`Ошибка при создании задачи. ${e}`);
            }
        });
        this.removeTask = (taskId) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.fetch(`/tasks/${taskId}`, { method: 'DELETE' });
                console.log(`Задача ${taskId} успешно удалена`);
            }
            catch (e) {
                console.log(`Ошибка при создании удалении задачи id#${taskId}. ${e}`);
            }
        });
        this.editTask = (taskId, newTask) => __awaiter(this, void 0, void 0, function* () {
            try {
                const editTask = yield this.fetch(`/tasks/${taskId}`, {
                    method: 'PATCH',
                    body: JSON.stringify(newTask),
                    headers: { 'Content-Type': 'application/json' },
                });
                if (Object.keys(editTask).length)
                    console.log(`Изменена задача id#${taskId}:`, editTask);
                if (!Object.keys(editTask).length)
                    throw new Error(`Задача id#${taskId} не была изменена`);
            }
            catch (e) {
                console.log(`Ошибка при изменение задачи id#${taskId}. ${e}`);
            }
        });
    }
}
const TaskAgentInstance = new TaskAgent();
TaskAgentInstance.getTasks();
TaskAgentInstance.addTask({
    name: 'Antis',
    info: `${Date.now().toLocaleString()}`,
    isImportant: false,
});
TaskAgentInstance.editTask(128, {
    name: 'Antis123_edited',
    info: '42',
    isImportant: true,
});
TaskAgentInstance.readTask(128);
TaskAgentInstance.removeTask(129);
TaskAgentInstance.removeTask(130);
//# sourceMappingURL=index.js.map