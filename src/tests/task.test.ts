import { TaskOutput } from './../../src/db/models/Task';
import Task from '../db/models/Task';
import { create, getById, update, deleteById, getAll } from '../api/services/task.services';
import { v4 as uuidv4 } from 'uuid';
import * as taskService from '../api/services/task.services';

// const taskService = require('../api/services/task.services');

jest.mock('axios');

describe('Service tests', () => {
    describe('Service create method', () => {
        it('Should create a Task', async () => {
            const spy = jest.spyOn(taskService, 'isValidCountry').mockResolvedValue(true);

            const task: TaskOutput = await create({
                'id': uuidv4(),
                'title': 'Titulo teste',
                'description': 'Descricao teste',
                'latitude': -9.643839196284548,
                'longitude': -35.705806482110006,
                'status': 'Status de teste',
                'date': new Date('2005-07-08T11:22:33+0000')
            });

            expect(spy).toHaveBeenCalled();
            expect(task).not.toBeNull();
        })

        it('Should throw an error when trying to create a Task', async () => {
            const spy = jest.spyOn(taskService, 'isValidCountry').mockResolvedValue(false);

            expect(spy).toHaveBeenCalled();
            await expect(create({
                'id': uuidv4(),
                'title': 'Titulo teste',
                'description': 'Descricao teste',
                'latitude': 40.7638435,
                'longitude': -73.9729691,
                'status': 'Status de teste',
                'date': new Date('2005-07-08T11:22:33+0000')
            })).rejects.toThrow(new Error('Internal Server Error'));
        })
    });

    describe('Service getById method', () => {
        beforeAll(() => {
            return Task.create({
                'id': 'e48029ac-3bff-4f2e-b9a8-e03ebf9dd13a',
                'title': 'Titulo teste',
                'description': 'Descricao teste',
                'latitude': -9.29782,
                'longitude': 14.91162,
                'status': 'Status de teste',
                'date': new Date('2005-07-08T11:22:33+0000')
            });
        });

        afterAll(() => {
            return Task.destroy({
                where: {
                    'id': 'e48029ac-3bff-4f2e-b9a8-e03ebf9dd13a'
                }
            });
        });

        it('Should return a Task', async () => {
            return getById('e48029ac-3bff-4f2e-b9a8-e03ebf9dd13a').then(data => {
                expect(data).not.toBeNull();
            });
        })

        it('Should throw an error when returning no Task', async () => {
            await expect(getById('e48029ac-3bff-4f2e-b9a8-e03ebf9dd13b')).rejects.toThrow(new Error('Internal Server Error'))
        })
    })
})

describe('Controller tests', () => {

});

describe('Router tests', () => {

});