import { Request, Response } from 'express';
import TagControllers from './Tags.services';
import { IBaseTag } from './Tags.types';

// Controller to create a new workspace
export const createNewTag = async (req: Request, res: Response) => {
  const data: IBaseTag = req.body;

  try {
    const response = await TagControllers.addNewTag(data);    
    return res.status(response.status).json(response)
  } catch (e) {
    console.error("error for controllers:", e)
    return res.status(400).json(e).end()
  }
}

// Controller to fetch all clients
export const fetchAllTags= async (req: Request, res: Response) => {
  try {
    const clients = await TagControllers.getAllTags()
    return res.status(404).json(clients);
  } catch (err) {
    console.error(err)
    return res.status(400).send({ error: "An error occurred!" }).end()
  }
}

// Find all clients belonging to a particular user
export const fetchUserTags = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const response = await TagControllers.getUserTags(id)
    return res.status(response.status).json(response)
  } catch(err) {
    console.error(err)
    return res.status(400).send({ error: "An error occurred!" }).end()
  }
}

// Update a single tag
export const updateTag = async (req: Request, res: Response) => {
  const _id = req.params.id;
  if(!req.body.name) return res.status(400).send({ error: "An error occurred!" }).end()

  const data = {
    name: req.body?.name,
    _id
  }
  try {
    const response = await TagControllers.editTagById(data);
    return res.status(response.status).json(response)
  } catch(err) {
      console.error(err)
      return res.status(400).send({ error: "An error occurred!" }).end()
  }
}

export const removeTag = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const response = await TagControllers.deleteTagById(id);
    return res.status(response.status).json(response)
  } catch(err) {
      console.error(err)
      return res.status(400).send({ error: "An error occurred!" }).end()
  }
}