import { TaskInput, TaskOutput } from '../../db/models/Task';
import Task from '../../db/models/Task';
import { v4 as uuidv4 } from 'uuid';

export const create = async (payload: TaskInput): Promise<TaskOutput> => {
    payload.id = uuidv4();
    const task = await Task.create(payload);
    if (!task) {
        return Promise.reject(new Error('Internal Server Error'));
    }

    return task;
};

export const getById = async (id: string): Promise<TaskOutput> => {
    const task = await Task.findByPk(id);
    if (!task) {
        return Promise.reject(new Error('Internal Server Error'));
    }

    return task;
};

export const update = async (id: string, payload: Partial<TaskInput>): Promise<TaskOutput> => {
    const task = await Task.findByPk(id);
    if (!task) {
        return Promise.reject(new Error('Internal Server Error'));
    }

    const updatedTask = await (task as Task).update(payload);
    if (!updatedTask) {
        return Promise.reject(new Error('Internal Server Error'));
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
        return Promise.reject(new Error('Internal Server Error'));
    }

    return 204;
}

export const getAll = async (): Promise<TaskOutput[]> => {
    const tasks = await Task.findAll();
    if (!tasks) {
        return Promise.reject(new Error('Internal Server Error'));
    }
    
    return tasks;
}