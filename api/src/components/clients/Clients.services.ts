const Client = require('./Clients.model');
import { Query } from '../../utils/validators/queries';
import { getSingleUser } from '../users/Users.service';
const User = require('../users/Users.model');
import { 
    IClientRequestPayload, 
    IClientFetchAllResponse, 
    IClientPayload,
    IBaseClient
} from './Clients.types';

// Find all users
export async function getAllClients({ email, name, page, limit, offset }: Query): Promise<IClientFetchAllResponse> {
    try {
        let query = {} as Query;
        if(email) query.email = email
        if(name) query.name = name
        if(page) query.page = page
        if(limit) query.limit = limit
        if(offset) query.offset = offset

        const filterObject = { ...query }

        const clients = await Client
            .find(filterObject)
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
                    totalPages: ,
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
            data: {
                info: clients,
                pageDetails: {
                    total: clients.length,
                    currentPage: 1,
                    totalPages: ,
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

export async function searchClient(query: Query) {
    // check for allowed queries
    try {
        const { email, name, page, limit } = query 
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
                data: {
                    info: client,
                    pageDetails: {
                        total: clients.length,
                        currentPage: 1,
                        totalPages: ,
                        pageSize: 20
                    }
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