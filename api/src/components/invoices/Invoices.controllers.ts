import { Request, Response } from 'express';
import { RequestCustom } from '../../utils/middleware/express';
import { 
  getAllInvoices,
  getInvoice,
  removeInvoice,
  addNewInvoice,
  editInvoice,
  getInvoices
} from './Invoices.services';
import { IBaseInvoice } from './Invoices.types';

// Controller to create a new workspace
export const createNewInvoice = async (req: Request, res: Response) => {
  const newInvoice:IBaseInvoice = req.body;

  try {
    const response = await addNewInvoice(newInvoice);
    return res.status(response.status).json(response)
  } catch (e) {
    console.error("error for controllers:", e)
    return res.status(400).json(e).end()
  }
}

// Controller to fetch all workspaces
export const fetchAllInvoices = async (req: Request, res: Response) => {
  try {
    const invoices = await getAllInvoices()

    if(!invoices.isSuccessful === false) {
        return res.status(404).json(invoices)
    } else {
        return res.status(200).json(invoices)
    }
  } catch (err) {
    console.error(err)
    return res.status(400).send({ error: "An error occurred!" }).end()
  }
}

export const fetchInvoices = async (req: RequestCustom, res: Response) => {
  try {
    const query = req.query;
    const userId = req.user._id;

    const invoices = await getInvoices(query, userId)

    if(!invoices.isSuccessful === false) {
        return res.status(404).json(invoices)
    } else {
        return res.status(200).json(invoices)
    }
  } catch (err) {
    console.error(err)
    return res.status(400).send({ error: "An error occurred!" }).end()
  }
}

// Find a single workspace
export const fetchInvoice = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const response = await getInvoice(id);
    return res.status(response.status).json(response)
  } catch(err) {
      console.error(err)
      return res.status(400).send({ error: "An error occurred!" }).end()
  }
}

// Update a single workspace
export const updateASingleWorkspace = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const response = await editInvoice(req.body, id);
    return res.status(response.status).json(response)
  } catch(err) {
    console.error(err)
    return res.status(400).send({ error: "An error occurred!" }).end()
  }
}

export const deleteInvoice= async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const response = await removeInvoice(id);
    return res.status(response.status).json(response)
  } catch(err) {
    console.error(err)
    return res.status(400).send({ error: "An error occurred!" }).end()
  }
}