const Workspace = require('./Workspace.model');
import { userServices } from '../users/Users.service';
import { IBaseWorkspace } from './Workspace.types';

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

export async function addNewWorkspace(data: any) {
    const creatorId = data.user_id;
    const getCreatorDetails = await userServices().getSingleUser(creatorId);
    console.log(getCreatorDetails);
    
    if(!getCreatorDetails) {
        return {
            status: 401,
            isSuccessful: false,
            message: "An error occured while creating this workspace. Please, try again!",
            data: null
        }
    }
    try {
        const workspace = await Workspace
            .create({
                title: data.title,
                type: data.type,
                description: data.description ? data.description : null,
                members: [{
                   _id: getCreatorDetails.data._id,
                    fullName: getCreatorDetails.data.fullName,
                    email: getCreatorDetails.data.email,
                    username: getCreatorDetails.data.username,
                    createdAt: getCreatorDetails.data.createdAt,
                    updatedAt: getCreatorDetails.data.updatedAt,
                    status: 'admin'
                }],
                activities: null,
                boards: null,
                cards: null,
                createdBy: {
                     _id: getCreatorDetails.data._id,
                    email: getCreatorDetails.data.email,
                    fullName: getCreatorDetails.data.fullName,
                    username: getCreatorDetails.data.username
                }
            })
        if(!workspace) {
            return {
                status: 401,
                isSuccessful: false,
                message: "An error occured while creating this workspace. Please, try again!",
                data: null
            }
        }
        return {
            status: 201,
            isSuccessful: true,
            message: "Operation successful!",
            data: workspace
        }
    } catch(err) {
        console.error(err)
        return {
            status: 400,
            isSuccessful: false,
            message: "Service error!",
        }
    }
}

export async function getSingleWorkspace(id: string) {
    try {
        // do a check to see if an id is passed as an argument.
        // If no id, then return false
        if(!id) {
            return {
                status: 401,
                isSuccessful: false,
                message: "Workspace Id is required!",
            }
        }
        // else continue
        const workspace = await Workspace.findOne({ _id: id }).lean().exec()

        // if no workspace was found on the db, then return false
        if(!workspace) {
            return {
                status: 404,
                isSuccessful: false,
                message: "Workspace not found!",
            }
        } else {
            return {
                status: 200,
                isSuccessful: true,
                message: "Operation successful!",
                data: workspace
            }
        }
    } catch(err) {
        console.error(err)
        return {
            status: 400,
            isSuccessful: false,
            message: "An error occurred",
        }
    }
}

/* 
{
    "title": "New Test workspace One",
    "type": "Marketing",
    "description": "This is a space for the development of...",
    "members": [
        {
           "_id": "610d4bb1815febe72d4ef5e2",
            "fullName": "Uzoamaka Test",
            "email": "test2@gmail.com",
            "username": "Test username two",
            "createdAt": "2021-08-06T14:48:17.229Z",
            "updatedAt": "2021-08-06T14:48:17.229Z",
            "status": "admin"
        }
    ],
    "activities": null,
    "boards": null,
    "cards": null,
   "createdBy": {
        "fullName": "Uzoamaka Test",
        "email": "test2@gmail.com",
        "username": "Test username two"
    }
}



*/