import { GetAllTasks } from './../usecases/getAllTasks/getAllTasks';
import { DeleteTaskById } from './../usecases/deleteTaskById/deleteTaskById';
import { UpdateTask } from './../usecases/updateTask/updateTask';
import { GetTaskById } from './../usecases/getTaskById/getTaskById';
import { Router, Request, Response } from 'express';
import { CreateTask } from '../usecases/createTask/createTask';
import { TaskRepository } from '../repository/taskRepository';

const tasksRouter = Router();

const taskRepository = new TaskRepository();

tasksRouter.post('/', async (req: Request, res: Response) => {
    try {
        const payload = req.body;
        const createTask = new CreateTask(taskRepository);
        const task = await createTask.execute(payload);
        return res.status(200).send(task);
    } catch (error) {
        return res.status(500).send(error);
    }
});

tasksRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const getTaskById = new GetTaskById(taskRepository);
        const task = await getTaskById.execute(id);
        return res.status(200).send(task);
    } catch (error) {
        return res.status(500).send(error);
    }
});

tasksRouter.put('/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const payload = req.body;
        const updateTask = new UpdateTask(taskRepository);
        const task = await updateTask.execute(id, payload);
        return res.status(200).send(task);
    } catch (error) {
        return res.status(500).send(error);
    }
});

tasksRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const deleteTaskById = new DeleteTaskById(taskRepository);
        const status = await deleteTaskById.execute(id);
        return res.status(status).send();
    } catch (error) {
        return res.status(500).send(error);
    }
});

tasksRouter.get('/', async (req: Request, res: Response) => {
    try {
        const getAllTasks = new GetAllTasks(taskRepository);
        const tasks = await getAllTasks.execute();
        return res.status(200).send(tasks);
    } catch (error) {
        return res.status(500).send(error);
    }
});

export default tasksRouter;