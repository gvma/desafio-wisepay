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
    
    async getById(id: string): Promise<TaskOutput | undefined> {
        return this.tasks.find((element) => element.id === id);
    };
    
    async update(id: string, payload: Partial<TaskInput>): Promise<TaskOutput | undefined> {
        let task = await this.getById(id);
        if (!task) {
            return undefined;
        }
        
        this.tasks.forEach((element) => {
            if (element.id === id) {
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