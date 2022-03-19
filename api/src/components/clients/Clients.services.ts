const Client = require('./Clients.model');
import { Query, QueryStrings } from '../../utils/validators/queries';
import { getSingleUser } from '../users/Users.service';
const User = require('../users/Users.model');
import { 
    IClientFetchAllResponse, 
    IClientPayload,
    IBaseClient
} from './Clients.types';

// Find all users
export async function getAllClients(): Promise<IClientFetchAllResponse> {
    try {

        const clients = await Client
            .find({})
            .limit(20)
            .lean()
            .exec()

        // const computedTotalPages
        return {
            status: 200,
            isSuccessful: true,
            message: "Operation successful!",
            data: {
                info: clients,
                pageDetails: {
                    currentPage: 1,
                    pageSize: 20,
                    total: clients.length,
                    totalPages: Math.ceil(clients.length / 20),
                }
            }
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
                message: "User id is incorrect!",
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
            .limit(20)
            .lean() // to get plain javascript objects
            .exec()
        return {
            status: 200,
            isSuccessful: true,
            message: "Operation successful!",
            data: {
                info: clients,
                pageDetails: {
                    total: clients.length,
                    currentPage: 1,
                    // totalPages: ,
                    pageSize: 20
                }
            }
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

export async function addNewClient(data: IBaseClient) {
    const creatorId = data.user_id;
    const getCreatorDetails = await getSingleUser(creatorId);
    
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
                email: data.email,
                // projects: data.projects, // TO DO
                phone_number: data.phone_number,
                country: data.country,
                address: data.address
            })
        
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
        const filter = { _id: data.id, };
        const update = { name: data.name };
        // else continue
        const updatedClient = await Client
            .findOneAndUpdate(filter, update, { new: true})
            .exec()
                    
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

export async function search (queryStrings: QueryStrings) {    
    try {
        let buildQuery = {} as Query;
        let page = Number(queryStrings.page) || 1;
        let limit = parseInt(queryStrings.limit) || 20;
        let offset = page ? (page - 1) * limit : 0; 
        let userId = queryStrings.userId || '';
        let download = queryStrings.download ? queryStrings.download : 0
        
        // 
        if (queryStrings.email) {
            const email = new RegExp(`^${queryStrings.email}$`, 'i');

            buildQuery.where = { ...buildQuery.where, email: email }  // make email a case insensitive match
        }
        if (queryStrings.name) {      
            const nameQuery = new RegExp(`^${queryStrings.name}$`, 'i');

            buildQuery.where = { ...buildQuery.where, name: nameQuery } // make name a case insensitive match
        }

        if (userId) {
            buildQuery.where = { ...buildQuery.where, user_id: userId }
        }
        // TO DO: add a download feature/option

        if (download === 1) {
            limit = 1000
            // buildQuery.raw = true
        } else {
            limit = limit
        }

        console.log('buildQuery.where:', buildQuery.where);

        const clients = await Client.find(buildQuery.where).limit(limit).skip(offset).sort({createdAt: -1}).lean();
        const totalPages = Math.ceil(clients.length / limit);
        // const pageSize = Math.ceil(clients.length / limit);

        return {
            status: 200,
            isSuccessful: true,
            message: "Operation successful!",
            data: {
                info: clients,
                pageDetails: {
                    total: clients.length,
                    currentPage: 1,
                    totalPages: totalPages,
                    pageSize: 20
                }
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