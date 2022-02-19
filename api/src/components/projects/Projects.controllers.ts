import { Request, Response } from 'express';
import ProjectControllers from './Projects.services';

import { IProjectCreatePayload } from './Projects.types';

// Controller to create a new workspace
export const createNewProject = async (req: Request, res: Response) => {
  const newProject:IProjectCreatePayload = req.body;

  try {
    const response = await ProjectControllers.addNewProject(newProject);    
    return res.status(response.status).json(response)
  } catch (e) {
    console.error("error for controllers:", e)
    return res.status(400).json(e).end()
  }
}

// Controller to fetch all projects
export const fetchAllProjects = async (req: Request, res: Response) => {
  try {
    const response = await ProjectControllers.getAllProjects()
    return res.status(response.status).json(response)
  } catch (err) {
    console.error(err)
    return res.status(400).send(err).end()
  }
}

// Find all projects belonging to a particular user
export const fetchUserProjects = async (req: Request, res: Response) => {
  const id = req.body.user_id;
  try {
    const response = await ProjectControllers.getUserProjects(id);
    return res.status(response.status).json(response)
  } catch(err) {
      console.error(err)
      return res.status(400).send(err).end()
  }
}

// Find a single project by id
export const fetchProject= async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const response = await ProjectControllers.getProjectById(id);    
    return res.status(response.status).json(response)
  } catch(err) {
      console.error(err)
      return res.status(400).send(err).end()
  }
}


// Update a single workspace
export const updateProject= async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  try {
    const response = await ProjectControllers.editProjectById(id, data);
    return res.status(response.status).json(response)
  } catch(err) {
      console.error(err)
      return res.status(400).send({ error: "An error occurred!" }).end()
  }
}

export const removeProject = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const response = await ProjectControllers.deleteProjectById(id);
    return res.status(response.status).json(response)
  } catch(err) {
      console.error(err)
      return res.status(400).send({ error: "An error occurred!" }).end()
  }
}