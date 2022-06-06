import { TaskInput, TaskOutput } from '../models/Task';
import Task from '../models/Task';
import { v4 as uuidv4 } from 'uuid';

export const create = async (payload: TaskInput): Promise<TaskOutput> => {
    payload.id = uuidv4();
    const task = await Task.create(payload);
    if (!task) {
        throw new Error('Server Internal Error');
    }

    return task;
};

export const getById = async (id: string): Promise<TaskOutput> => {
    const task = await Task.findByPk(id);
    if (!task) {
        throw new Error('Server Internal Error');
    }

    return task;
};

export const update = async (id: string, payload: Partial<TaskInput>): Promise<TaskOutput> => {
    const task = await Task.findByPk(id);
    if (!task) {
        throw new Error('Server Internal Error');
    }

    const updatedTask = await (task as Task).update(payload);
    if (!updatedTask) {
        throw new Error('Server Internal Error');
    }

    return updatedTask;
}

export const deleteById = async (id: string): Promise<number> => {
    const deletedTaskCount = await Task.destroy({
        where: {
            id
        }
    })

    if (!deletedTaskCount) {
        throw new Error('Server Internal Error');
    }

    return 204;
}

export const getAll = async (): Promise<TaskOutput[]> => {
    const tasks = await Task.findAll();
    if (!tasks) {
        throw new Error('Server Internal Error');
    }
    
    return tasks;
}