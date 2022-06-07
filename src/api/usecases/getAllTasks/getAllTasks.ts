import { TaskOutput } from '../../../db/models/Task';
import { ITaskRepository } from '../../repository/task';

export class GetAllTasks {
    taskRepository: ITaskRepository;
    
    constructor(taskRepository: ITaskRepository) {
        this.taskRepository = taskRepository;
    }

    async execute(): Promise<TaskOutput[]> {
        return this.taskRepository.getAll();
    }
}