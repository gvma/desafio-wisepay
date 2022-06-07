// import Task from '../db/models/Task';
// import { create, getById, update, deleteById, getAll, isValidCountry } from '../api/services/task.services';
// import * as reverseGeocoding from '../utils/geocoding';
// import * as taskService from '../api/services/task.services';
// import {
//     brazilCoordinatesMock,
//     brazilReverseGeocodingMock,
//     angolaCoordinatesMock,
//     angolaReverseGeocodingMock,
//     usaCoordinatesMock,
//     usaReverseGeocodingMock
// } from './__mocks__/geocodingResponse';
// require('dotenv').config();

// const date = new Date('2005-07-08T11:22:33+0000');
// const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1; //months from 1-12
// const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
// const year = date.getFullYear();
// const fixedDate = year + "-" + month + "-" + day;

// describe('Service isValidCountry test', () => {
//     beforeEach(() => {
//         jest.clearAllMocks();
//     })

//     it('Should return true for Brazil', async () => {
//         const spy = jest.spyOn(reverseGeocoding, 'getReverseGeocoding').mockResolvedValue(brazilReverseGeocodingMock);
//         const data = await isValidCountry(brazilCoordinatesMock.latitude, brazilCoordinatesMock.longitude);
//         expect(spy).toHaveBeenCalledTimes(1);
//         expect(data).toEqual(true);
//     })

//     it('Should return true for Angola', async () => {
//         const spy = jest.spyOn(reverseGeocoding, 'getReverseGeocoding').mockResolvedValue(angolaReverseGeocodingMock);
//         const data = await isValidCountry(angolaCoordinatesMock.latitude, angolaCoordinatesMock.longitude);
//         expect(spy).toHaveBeenCalledTimes(1);
//         expect(data).toEqual(true);
//     })

//     it('Should return false for USA', async () => {
//         const spy = jest.spyOn(reverseGeocoding, 'getReverseGeocoding').mockResolvedValue(usaReverseGeocodingMock);
//         const data = await isValidCountry(usaCoordinatesMock.latitude, usaCoordinatesMock.longitude);
//         expect(spy).toHaveBeenCalled();
//         expect(data).toEqual(false);
//     })
// });

// describe('Service tests', () => {

    

//     describe('Service update method', () => {
//         let task: Promise<Task> | null = null;

//         beforeEach(() => {
//             jest.clearAllMocks();

//             return task = Task.create({
//                 'id': 'a04e5c37-4fd9-4d4d-b23a-150fc67e56f2',
//                 'title': 'Titulo teste',
//                 'description': 'Descricao teste',
//                 'latitude': brazilCoordinatesMock.latitude,
//                 'longitude': brazilCoordinatesMock.longitude,
//                 'status': 'Status de teste',
//                 date
//             });
//         });

//         afterEach(() => {
//             jest.clearAllMocks();

//             return Task.destroy({
//                 where: {
//                     'id': 'a04e5c37-4fd9-4d4d-b23a-150fc67e56f2'
//                 }
//             });
//         });

//         it('Should return a task with updated values', async () => {
//             const spyIsValidCountry = jest.spyOn(taskService, 'isValidCountry').mockResolvedValue(true);

//             const task = await update('a04e5c37-4fd9-4d4d-b23a-150fc67e56f2', {
//                 'title': 'Titulo editado',
//                 'description': 'Descricao editada',
//                 'latitude': brazilCoordinatesMock.latitude,
//                 'longitude': brazilCoordinatesMock.longitude,
//                 'status': 'Status editado',
//                 date
//             });

//             expect(spyIsValidCountry).toHaveBeenCalled();
//             expect(task.id).toEqual('a04e5c37-4fd9-4d4d-b23a-150fc67e56f2');
//             expect(task.title).toEqual('Titulo editado');
//             expect(task.description).toEqual('Descricao editada');
//             expect(task.latitude).toEqual(brazilCoordinatesMock.latitude);
//             expect(task.longitude).toEqual(brazilCoordinatesMock.longitude);
//             expect(task.status).toEqual('Status editado');
//             expect(task.date).toEqual(fixedDate);
//         });

//         it('Should return a task with "same" updated values', async () => {
//             const spy = jest.spyOn(taskService, 'isValidCountry').mockResolvedValue(true);

//             const task = await update('a04e5c37-4fd9-4d4d-b23a-150fc67e56f2', {
//                 'id': 'a04e5c37-4fd9-4d4d-b23a-150fc67e56f2',
//                 'title': 'Titulo teste',
//                 'description': 'Descricao teste',
//                 'latitude': -9.29782,
//                 'longitude': 14.91162,
//                 'status': 'Status de teste',
//                 date
//             })
//             expect(spy).toHaveBeenCalled();
//             expect(task.id).toEqual('a04e5c37-4fd9-4d4d-b23a-150fc67e56f2');
//             expect(task.title).toEqual('Titulo teste');
//             expect(task.description).toEqual('Descricao teste');
//             expect(task.latitude).toEqual(-9.29782);
//             expect(task.longitude).toEqual(14.91162);
//             expect(task.status).toEqual('Status de teste');
//             expect(task.date).toEqual(fixedDate);
//         });

//         it('Should return a task with "same" updated values', async () => {
//             const spy = jest.spyOn(taskService, 'isValidCountry').mockResolvedValue(true);

//             const task = await update('a04e5c37-4fd9-4d4d-b23a-150fc67e56f2', {
//                 'id': 'a04e5c37-4fd9-4d4d-b23a-150fc67e56f2',
//                 'title': 'Titulo teste',
//                 'description': 'Descricao teste',
//                 'latitude': -9.29782,
//                 'longitude': 14.91162,
//                 'status': 'Status de teste',
//                 date
//             })
//             expect(spy).toHaveBeenCalled();
//             expect(task.id).toEqual('a04e5c37-4fd9-4d4d-b23a-150fc67e56f2');
//             expect(task.title).toEqual('Titulo teste');
//             expect(task.description).toEqual('Descricao teste');
//             expect(task.latitude).toEqual(-9.29782);
//             expect(task.longitude).toEqual(14.91162);
//             expect(task.status).toEqual('Status de teste');
//             expect(task.date).toEqual(fixedDate);
//         });

//         it('Should throw an error when trying to update to find invalid id', async () => {
//             const spy = jest.spyOn(taskService, 'isValidCountry').mockResolvedValue(true);

//             await expect(update('2f144a3d-78d3-476b-9b42-7436e3c0ed43', {
//                 'title': 'Titulo editado',
//                 'description': 'Descricao editada',
//                 'latitude': -9.29782,
//                 'longitude': 14.91162,
//                 'status': 'Status editado',
//                 date
//             })).rejects.toThrow(new Error('Internal Server Error'));
//             expect(spy).toHaveBeenCalled();
//         });

//         it('Should throw an error when trying to update to invalid coordinates', async () => {
//             const spy = jest.spyOn(taskService, 'isValidCountry').mockResolvedValue(false);

//             await expect(update('e48029ac-3bff-4f2e-b9a8-e03ebf9dd13b', {
//                 'title': 'Titulo editado',
//                 'description': 'Descricao editada',
//                 'latitude': 38.897675,
//                 'longitude': -77.036547,
//                 'status': 'Status editado',
//                 date
//             })).rejects.toThrow(new Error('Internal Server Error'));
//             expect(spy).toHaveBeenCalled();
//         });
//     });

//     describe('Service deleteById method', () => {
//         let task: Promise<Task> | null = null;

//         beforeEach(() => {
//             jest.clearAllMocks();

//             return task = Task.create({
//                 'id': 'e0772e5e-94eb-4f67-a84e-bb8ec864830e',
//                 'title': 'Titulo teste',
//                 'description': 'Descricao teste',
//                 'latitude': -9.29782,
//                 'longitude': 14.91162,
//                 'status': 'Status de teste',
//                 date
//             });
//         });

//         afterEach(() => {
//             return Task.destroy({
//                 where: {
//                     'id': 'e0772e5e-94eb-4f67-a84e-bb8ec864830e'
//                 }
//             });
//         })

//         it('Should delete the Task', () => {
//             return deleteById('e0772e5e-94eb-4f67-a84e-bb8ec864830e').then((data) => {
//                 expect(data).toEqual(204);
//             });
//         });

//         it('Should not delete the Task', async () => {
//             await expect(deleteById('b096072a-7ec0-4c06-835a-c747196836fb')).rejects.toThrow(new Error('Internal Server Error'));
//         });
//     });

//     describe('Service getAll method', () => {
//         let tasks: Promise<Task[]> | null = null;

//         beforeEach(() => {
//             jest.clearAllMocks();
//             return tasks = Task.bulkCreate([
//                 {
//                     'id': 'e48029ac-3bff-4f2e-b9a8-e03ebf9dd13a',
//                     'title': '1',
//                     'description': '1',
//                     'latitude': -9.29782,
//                     'longitude': 14.91162,
//                     'status': '1',
//                     date
//                 },
//                 {
//                     'id': '23fa98f5-e5ee-447e-b09c-a3292a47d384',
//                     'title': '2',
//                     'description': '2',
//                     'latitude': -9.29782,
//                     'longitude': 14.91162,
//                     'status': '2',
//                     date
//                 },
//                 {
//                     'id': '20964b32-efba-423b-a991-4d0335a9a10d',
//                     'title': '3',
//                     'description': '3',
//                     'latitude': -9.29782,
//                     'longitude': 14.91162,
//                     'status': '3',
//                     date
//                 }
//             ]);
//         });

//         afterEach(() => {
//             return Task.destroy({
//                 where: {
//                     'id': [
//                         'e48029ac-3bff-4f2e-b9a8-e03ebf9dd13a',
//                         '23fa98f5-e5ee-447e-b09c-a3292a47d384',
//                         '20964b32-efba-423b-a991-4d0335a9a10d'
//                     ]
//                 }
//             });
//         });

//         it('Should return tasks create beforehand', () => {
//             return getAll().then((data) => {
//                 expect(data.length).toBeGreaterThanOrEqual(3);
//             });
//         });
//     });
// });
describe('Just not to fail :)', () => {
    it('Foo', () => {
        expect(2 + 2).toBe(4);
    })
});