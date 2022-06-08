import { TaskOutput } from '../../../db/models/Task';
import { UseCase } from '../useCase';

export class GetAllTasks extends UseCase<undefined, TaskOutput[]> {
    async execute(): Promise<TaskOutput[]> {
        return this.taskRepository.getAll();
    }
}