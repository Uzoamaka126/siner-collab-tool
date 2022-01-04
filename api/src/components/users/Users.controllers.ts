import { Request, Response } from 'express';
import { getSingleUser, getAllUsers, updateASingleUser, removeAUser } from './Users.service';

export const fetchSingleUser = async (req: Request, res: Response) => {
  try {
      const user = await getSingleUser(req.params.id)

      if(!user.isSuccessful === false) {
          return res.status(404).json(user)
      } else {
          return res.status(200).json(user)
      }
  } catch (err) {
      console.error(err)
      // res.status(400).end()
      res.status(400)
      res.send({ error: "This user does not exist!" })
  }
}

export const fetchAllUsers = async (req: Request, res: Response) => {
  try {
      const users = await getAllUsers()

      if(!users.isSuccessful === false) {
          return res.status(404).json(users)
      } else {
          return res.status(200).json(users)
      }
  } catch (err) {
      console.error(err)
      return res.status(400).send({ error: "An error occurred!" }).end()
  }
}

// update a user's details
export const updateAUserController = async (req: Request, res: Response) => {
  const { body, params: { id } } = req;
  try {
    const response = await updateASingleUser(body, id);
    return res.status(response.status).json(response)
  } catch (e) {
    console.error(e)
    return res.status(400).end()
  }
}

export const deleteAUser = async (req: Request, res: Response) => {
  try {
    const response = await removeAUser(req.params.id)

    if (!response) {
      return res.status(400).end()
    }

    return res.status(200).json({ data: response })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}