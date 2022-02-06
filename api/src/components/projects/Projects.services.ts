const Client = require('./Clients.model');
import { getSingleUser } from '../users/Users.service';
const User = require('../users/Users.model');
import { 
    IClientRequestPayload, 
    IClientSingleRequestPayload, 
    IClientFetchAllResponse, 
    IClientPayload
} from './Projects.types';

// Find all users
export async function getAllClients(): Promise<IClientFetchAllResponse> {
    try {
        const clients = await Client
            .find({})
            .lean()
            .exec()
        return {
            status: 200,
            isSuccessful: true,
            message: "Operation successful!",
            data: clients
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

// Find a list of clients belonging to a specific user
export async function getUserClients(id: string) {
     try {
         if(id.length < 24) {
            return {
                status: 400,
                isSuccessful: true,
                message: "This id does not exist!",
                data: null
            }
         }
        //  get user
        const user = await User.findOne({ _id: id }).lean().exec()

        if (!user) {
            return {
                status: 404,
                isSuccessful: false,
                message: "This user does not exist!",
            }
        }
        //  select clients that match with the passed in user id
        const clients = await Client
            .find({ user_id:  id })
            .lean() // to get plain javascript objects
            .exec()
        return {
            status: 200,
            isSuccessful: true,
            message: "Operation successful!",
            data: clients
        }
    } catch(err) {
        throw new Error(err);
        // return {
        //     status: err.status,
        //     isSuccessful: false,
        //     message: "An error occured",
        // }
    }
}

export async function addNewClient(data: IClientRequestPayload) {
    const creatorId = data.user_id;
    const getCreatorDetails = await getSingleUser(creatorId);
    // console.log("getCreatorDetails", getCreatorDetails);
    
    if(!getCreatorDetails.isSuccessful) {
        return {
            status: 401,
            isSuccessful: false,
            message: "An error occured while adding this client. Please, try again!",
            data: {}
        }
    }
    try {        
        const client = await Client
            .create({
                name: data.name,
                user_id: data.user_id,
                projects: []
            })
            // console.log(client);
        
        return {
            status: 201,
            isSuccessful: true,
            message: "Operation successful!",
            data: client
        }
    } catch(err) {
        console.error(err);
        return {
            status: 400,
            isSuccessful: false,
            message: "Service error!",
        }
    }
}

export async function getSingleClientById(id: string) {
    try {
        if (!id || typeof id !== 'string') {
            return {
                status: 401,
                isSuccessful: false,
                message: "string id is required!",
            }
        }
        const client = await Client.findOne({ _id: id }).lean().exec();
        console.log(client);

        // if no client was found on the db, then return false
        if(!client) {
            return {
                status: 404,
                isSuccessful: false,
                message: "Client not found!",
            }
        } else {
            return {
                status: 200,
                isSuccessful: true,
                message: "Operation successful!",
                data: client
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

export async function editSingleClientById(data: IClientPayload) {
    /* 
     "status": 200,
    "isSuccessful": true,
    "message": "Successful update!",
    "data": {
        "_id": "61edbfc4124d41e1a4fc8a36",
        "name": "Test update name 2",
        "user_id": "61edbd9ca3d644df266ba764",
        "createdAt": "2022-01-23T20:51:16.817Z",
        "updatedAt": "2022-02-06T12:17:28.277Z",
        "__v": 0
    } 
    */

    try {
        // do a check to see if an id is passed as an argument.
        // If no id, then return false
        if(!data.id) {
            return {
                status: 401,
                isSuccessful: false,
                message: "Client Id is required!",
            }
        }

        console.log(data);
        const filter = { _id: data.id, };
        const update = { name: data.name };
        // else continue
        const updatedClient = await Client
            .findOneAndUpdate(filter, update, { new: true})
            .exec()
            
        // console.log(updatedClient);
        
        return {
            status: 200,
            isSuccessful: true,
            message: "Successful update!",
            data: updatedClient
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

export async function deleteSingleClientById(id:string) {
    if(!id) {
        return {
            status: 401,
            isSuccessful: false,
            message: "client id must be provided!",
        }
    }
  try {
    const removedClient = await Client.findOneAndRemove({ _id: id })

    console.log(removedClient);

    if (!removedClient || removedClient === null) {
      return {
        status: 400,
        isSuccessful: false,
        message: "client not found",
       }
    } else {
    return {
        status: 200,
        isSuccessful: true,
        message: "client successfully deleted!",
        data: removedClient
    }
    }
  } catch (err) {
    console.error(err);
    // throw new Error(err);
    return {
        status: 400,
        isSuccessful: false,
        message: "An error occured during this operation",
        data: err
    }
  }
}

// projects
// export async function getProjects(data: ) {
//     try {
//         if (!data.id || typeof data.id !== 'string') {
//             return {
//                 status: 401,
//                 isSuccessful: false,
//                 message: "string id is required!",
//             }
//         }
//         const client = await Client.findOne({ _id: data.id }).lean().exec();
//         console.log(client);

//         // if no client was found on the db, then return false
//         if(!client) {
//             return {
//                 status: 404,
//                 isSuccessful: false,
//                 message: "Client not found!",
//             }
//         } else {
//             return {
//                 status: 200,
//                 isSuccessful: true,
//                 message: "Operation successful!",
//                 data: client
//             }
//         }
//     } catch(err) {
//         console.error(err)
//         return {
//             status: 400,
//             isSuccessful: false,
//             message: "An error occurred",
//         }
//     }
// }