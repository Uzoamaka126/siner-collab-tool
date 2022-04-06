import { Request, Response } from 'express';
import { IUserInput } from '../users/User.types';
import { createNewUser, loginAUser, requestPasswordReset, resetPassword } from './Auth.services';

export const addNewUser = async (req: Request, res: Response) => {
  const newUser:IUserInput = req.body;

  try {
    const doc = await createNewUser(newUser)
    return res.status(doc.status).json(doc)
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

// Initiate password reset request
export const intiatePasswordReset = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const response = await requestPasswordReset(email)
    return res.status(response.status).json(response)
  } catch (e) {
    console.error("error for controllers:", e)
    return res.status(400).json(e).end()
  }
}

//Complete initiated password reset request
export const completePasswordReset = async (req: Request, res: Response) => {
  try {
    const response = await resetPassword(req.body)
    return res.status(response.status).json(response)
  } catch (e) {
    console.error("error for controllers:", e)
    return res.status(400).json(e).end()
  }
}