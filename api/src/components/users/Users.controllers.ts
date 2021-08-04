import { Request, Response } from 'express';
import { userServices } from './Users.service';

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
    try {
        const user = await userServices().getAllUsers()

        if(!user.isSuccessful === false) {
            res.status(404).json(user)
        } else {
            res.status(200).json(user)
        }
    } catch (err) {
        console.error(err)
        res.status(400)
        res.send({ error: "An error occurred!" })
    }
}


// export const getMany = model => async (req, res) => {
//   try {
//     const docs = await model
//       .find({ createdBy: req.user._id })
//       .lean()
//       .exec()

//     res.status(200).json({ data: docs })
//   } catch (e) {
//     console.error(e)
//     res.status(400).end()
//   }
// }

// export const createOne = model => async (req, res) => {
//   const createdBy = req.user._id
//   try {
//     const doc = await model.create({ ...req.body, createdBy })
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