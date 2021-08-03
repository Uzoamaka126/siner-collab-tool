import { Request, Response } from 'express';
import { userServices } from './Users.service';

export const fetchSingleUser = () => async (req: Request, res: Response) => {
    try {
        const user = await userServices().getSingleUser(req.body.id)

        if(!user.isSuccessful === false) {
            res.status(404).json(user)
        } else {
            res.status(200).json(user)
        }
    } catch (err) {
        console.error(err)
        res.status(400).end()
    }
}

export const fetchAllUsers = () => async(req: Request, res: Response) => {
    try {
        const user = await userServices().getAllUsers()

        if(!user.isSuccessful === false) {
            res.status(404).json(user)
        } else {
            res.status(200).json(user)
        }
    } catch (err) {
        console.error(err)
        res.status(400).end()
    }
}