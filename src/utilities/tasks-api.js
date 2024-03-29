import sendRequest from './send-request';
const BASE_URL = '/api/tasks';

export async function createTask(taskText) {
    return sendRequest(BASE_URL, 'POST', taskText);
}

export async function getTasks() {
    return sendRequest(BASE_URL);
}

export async function getTask(id) {
    return sendRequest(`${ BASE_URL }/${ id }`);
}


export async function deleteTask(id) {
    return sendRequest(`${ BASE_URL }/${ id }`, 'DELETE');
}

export async function updateTask(id, taskText) {
    return sendRequest(`${ BASE_URL }/${ id }`, 'PUT', taskText);
}

// AddTaskToCategory
export async function addTaskToCategory(categoryId, taskText) {
    return sendRequest(BASE_URL, "POST", {categoryId, taskText});
}