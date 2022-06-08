import { ITaskRepository } from '../repository/task';

export abstract class UseCase<InputType, OutputType> {
    taskRepository: ITaskRepository;

    constructor(taskRepository: ITaskRepository) {
        this.taskRepository = taskRepository;
    }

    abstract execute(payload: InputType): Promise<OutputType>;
}