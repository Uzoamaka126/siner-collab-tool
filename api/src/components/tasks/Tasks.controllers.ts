import { Request, Response } from 'express';
import { RequestCustom } from '../../utils/middleware/express';
import TagControllers from './Tasks.services';
import { IBaseTask } from './Tasks.types';

// Controller to create a new task
export const createNewTask = async (req: Request, res: Response) => {
  const data: IBaseTask = req.body;

  try {
    const response = await TagControllers.addNewTask(data);    
    return res.status(response.status).json(response)
  } catch (e) {
    console.error("error for controllers:", e)
    return res.status(400).json(e).end()
  }
}

// Controller to fetch all tasks
export const fetchAllTasks = async (req: Request, res: Response) => {
  try {
    const response = await TagControllers.getAllTasks()
    return res.status(404).json(response);
  } catch (err) {
    console.error(err)
    return res.status(400).send({ error: "An error occurred!" }).end()
  }
}

// Find all tasks belonging to a particular project
export const fetchTasks = async (req: RequestCustom, res: Response) => {
  const query = req.query;
  const userId = req.user._id;

  try {
    const response = await TagControllers.getTasks(query, userId)
    return res.status(response.status).json(response)
  } catch(err) {
    console.error(err)
    return res.status(400).send({ error: "An error occurred!" }).end()
  }
}

// Update a single tag
export const updateTask = async (req: Request, res: Response) => {
  const _id = req.params.id;

  const data = {
    name: req.body?.name,
    isCompleted: req.body.isCompleted,
  }
  try {
    const response = await TagControllers.editTask(_id, data);
    return res.status(response.status).json(response)
  } catch(err) {
      console.error(err)
      return res.status(400).send({ error: "An error occurred!" }).end()
  }
}

export const removeTask = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const response = await TagControllers.deleteTask(id);
    return res.status(response.status).json(response)
  } catch(err) {
      console.error(err)
      return res.status(400).send({ error: "An error occurred!" }).end()
  }
}