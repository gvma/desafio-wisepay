import request from 'supertest';
import Task from '../db/models/Task';
import app from '../index';
import { HTTP_STATUS } from '../utils/consts';
import { TaskOutput } from './../db/models/Task';
import { v4 as uuidv4 } from 'uuid';
import { angolaCoordinatesMock, brazilCoordinatesMock, usaCoordinatesMock } from './__mocks__/geocodingResponse';

describe('Tasks test', () => {
    describe('Create tasks', () => {
        const date = new Date();
        afterEach(async () => {
            await Task.destroy({
                where: {},
                truncate: true
            });
        });

        it('POST /api/tasks should create task for Brazil', async () => {
            const task = {
                "title": "Titulo teste",
                "description": "Descricao teste",
                "latitude": brazilCoordinatesMock.latitude,
                "longitude": brazilCoordinatesMock.longitude,
                "status": "Status de teste",
                date
            };
    
            return (
                request(app)
                .post('/api/tasks')
                .send(task)
                .expect(HTTP_STATUS.OK)
                .then(({body}) => {
                    expect(body).toHaveProperty('id');
                })
            );
        });
    
        it('POST /api/tasks should create task for Angola', async () => {
            const task = {
                "title": "Titulo teste",
                "description": "Descricao teste",
                "latitude": angolaCoordinatesMock.latitude,
                "longitude": angolaCoordinatesMock.longitude,
                "status": "Status de teste",
                "date": "2005-07-08T11:22:33+0000"
            };
    
            return (
                request(app)
                .post('/api/tasks')
                .send(task)
                .expect(HTTP_STATUS.OK)
                .then(({body}) => {
                    expect(body).toHaveProperty('id');
                })
            );
        });
    
        it('POST /api/tasks should create task for USA', async () => {
            const task = {
                "title": "Titulo teste",
                "description": "Descricao teste",
                "latitude": usaCoordinatesMock.latitude,
                "longitude": usaCoordinatesMock.longitude,
                "status": "Status de teste",
                "date": "2005-07-08T11:22:33+0000"
            };
    
            return await (
                request(app)
                .post('/api/tasks')
                .send(task)
                .expect(HTTP_STATUS.INTERNAL_SERVER_ERROR)
            );
        });
    });

    describe('GetById tasks', () => {
        let expectedTask: TaskOutput;
        const date = new Date();
        let id = uuidv4();

        beforeEach(async () => {

            const task = {
                id,
                date,
                "title": "Titulo teste",
                "description": "Descricao teste",
                "latitude": brazilCoordinatesMock.latitude,
                "longitude": brazilCoordinatesMock.longitude,
                "status": "Status de teste"
            };
            expectedTask = await Task.create(task);
        });

        afterEach(async () => {
            await Task.destroy({
                where: {},
                truncate: true
            });
        });

        it('GET /api/tasks/:id should return created tasks', async() => {
            return (
                request(app)
                .get(`/api/tasks/${expectedTask.id}`)
                .send()
                .expect(HTTP_STATUS.OK)
                .then(({body}) => {
                    expect(body.id).toEqual(expectedTask.id);
                })
            );
        });
    });

    describe('Update tasks', () => {
        let baseTask: TaskOutput;
        const date = new Date();
        let id = uuidv4();

        beforeEach(async () => {
            const task = {
                id,
                date,
                "title": "Titulo teste",
                "description": "Descricao teste",
                "latitude": brazilCoordinatesMock.latitude,
                "longitude": brazilCoordinatesMock.longitude,
                "status": "Status de teste"
            };
            baseTask = await Task.create(task);
        });

        afterEach(async () => {
            await Task.destroy({
                where: {},
                truncate: true
            });
        });

        it('PUT /api/tasks should update task', async () => {
            const newTask = {
                id: baseTask.id,
                "title": "Titulo atualizado",
                "description": "Descricao atualizado",
                "latitude": brazilCoordinatesMock.latitude,
                "longitude": brazilCoordinatesMock.longitude,
                "status": "Status de atualizado",
                "date": "2005-07-08T11:22:33+0000"
            };

            return (
                request(app)
                .put(`/api/tasks/${baseTask.id}`)
                .send(newTask)
                .expect(HTTP_STATUS.OK)
                .then(({body}) => {
                    expect(body).not.toEqual(newTask);
                    expect(body.id).toEqual(newTask.id);
                })
            );
        });

        it('PUT /api/tasks should update task', async () => {
            const newTask = {
                id: baseTask.id,
                "title": "Titulo atualizado",
                "description": "Descricao atualizado",
                "latitude": angolaCoordinatesMock.latitude,
                "longitude": angolaCoordinatesMock.longitude,
                "status": "Status de atualizado",
                "date": "2005-07-08T11:22:33+0000"
            };

            return (
                request(app)
                .put(`/api/tasks/${baseTask.id}`)
                .send(newTask)
                .expect(HTTP_STATUS.OK)
                .then(({body}) => {
                    expect(body).not.toEqual(newTask);
                    expect(body.id).toEqual(newTask.id);
                })
            );
        });

        it('PUT /api/tasks should not update task due to USA coordinates', async () => {
            const newTask = {
                id: baseTask.id,
                "title": "Titulo atualizado",
                "description": "Descricao atualizado",
                "latitude": usaCoordinatesMock.latitude,
                "longitude": usaCoordinatesMock.longitude,
                "status": "Status de atualizado",
                "date": "2005-07-08T11:22:33+0000"
            };

            return (
                request(app)
                .put(`/api/tasks/${baseTask.id}`)
                .send(newTask)
                .expect(HTTP_STATUS.INTERNAL_SERVER_ERROR)
            );
        });
    });
    
    describe('DeleteById task', () => {
        let baseTask: TaskOutput;
        const date = new Date();
        let id = uuidv4();

        beforeEach(async () => {
            const task = {
                id,
                date,
                "title": "Titulo teste",
                "description": "Descricao teste",
                "latitude": brazilCoordinatesMock.latitude,
                "longitude": brazilCoordinatesMock.longitude,
                "status": "Status de teste"
            };
            baseTask = await Task.create(task);
        });

        afterEach(async () => {
            await Task.destroy({
                where: {},
                truncate: true
            });
        });

        it('DELETE /api/tasks should delete task', async () => {
            return (
                request(app)
                .delete(`/api/tasks/${baseTask.id}`)
                .expect(HTTP_STATUS.NO_CONTENT)
            );
        });

        it('DELETE /api/tasks should not delete task', async () => {
            const nonExistantId = '9a9f13a7-01c9-497f-9937-980d4d82848d'

            return (
                request(app)
                .delete(`/api/tasks/${nonExistantId}`)
                .expect(HTTP_STATUS.NOT_FOUND)
            );
        });
    });

    describe('GetAll tasks', () => {
        let tasks: Task[];
        const date = new Date();

        afterEach(async () => {
            await Task.destroy({
                where: {},
                truncate: true
            });
        });

        it('Should return the 3 tasks who will be created', async () => {
            tasks = await Task.bulkCreate([
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
            ]);

            return (
                request(app)
                .get('/api/tasks')
                .expect(HTTP_STATUS.OK)
                .then(({body}) => {
                    expect(body.length).toEqual(3);
                    expect.arrayContaining([
                        expect.objectContaining({'id': 'e48029ac-3bff-4f2e-b9a8-e03ebf9dd13a'}),
                        expect.objectContaining({'id': '23fa98f5-e5ee-447e-b09c-a3292a47d384'}),
                        expect.objectContaining({'id': '20964b32-efba-423b-a991-4d0335a9a10d'})
                    ]);
                })
            );
        });

        it('Should return the 3 tasks who will be created', async () => {
            return (
                request(app)
                .get('/api/tasks')
                .expect(HTTP_STATUS.OK)
                .then(({body}) => {
                    expect(body.length).toBe(0);
                })
            );
        });
    });
});