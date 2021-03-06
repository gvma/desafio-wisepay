import Task, { TaskInput, TaskOutput } from '../../db/models/Task';
import { ITaskRepository } from './task';
import { v4 as uuidv4 } from 'uuid';

export class InMemoryTaskRepository implements ITaskRepository {

    public tasks: TaskOutput[] = [];

    constructor() {}

    async create(payload: TaskInput): Promise<TaskOutput> {
        const task = {
            ...payload,
            id: uuidv4()
        }

        this.tasks.push(task);
        return task;
    };
    
    async getById(id: string): Promise<TaskOutput | null> {
        const task = this.tasks.find((element) => element.id === id);
        return task !== undefined ? task : null;
    };
    
    async update(payload: Partial<TaskInput>): Promise<TaskOutput | null> {
        let task = await this.getById(payload.id!);
        if (!task) {
            return null;
        }
        
        this.tasks.forEach((element) => {
            if (element.id === payload.id) {
                element.title = payload.title!;
                element.description = payload.description!;
                element.latitude = payload.latitude!;
                element.longitude = payload.longitude!;
                element.status = payload.status!;
                element.date = payload.date!;
                task = element;
            }
        })

        return task;
    }
    
    async deleteById(id: string): Promise<number> {
        const task = this.tasks.find((element) => element.id === id);
        if (!task) {
            return 500;
        }

        this.tasks = this.tasks.filter((element) => {
            return element.id !== id;
        })
        return 204;
    }
    
    async getAll(): Promise<TaskOutput[]> {
        return this.tasks;
    }
}