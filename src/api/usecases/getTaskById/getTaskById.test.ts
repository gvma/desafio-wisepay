import { InMemoryTaskRepository } from '../../repository/inMemoryTaskRepository';
import { GetTaskById } from './getTaskById';
require('dotenv').config();

const date = new Date('2005-07-08T11:22:33+0000');

describe('GetById method', () => {
    let taskService: GetTaskById;
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
        taskService = new GetTaskById(inMemoryTaskRepository);
        const task = await inMemoryTaskRepository.create(newTask);
        id = task.id
    });

    afterEach(async () => {
        inMemoryTaskRepository.tasks = [];
    })

    it('Should return a Task', async () => {
        const task = await taskService.execute(id);
        const expectedTask = {
            id,
            'title': 'Titulo teste',
            'description': 'Descricao teste',
            'latitude': -9.29792,
            'longitude': 14.91162,
            'status': 'Status de teste',
            date
        }

        expect(task).toEqual(expectedTask);
    });


    it('Should throw an error when returning no Task', async () => {
        const task = await taskService.execute('e48029ac-3bff-4f2e-b9a8-e03ebf9dd13a');
        expect(task).toBeNull();
    });
});