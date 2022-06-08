import { isValidCountry } from '../../../utils/geocoding';
import { TaskInput, TaskOutput } from '../../../db/models/Task';
import { UseCase } from '../useCase';

export class UpdateTask extends UseCase<TaskInput, TaskOutput | null> {
    async execute(payload: TaskInput): Promise<TaskOutput | null> {
        if (!(await isValidCountry(payload.latitude, payload.longitude))) {
            return Promise.reject(new Error('Internal Server Error'));
        }
        
        return this.taskRepository.update(payload);
    }
}