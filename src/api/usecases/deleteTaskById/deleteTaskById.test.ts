import { InMemoryTaskRepository } from './../../repository/inMemoryTaskRepository';
import { DeleteTaskById } from './deleteTaskById';
require('dotenv').config();

const date = new Date('2005-07-08T11:22:33+0000');

describe('DeleteById method', () => {
    let taskService: DeleteTaskById;
    let id: string;
    let inMemoryTaskRepository: InMemoryTaskRepository;

    beforeEach(async () => {
        const newTask = {
            'id': 'e48029ac-3bff-4f2e-b9a8-e03ebf9dd13a',
            'title': 'Titulo teste',
            'description': 'Descricao teste',
            'latitude': -9.29792,
            'longitude': 14.91162,
            'status': 'Status de teste',
            date
        };
        inMemoryTaskRepository = new InMemoryTaskRepository();
        taskService = new DeleteTaskById(inMemoryTaskRepository);
        const task = await inMemoryTaskRepository.create(newTask);
        id = task.id
    });

    afterEach(async () => {
        inMemoryTaskRepository.tasks = [];
    })

    it('Should delete the Task', async () => {
        const expectedStatus = 204;
        const status = await taskService.execute(id);
        expect(status).toEqual(expectedStatus);
    });

    it('Should not delete the Task', async () => {
        const expectedStatus = 500;
        const status = await taskService.execute('b096072a-7ec0-4c06-835a-c747196836fb');
        expect(status).toEqual(expectedStatus);
    });
});