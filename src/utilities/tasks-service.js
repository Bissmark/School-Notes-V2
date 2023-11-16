import * as tasksAPI from './tasks-api';

// Create
export async function createTask(taskText) {
    const newTask = await tasksAPI.createTask(taskText);
    return newTask;
}

// Index
export async function getTasks() {
    const tasks = await tasksAPI.getTasks();
    return tasks;
}

// Show
export async function getTaskDetails(id) {
    const task = await tasksAPI.getTask(id);
    return task;
}

// Delete
export async function deleteTask(id) {
    await tasksAPI.deleteTask(id);
    return true;
}

// Update
export async function updateTask(id) {
    const task = await tasksAPI.updateTask(id);
    return task;
}

// AddTaskToCategory
export async function addTaskToCategory(categoryId, taskText) {
    const newTask = await tasksAPI.addTaskToCategory(categoryId, taskText);
    return newTask;
}