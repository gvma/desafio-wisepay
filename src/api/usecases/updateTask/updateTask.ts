import { isValidCountry } from '../../../utils/geocoding';
import { TaskInput, TaskOutput } from '../../../db/models/Task';
import { ITaskRepository } from '../../repository/task';

export class UpdateTask {
    taskRepository: ITaskRepository;

    constructor(taskRepository: ITaskRepository) {
        this.taskRepository = taskRepository;
    }

    async execute(id: string, payload: TaskInput): Promise<TaskOutput | undefined> {
        if (!(await isValidCountry(payload.latitude, payload.longitude))) {
            return Promise.reject(new Error('Internal Server Error'));
        }
        
        return this.taskRepository.update(id, payload);
    }
}