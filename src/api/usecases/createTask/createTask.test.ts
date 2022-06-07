import { InMemoryTaskRepository } from './../../repository/inMemoryTaskRepository';
import * as reverseGeocoding from '../../../utils/geocoding';
import { CreateTask } from './createTask';
import { brazilCoordinatesMock } from '../../../tests/__mocks__/geocodingResponse';
require('dotenv').config();

const date = new Date('2005-07-08T11:22:33+0000');

describe('Create method', () => {
    let taskService: CreateTask;

    beforeEach(() => {
        taskService = new CreateTask(new InMemoryTaskRepository());
    });

    it('Should create a Task', async () => {
        const spy = jest.spyOn(reverseGeocoding, 'isValidCountry').mockResolvedValue(true);

        const expectedTask = {
            'title': 'Titulo teste',
            'description': 'Descricao teste',
            'latitude': brazilCoordinatesMock.latitude,
            'longitude': brazilCoordinatesMock.longitude,
            'status': 'Status de teste',
            date
        };

        const task = await taskService.execute(expectedTask);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(task).toHaveProperty('id');
    });

    it('Should throw an error when trying to create a Task', async () => {
        const spy = jest.spyOn(reverseGeocoding, 'isValidCountry').mockResolvedValue(false);

        const expectedTask = {
            'id': 'e48029ac-3bff-4f2e-b9a8-e03ebf9dd13a',
            'title': 'Titulo teste',
            'description': 'Descricao teste',
            'latitude': 40.7638435,
            'longitude': -73.9729691,
            'status': 'Status de teste',
            date
        };

        await expect(taskService.execute(expectedTask)).rejects.toThrow(new Error('Internal Server Error'));
        expect(spy).toHaveBeenCalled();
    });
});