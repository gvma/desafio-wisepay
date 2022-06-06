import { create, getById, update, deleteById, getAll } from '../services/task.services';
import { Router, Request, Response } from 'express';

const tasksRouter = Router();

tasksRouter.post('/', async (req: Request, res: Response) => {
    try {
        const payload = req.body;
        const task = await create(payload);
        return res.status(200).send(task);
    } catch (error) {
        return res.status(500).send(error);
    }
});

tasksRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const task = await getById(id);
        return res.status(200).send(task);
    } catch (error) {
        return res.status(500).send(error);
    }
});

tasksRouter.put('/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const payload = req.body;
        const task = await update(id, payload);
        return res.status(200).send(task);
    } catch (error) {
        return res.status(500).send(error);
    }
});

tasksRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const status = await deleteById(id);
        return res.status(status).send();
    } catch (error) {
        return res.status(500).send(error);
    }
});

tasksRouter.get('/', async (req: Request, res: Response) => {
    try {
        const tasks = await getAll();
        return res.status(200).send(tasks);
    } catch (error) {
        return res.status(500).send(error);
    }
});

export default tasksRouter;