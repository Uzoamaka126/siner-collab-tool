import { Request, Response } from 'express';
import { IUserInput, IBaseUser, IBaseUserLogin } from './User.types';
import { userServices, getAllUsers, loginAUser } from './Users.service';

export const fetchSingleUser = () => async (req: Request, res: Response) => {
    try {
        const user = await userServices().getSingleUser(req.params.id)

        if(!user.isSuccessful === false) {
            res.status(404).json(user)
        } else {
            res.status(200).json(user)
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
        const user = await getAllUsers()

        if(!user.isSuccessful === false) {
            return res.status(404).json(user)
        } else {
            return res.status(200).json(user)
        }
    } catch (err) {
        console.error(err)
        return res.status(400).send({ error: "An error occurred!" }).end()
    }
}

export const addNewUser = async (req: Request, res: Response) => {
  const newUser:IUserInput = req.body;

  try {
    // const doc = await userServices().createNewUser({ ...req.body, newUser })
    const doc = await userServices().createNewUser(newUser)
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

// loginAUser

// export const updateOne = model => async (req, res) => {
//   try {
//     const updatedDoc = await model
//       .findOneAndUpdate(
//         {
//           createdBy: req.user._id,
//           _id: req.params.id
//         },
//         req.body,
//         { new: true }
//       )
//       .lean()
//       .exec()

//     if (!updatedDoc) {
//       return res.status(400).end()
//     }

//     res.status(200).json({ data: updatedDoc })
//   } catch (e) {
//     console.error(e)
//     res.status(400).end()
//   }
// }

// export const removeOne = model => async (req, res) => {
//   try {
//     const removed = await model.findOneAndRemove({
//       createdBy: req.user._id,
//       _id: req.params.id
//     })

//     if (!removed) {
//       return res.status(400).end()
//     }

//     return res.status(200).json({ data: removed })
//   } catch (e) {
//     console.error(e)
//     res.status(400).end()
//   }
// }