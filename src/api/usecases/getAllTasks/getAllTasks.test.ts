import { GetAllTasks } from './getAllTasks';
import { InMemoryTaskRepository } from './../../repository/inMemoryTaskRepository';
require('dotenv').config();

const date = new Date('2005-07-08T11:22:33+0000');

describe('Get all method', () => {
    let taskService: GetAllTasks;
    let inMemoryTaskRepository: InMemoryTaskRepository;

    beforeEach(async () => {
        inMemoryTaskRepository = new InMemoryTaskRepository();
        taskService = new GetAllTasks(inMemoryTaskRepository);

        const tasks = [
            {
                'id': 'e48029ac-3bff-4f2e-b9a8-e03ebf9dd13a',
                'title': '1',
                'description': '1',
                'latitude': -9.29782,
                'longitude': 14.91162,
                'status': '1',
                date
            },
            {
                'id': '23fa98f5-e5ee-447e-b09c-a3292a47d384',
                'title': '2',
                'description': '2',
                'latitude': -9.29782,
                'longitude': 14.91162,
                'status': '2',
                date
            },
            {
                'id': '20964b32-efba-423b-a991-4d0335a9a10d',
                'title': '3',
                'description': '3',
                'latitude': -9.29782,
                'longitude': 14.91162,
                'status': '3',
                date
            }
        ]

        await inMemoryTaskRepository.create(tasks[0]);
        await inMemoryTaskRepository.create(tasks[1]);
        await inMemoryTaskRepository.create(tasks[2]);
    });

    afterAll(() => {
        inMemoryTaskRepository.tasks = [];
    })

    it('Should return all tasks', async () => {
        const expectedLength = 3;
        const tasks = await taskService.execute();
        expect(tasks.length).toEqual(expectedLength);
    })
})