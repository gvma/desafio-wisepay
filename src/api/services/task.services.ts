// import { TaskInput, TaskOutput } from './../../db/models/Task';
// import * as taskController from '../repository/task';
// import { getReverseGeocoding } from '../../utils/geocoding';
// import { TaskRepository } from '../repository/taskRepository';

// export const create = async (payload: TaskInput): Promise<TaskOutput> => {
//     if (!(await isValidCountry(payload.latitude, payload.longitude))) {
//         return Promise.reject(new Error('Internal Server Error'));
//     }

//     return taskRepository.create(payload);
// }

// export const getById = async (id: string): Promise<TaskOutput> => {
//     return taskRepository.getById(id);
// }

// export const update = async (id: string, payload: TaskInput): Promise<TaskOutput> => {
//     if (!(await isValidCountry(payload.latitude, payload.longitude))) {
//         return Promise.reject(new Error('Internal Server Error'));
//     }
//     return taskRepository.update(id, payload);
// }

// export const deleteById = async (id: string): Promise<number> => {
//     return taskRepository.deleteById(id);
// }

// export const getAll = async (): Promise<TaskInput[]> => {
//     return taskRepository.getAll();
// }