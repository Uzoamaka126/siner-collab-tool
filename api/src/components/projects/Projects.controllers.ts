import { Request, Response } from 'express';
import ProjectServices from './Projects.services';

import { IProjectCreatePayload } from './Projects.types';

// Controller to create a new workspace
export const createNewProject = async (req: Request, res: Response) => {
  const newProject:IProjectCreatePayload = req.body;

  try {
    const response = await ProjectServices.addNewProject(newProject);    
    return res.status(response.status).json(response)
  } catch (e) {
    console.error("error for controllers:", e)
    return res.status(400).json(e).end()
  }
}

// Controller to fetch all projects
export const fetchAllProjects = async (req: Request, res: Response) => {
  try {
    const response = await ProjectServices.getAllProjects()
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
    const response = await ProjectServices.getUserProjects(id);
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
    const response = await ProjectServices.getProjectById(id);    
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
    const response = await ProjectServices.editProjectById(id, data);
    return res.status(response.status).json(response)
  } catch(err) {
      console.error(err)
      return res.status(400).send({ error: "An error occurred!" }).end()
  }
}

export const removeProject = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const response = await ProjectServices.deleteProjectById(id);
    return res.status(response.status).json(response)
  } catch(err) {
      console.error(err)
      return res.status(400).send({ error: "An error occurred!" }).end()
  }
}

export const removeProjectTag = async (req: Request, res: Response) => {
  const id = req.body.id;
  const tag_id = req.body.tag_id;
  const data = {
    id,
    tag_id
  }
  try {
    const response = await ProjectServices.deleteProjectTag(data);
    return res.status(response.status).json(response)
  } catch(err) {
      console.error(err)
      return res.status(400).send(err).end()
  }
}

// for all things project tags

// addProjectTag
export const addProjectTags = async (req: Request, res: Response) => {
  const { id, tags } = req.body;

  try {
    const response = await ProjectServices.addProjectTag(id, tags);
    return res.status(response.status).json(response)
  } catch(err) {
      console.error(err)
      return res.status(400).send({ error: "An error occurred!" }).end()
  }
}