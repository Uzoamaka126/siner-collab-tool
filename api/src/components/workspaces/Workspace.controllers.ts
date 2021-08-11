import { Request, Response } from 'express';
import { getAllWorkspaces, addNewWorkspace, getSingleWorkspace, editSingleWorkspace } from './Workspace.services';
import { IWorkspaceInput } from './Workspace.types';

// Controller to create a new workspace
export const createANewWorkspace = async (req: Request, res: Response) => {
  const newUser:IWorkspaceInput = req.body;

  try {
    const response = await addNewWorkspace(newUser);
    return res.status(response.status).json(response)
  } catch (e) {
    console.error("error for controllers:", e)
    return res.status(400).json(e).end()
  }
}

// Controller to fetch all workspaces
export const fetchAllWorkspace = async (req: Request, res: Response) => {
  try {
    const workspaces = await getAllWorkspaces()

    if(!workspaces.isSuccessful === false) {
        return res.status(404).json(workspaces)
    } else {
        return res.status(200).json(workspaces)
    }
  } catch (err) {
    console.error(err)
    return res.status(400).send({ error: "An error occurred!" }).end()
  }
}

// Find a single workspace
export const fetchSingleWorkspace = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const response = await getSingleWorkspace(id);
    return res.status(response.status).json(response)
  } catch(err) {
      console.error(err)
      return res.status(400).send({ error: "An error occurred!" }).end()
  }
}

// Find a single workspace
export const updateASingleWorkspace = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const response = await editSingleWorkspace(id);
    return res.status(response.status).json(response)
  } catch(err) {
      console.error(err)
      return res.status(400).send({ error: "An error occurred!" }).end()
  }
}
