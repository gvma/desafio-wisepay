import { TaskOutput } from '../../../db/models/Task';
import { ITaskRepository } from '../../repository/task';

export class DeleteTaskById {
    taskRepository: ITaskRepository;
    
    constructor(taskRepository: ITaskRepository) {
        this.taskRepository = taskRepository;
    }

    async execute(id: string): Promise<number> {
        return this.taskRepository.deleteById(id);
    }
}