const URL = 'https://intership-liga.ru/tasks';

///////////////////////////////
/*            XHR            */
///////////////////////////////

const sendRequest = (url, onload, onerror, options = {}) => {
  const xhr = new XMLHttpRequest();
  if (Object.keys(options).length) {
    console.log('options', options);
    const { method, body, id } = options;
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    if (method === 'POST' || method === 'PATCH') xhr.send(body);
    if (method === 'DELETE') xhr.send();
  } else {
    xhr.open('GET', url, true);
    xhr.send();
  }
  xhr.onload = () => onload(JSON.parse(xhr.response), xhr.status);
  xhr.onerror = () => onerror(xhr.status);
};

/*
 **  Изменение задачи
 */
// const patchTaskId = 2365;

// sendRequest(
//   URL + `/${patchTaskId}`,
//   (response, status) => {
//     if (status >= 200 && status < 300)
//       console.log(`Изменение задачи id#${patchTaskId} успешно: `, response);
//     if (status >= 400 && status < 600)
//       console.log(`Изменение задачи id#${patchTaskId} неуспешно`);
//   },
//   (errorStatus) => {
//     console.warn(`Ошибка изменения задачи${patchTaskId}: ${errorStatus}`);
//   },
//   {
//     method: 'PATCH',
//     body: JSON.stringify({
//       name: 'Antis777',
//       info: 'xhr-patch',
//       isImportant: true,
//     }),
//   }
// );

/*
 **  Удаление задачи
 */
// const removeTaskId=2365;
//
// sendRequest(
//   URL+`/${removeTaskId}`,
//   (response, status) => {
//     if(status >= 200 && status < 300) console.log(`Удаление задачи id#${removeTaskId} успешно`);
//     if(status >= 400 && status < 600) console.log(`Удаление задачи id#${removeTaskId} неуспешно`);
//   },
//   (errorStatus) => {
//     console.warn(`Ошибка удаления задачи${removeTaskId}: ${errorStatus}`);
//   },
//   {
//     method: 'DELETE',
//   }
// );

/*
 **  Добавление задачи
 */
// sendRequest(
//   URL,
//   (response) => {
//     console.log(`Добавление задачи id#${response.id}:`, response);
//   },
//   (errorStatus) => {
//     console.warn(`Ошибка добавления задачи: ${errorStatus}`);
//   },
//   {
//     method: 'POST',
//     body: JSON.stringify({
//       name: 'Antis',
//       info: 'xhr',
//       isImportant: false,
//     }),
//   }
// );

/*
 ** Загрузка всех задач
 */
// sendRequest(
//   URL,
//   (response) => {
//     console.log('Получение задач:', response);
//   },
//   (errorStatus) => {
//     console.warn(`Ошибка получения задач: ${errorStatus}`);
//   }
// );

/*
 **  Чтение задачи
 */

// sendRequest(
//   URL + `/1024`,
//   (response) => {
//     console.log(`Получение задачи id#${response.id}:`, response);
//   },
//   (errorStatus) => {
//     console.warn(`Ошибка получения задачи: ${errorStatus}`);
//   }
// );

///////////////////////////////
/*           FETCH           */
///////////////////////////////

/*
 **  Добавление задачи
 */
// const postTask = (async (url, task) => {
//   try {
//     const res = await fetch(url, {
//       method: 'POST',
//       body: JSON.stringify(task),
//       headers: { 'Content-Type': 'application/json' },
//     });
//     const newTask = await res.json();
//     if (Object.keys(newTask).length)
//       console.log(`Создана задача id#${newTask.id}:`, newTask);
//   } catch (error) {
//     console.log(`Ошибка при создании задачи. ${error}`);
//   }
// })(URL, {
//   name: 'Antis',
//   info: '42',
//   isImportant: true,
// });

/*
 **  Удаление задачи
 */
// const removeTaskId = (async (url, id) => {
//   try {
//     const res = await fetch(url + `/${id}`, { method: 'DELETE' });
//     if (res.ok) console.log(`Задача ${id} успешно удалена`);
//     if (!res.ok) throw new Error(`Задача ${id} не была удалена`);
//   } catch (error) {
//     console.log(`Ошибка при удалении задачи. ${error.message}`);
//   }
// })(URL, 2350);

/*
 **  Изменение задачи
 */
// const patchTaskId = (async (url, taskId, taskBody) => {
//   try {
//     const res = await fetch(url + `/${taskId}`, {
//       method: 'PATCH',
//       body: JSON.stringify(taskBody),
//       headers: { 'Content-Type': 'application/json' },
//     });
//     const newTask = await res.json();
//     if (res.ok && Object.keys(newTask).length)
//       console.log(`Изменена задача id#${newTask.id}:`, newTask);
//     if (!res.ok || !Object.keys(newTask).length)
//       throw new Error(`Задача id#${taskId} не была изменена`);
//   } catch (error) {
//     console.log(`Ошибка при изменение задачи id#${taskId}. ${error}`);
//   }
// })(URL, 2352, {
//   name: 'Antis123',
//   info: '42',
//   isImportant: false,
//   isComplited: true,
// });

/*
 ** Загрузка всех задач
 */
// const getTasks = (async (url) => {
//   const res = await fetch(url);
//   const tasks = await res.json();
//   console.log('Получение задач:', tasks);
// })(URL);

/*
 **  Чтение задачи
 */
// const getTaskId = (async (url, id) => {
//   try {
//     const res = await fetch(url + `/${id}`);
//     const task = await res.json();
//     if (Object.keys(task).length) console.log(`Загрузка задачи ${id}:`, task);
//     if (!Object.keys(task).length)
//       throw new Error(`Загрузка задачи ${id}: ошибка, попробуйте другой ID`);
//   } catch (error) {
//     console.log(`Ошибка при загрузке задачи id${id}: ${error.message}`);
//   }
// })(URL, 1024);
