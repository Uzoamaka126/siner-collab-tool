const Workspace = require('./Workspace.model');

// export const getSingleUser = () => async (id: string) => {
//     try {
//         // do a check to see if an id is passed as an argument.
//         // If no id, then return false
//         if(!id) {
//             return {
//                 status: 401,
//                 isSuccessful: false,
//                 message: "User Id required!",
//             }
//         }
//         // else continue
//         const user = await Workspace
//             .findOne({ _id: id })
//             .lean()
//             .exec()

//         console.log("userData:", user);
//         console.log("type of user:", typeof user);
            
//         // if no user was found on the db, then return false
//         if(!user) {
//             return {
//                 status: 404,
//                 isSuccessful: false,
//                 message: "User not found!",
//             }
//         } else {
//             return {
//                 status: 200,
//                 isSuccessful: true,
//                 message: "Operation successful!",
//                 data: user
//             }
//         }
//     } catch(err) {
//         console.error(err)
//         return {
//             status: 400,
//             isSuccessful: false,
//             message: "An error occured",
//         }
//     }
// }

// Find all users
export async function getAllWorkspaces() {
    try {
        const workspaces = await Workspace
            .find()
            .lean()
            .exec()
        return {
            status: 200,
            isSuccessful: true,
            message: "Operation successful!",
            data: workspaces
        }
    } catch(err) {
        console.error(err)
        return {
            status: 400,
            isSuccessful: false,
            message: "An error occured",
        }
    }
}
