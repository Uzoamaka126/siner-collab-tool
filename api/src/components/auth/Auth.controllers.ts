import { Request, Response } from 'express';
import { IUserInput } from '../users/User.types';
import { authServices, loginAUser } from './Auth.services';

export const addNewUser = async (req: Request, res: Response) => {
  const newUser:IUserInput = req.body;

  try {
    const doc = await authServices().createNewUser(newUser)
    return res.status(201).json(doc)
  } catch (e) {
    console.error("error for controllers:", e)
    return res.status(400).json(e).end()
  }
}

// sign in a user
export const signInUserController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: 'Email or password is missing' })
  }

  try {
    const response = await loginAUser({ email, password })
    return res.status(response.status).json(response)
  } catch (e) {
    console.error("error for controllers:", e)
    return res.status(400).json(e).end()
  }
}