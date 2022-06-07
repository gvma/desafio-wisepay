import { TaskInput, TaskOutput } from '../../db/models/Task';
import Task from '../../db/models/Task';
import { v4 as uuidv4 } from 'uuid';

export interface ITaskRepository {
    create: (payload: TaskInput) => Promise<TaskOutput>,
    getById: (id: string) => Promise<TaskOutput | undefined>,
    update: (id: string, payload: Partial<TaskInput>) => Promise<TaskOutput | undefined>,
    deleteById: (id: string) => Promise<number>,
    getAll: () => Promise<TaskOutput[]>
};