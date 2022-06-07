import { isValidCountry } from '../../../utils/geocoding';
import { TaskInput, TaskOutput } from './../../../db/models/Task';
import { ITaskRepository } from './../../repository/task';

export class CreateTask {
    taskRepository: ITaskRepository;
    
    constructor(taskRepository: ITaskRepository) {
        this.taskRepository = taskRepository;
    }

    async execute(payload: TaskInput): Promise<TaskOutput> {
        if (!(await isValidCountry(payload.latitude, payload.longitude))) {
            return Promise.reject(new Error('Internal Server Error'));
        }

        const task = this.taskRepository.create(payload);

        return task;
    }
}