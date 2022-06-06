import { TaskInput, TaskOutput } from './../../db/models/Task';
import * as taskController from '../controller/task';
import { getReverseGeocoding } from '../../utils/geocoding';

export const isValidCountry = async (latitude: number, longitude: number): Promise<boolean> => {
    const { data } = await getReverseGeocoding(latitude, longitude);

    if (data?.[0].country === 'Brazil' || data?.[0].country === 'Angola') {
        return true;
    }

    return false;
}

export const create = async (payload: TaskInput): Promise<TaskOutput> => {
    if (!(await isValidCountry(payload.latitude, payload.longitude))) {
        return Promise.reject(new Error('Internal Server Error'));
    }

    return taskController.create(payload);
}

export const getById = (id: string): Promise<TaskOutput> => {
    return taskController.getById(id);
}

export const update = (id: string, payload: TaskInput): Promise<TaskOutput> => {
    return taskController.update(id, payload);
}

export const deleteById = (id: string): Promise<number> => {
    return taskController.deleteById(id);
}

export const getAll = (): Promise<TaskInput[]> => {
    return taskController.getAll();
}