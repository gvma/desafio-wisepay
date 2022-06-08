import { UseCase } from '../useCase';

export class DeleteTaskById extends UseCase<string, number> {
    async execute(id: string): Promise<number> {
        return this.taskRepository.deleteById(id);
    }
}