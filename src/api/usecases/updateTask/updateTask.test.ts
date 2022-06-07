import { usaCoordinatesMock } from './../../../tests/__mocks__/geocodingResponse';
import { UpdateTask } from './updateTask';
import { InMemoryTaskRepository } from './../../repository/inMemoryTaskRepository';
import * as reverseGeocoding from '../../../utils/geocoding';
import { brazilCoordinatesMock, angolaCoordinatesMock } from '../../../tests/__mocks__/geocodingResponse';
require('dotenv').config();

const date = new Date('2005-07-08T11:22:33+0000');

describe('Update method', () => {
    let taskService: UpdateTask;
    let id: string;
    let inMemoryTaskRepository: InMemoryTaskRepository;

    beforeEach(async () => {
        const newTask = {
            'id': 'e48029ac-3bff-4f2e-b9a8-e03ebf9dd13a',
            'title': 'Titulo teste',
            'description': 'Descricao teste',
            'latitude': brazilCoordinatesMock.latitude,
            'longitude': brazilCoordinatesMock.longitude,
            'status': 'Status de teste',
            date
        };
        inMemoryTaskRepository = new InMemoryTaskRepository();
        taskService = new UpdateTask(inMemoryTaskRepository);
        const task = await inMemoryTaskRepository.create(newTask);
        id = task.id;
    });

    afterEach(() => {
        inMemoryTaskRepository.tasks = [];
    });

    it('Should return a task with updated values for Brazil allowed coordinates', async () => {
        const spyIsValidCountry = jest.spyOn(reverseGeocoding, 'isValidCountry').mockResolvedValue(true);

        const expectedTask = {
            id,
            'title': 'Titulo editado',
            'description': 'Descricao editada',
            'latitude': brazilCoordinatesMock.latitude,
            'longitude': brazilCoordinatesMock.longitude,
            'status': 'Status editado',
            date
        };

        const task = await taskService.execute(id, expectedTask)!;

        expect(spyIsValidCountry).toHaveBeenCalled();
        expect(task).toEqual(expectedTask);
    });

    it('Should return a task with updated values for Angola allowed coordinates', async () => {
        const spyIsValidCountry = jest.spyOn(reverseGeocoding, 'isValidCountry').mockResolvedValue(true);

        const expectedTask = {
            id,
            'title': 'Titulo editado',
            'description': 'Descricao editada',
            'latitude': angolaCoordinatesMock.latitude,
            'longitude': angolaCoordinatesMock.longitude,
            'status': 'Status editado',
            date
        };

        const task = await taskService.execute(id, expectedTask)!;

        expect(spyIsValidCountry).toHaveBeenCalled();
        expect(task).toEqual(expectedTask);
    });

    it('Should return a task with updated values for Angola allowed coordinates', async () => {
        const spyIsValidCountry = jest.spyOn(reverseGeocoding, 'isValidCountry').mockResolvedValue(true);

        const anyTask = {
            id,
            'title': 'Titulo editado',
            'description': 'Descricao editada',
            'latitude': angolaCoordinatesMock.latitude,
            'longitude': angolaCoordinatesMock.longitude,
            'status': 'Status editado',
            date
        };

        const task = await taskService.execute('cf3fccaa-3cb3-4809-b683-fa0b0fa3dbb3', anyTask)!;

        expect(spyIsValidCountry).toHaveBeenCalled();
        expect(task).toBeUndefined;
    });

    it('Should return an error for USA\'s not allowed coordinates', async () => {
        const spyIsValidCountry = jest.spyOn(reverseGeocoding, 'isValidCountry').mockResolvedValue(false);

        const expectedTask = {
            id,
            'title': 'Titulo editado',
            'description': 'Descricao editada',
            'latitude': usaCoordinatesMock.latitude,
            'longitude': usaCoordinatesMock.longitude,
            'status': 'Status editado',
            date
        };

        await (expect(taskService.execute(id, expectedTask))).rejects.toThrow(new Error('Internal Server Error'));
        expect(spyIsValidCountry).toHaveBeenCalled();
    });
})