import Task, { TaskInput, TaskOutput } from '../../db/models/Task';
import { ITaskRepository } from './task';
import { v4 as uuidv4 } from 'uuid';

export class TaskRepository implements ITaskRepository {

    constructor() {}

    async create(payload: TaskInput): Promise<TaskOutput> {
        payload.id = uuidv4();
        const task = await Task.create(payload);
        return task;
    };
    
    async getById(id: string): Promise<TaskOutput | null> {
        const task = await Task.findByPk(id);
        return task;
    };
    
    async update(payload: Partial<TaskInput>): Promise<TaskOutput> {
        const task = await Task.findByPk(payload.id);    
        const updatedTask = await (task as Task).update(payload);
        return updatedTask;
    }
    
    async deleteById(id: string): Promise<number> {
        const deletedTaskCount = await Task.destroy({
            where: {
                id
            }
        });
    
        if (!deletedTaskCount) {
            return 404;
        }
    
        return 204;
    }
    
    async getAll(): Promise<TaskOutput[]> {
        return await Task.findAll();
    }
}