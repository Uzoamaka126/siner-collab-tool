import { Request, Response } from 'express';
import { userServices } from './Users.service';
import { IUserInput, IBaseUser, IUserBaseDocument } from './User.types';

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

export const fetchAllUsers = () => async(req: Request, res: Response) => {
    // try {
    //     const user = await userServices().getAllUsers()

    //     if(!user.isSuccessful === false) {
    //         return res.status(404).json(user)
    //     } else {
    //         return res.status(200).json(user)
    //     }
    // } catch (err) {
    //     console.error(err)
    //     return res.status(400).end()
    //     // res.send({ error: "An error occurred!" })
    // }
    console.log('Hey there!');
    
}

// export const createOne = () => async (req: Request, res: Response): Promise<IUserBaseDocument> => {
//   const newUser:IUserInput = req.body;

//   try {
//     const doc = await userServices.create({ ...req.body, newUser })
//     res.status(201).json({ data: doc })
//   } catch (e) {
//     console.error(e)
//     res.status(400).end()
//   }
// }

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