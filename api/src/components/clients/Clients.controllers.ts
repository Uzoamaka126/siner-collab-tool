import { Request, Response } from 'express';
import { 
  getAllClients, 
  addNewClient, 
  getUserClients, 
  editSingleClientById,
  deleteSingleClientById,
  getSingleClientById
} from './Clients.services';
import { IClientRequestPayload } from './Clients.types';

// Controller to create a new workspace
export const createANewClient = async (req: Request, res: Response) => {
  const newUser:IClientRequestPayload = req.body;

  try {
    const response = await addNewClient(newUser);
    
    return res.status(response.status).json(response)
  } catch (e) {
    console.error("error for controllers:", e)
    return res.status(400).json(e).end()
  }
}

// Controller to fetch all clients
export const fetchAllClients = async (req: Request, res: Response) => {
  try {
    const clients = await getAllClients()

    if(!clients.isSuccessful) {
        return res.status(404).json(clients)
    } else {
        return res.status(200).json(clients)
    }
  } catch (err) {
    console.error(err)
    return res.status(400).send({ error: "An error occurred!" }).end()
  }
}

// Find all clients belonging to a particular user
export const fetchUserClients = async (req: Request, res: Response) => {
  const id = req.body.user_id;
  try {
    const response = await getUserClients(id);
    return res.status(response.status).json(response)
  } catch(err) {
      console.error(err)
      return res.status(400).send({ error: "An error occurred!" }).end()
  }
}

// Find a single client by client id
export const fetchSingleClient = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const response = await getSingleClientById(id);    
    return res.status(response.status).json(response)
  } catch(err) {
      console.error(err)
      return res.status(400).send({ error: "An error occurred!" }).end()
  }
}


// Update a single workspace
export const updateSingleClient= async (req: Request, res: Response) => {
  const id = req.params.id;
  if(!req.body.name) return res.status(400).send({ error: "An error occurred!" }).end()

  const data = {
    name: req.body?.name,
    id
  }
  try {
    const response = await editSingleClientById(data);
    return res.status(response.status).json(response)
  } catch(err) {
      console.error(err)
      return res.status(400).send({ error: "An error occurred!" }).end()
  }
}

export const removeSingleClient = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const response = await deleteSingleClientById(id);
    return res.status(response.status).json(response)
  } catch(err) {
      console.error(err)
      return res.status(400).send({ error: "An error occurred!" }).end()
  }
}