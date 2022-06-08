import { isValidCountry } from '../../../utils/geocoding';
import { UseCase } from '../useCase';
import { TaskInput, TaskOutput } from './../../../db/models/Task';

export class CreateTask extends UseCase<TaskInput, TaskOutput> {
    async execute(payload: TaskInput): Promise<TaskOutput> {
        if (!(await isValidCountry(payload.latitude, payload.longitude))) {
            return Promise.reject(new Error('Internal Server Error'));
        }

        const task = this.taskRepository.create(payload);

        return task;
    }
}