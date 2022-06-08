import { TaskOutput } from '../../../db/models/Task';
import { ITaskRepository } from '../../repository/task';

export class GetTaskById {
    taskRepository: ITaskRepository;
    
    constructor(taskRepository: ITaskRepository) {
        this.taskRepository = taskRepository;
    }

    async execute(id: string): Promise<TaskOutput | null> {
        return this.taskRepository.getById(id);
    }
}