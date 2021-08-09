import { Request, Response } from 'express';
import { getAllWorkspaces } from './Workspace.services';

// Controller to create a new workspace
export const addNewWorkspace = async (req: Request, res: Response) => {
  // const newUser:IWorkspaceInput = req.body;

  // try {
  //   // const doc = await userServices().createNewUser({ ...req.body, newUser })
  //   const doc = await userServices().createNewUser(newUser)
  //   return res.status(201).json(doc)
  // } catch (e) {
  //   console.error("error for controllers:", e)
  //   return res.status(400).json(e).end()
  // }
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