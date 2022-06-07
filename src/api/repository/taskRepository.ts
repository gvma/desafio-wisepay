import Task, { TaskInput, TaskOutput } from '../../db/models/Task';
import { ITaskRepository } from './task';
import { v4 as uuidv4 } from 'uuid';

export class TaskRepository implements ITaskRepository {

    constructor() {}

    async create(payload: TaskInput): Promise<TaskOutput> {
        payload.id = uuidv4();
        const task = await Task.create(payload);
        if (!task) {
            return Promise.reject(new Error('Internal Server Error'));
        }
        
        return task;
    };
    
    async getById(id: string): Promise<TaskOutput> {
        const task = await Task.findByPk(id);
        if (!task) {
            return Promise.reject(new Error('Internal Server Error'));
        }
    
        return task;
    };
    
    async update(id: string, payload: Partial<TaskInput>): Promise<TaskOutput> {
        const task = await Task.findByPk(id);
        if (!task) {
            return Promise.reject(new Error('Internal Server Error'));
        }
    
        const updatedTask = await (task as Task).update(payload);
        if (!updatedTask) {
            return Promise.reject(new Error('Internal Server Error'));
        }
    
        return updatedTask;
    }
    
    async deleteById(id: string): Promise<number> {
        const deletedTaskCount = await Task.destroy({
            where: {
                id
            }
        });
    
        if (!deletedTaskCount) {
            return Promise.reject(new Error('Internal Server Error'));
        }
    
        return 204;
    }
    
    async getAll(): Promise<TaskOutput[]> {
        const tasks = await Task.findAll();
        if (!tasks) {
            return Promise.reject(new Error('Internal Server Error'));
        }
        
        return tasks;
    }
}