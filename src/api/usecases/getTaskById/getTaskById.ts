import { TaskOutput } from '../../../db/models/Task';
import { UseCase } from '../useCase';

export class GetTaskById extends UseCase<string, TaskOutput | null> {

    async execute(id: string): Promise<TaskOutput | null> {
        return this.taskRepository.getById(id);
    }
}