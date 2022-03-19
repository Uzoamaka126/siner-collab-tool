import { v4 as uuidv4 } from 'uuid';
const Invoices = require('./Invoices.model');
const User = require('../users/Users.model');
import { getSingleUser } from '../users/Users.service';
import { IBaseInvoice, IInvoiceResponsePayload, QueryStringsInvoice, InvoiceQueryData } from './Invoices.types';

// Find all users
export async function getAllInvoices() {
    try {
        const invoices = await Invoices.find().lean().exec()
        return {
            status: 200,
            isSuccessful: true,
            message: "Operation successful!",
            data: invoices
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

// Find a list of invoices belonging to a specific user
async function getUserInvoices (query: QueryStringsInvoice): Promise<IInvoiceResponsePayload>  {    
    try {
        let buildQuery = {} as InvoiceQueryData;
        let page = Number(query.page) || 1;
        let limit = parseInt(query.limit) || 20;
        let offset = page ? (page - 1) * limit : 0; 
        let userId = query.userId || '';
        let download = query.download ? query.download : 0

        if (offset) {
            buildQuery.offset = offset
        }
        
        // 
        if (userId) {
            buildQuery.where = { ...buildQuery.where, user_id: userId }
        }

        if (query.title) {
            const regexTitle = new RegExp(`^${query.title}$`, 'i');

            buildQuery.where = { ...buildQuery.where, title: regexTitle }  // make title a case insensitive match
        }

        if (query.clientName) {      
            const regexClientName = new RegExp(`^${query.clientName}$`, 'i');

            buildQuery.where = { ...buildQuery.where, client_name: regexClientName } // make client name a case insensitive match
        }

        if (query.status) {      
            buildQuery.where = { ...buildQuery.where, status: query.status }
        }
        
        // TO DO: add a download feature/option
        if (download === 1) {
            limit = 1000
        } else {
            limit = limit
        }

        console.log('buildQuery.where:', buildQuery.where);

        const projects = await Invoices.find(buildQuery.where).limit(limit).skip(buildQuery.offset).sort({ createdAt: -1 }).lean();
        const totalPages = Math.ceil(projects.length / limit);
        // const pageSize = Math.ceil(projects.length / limit); // TO DO *

        return {
            status: 200,
            isSuccessful: true,
            message: "Operation successful!",
            data: {
                info: projects,
                pageDetails: {
                    total: projects.length,
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
// Find a list of projects belonging to a specific user
async function getProjectInvoices(id: string): Promise<IProjectFetchResponse> {
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
        //  select projects that match with the passed in user id
        const clients = await Project
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

export async function addNewInvoice(data: IBaseInvoice) {
    const userId = data.user_id;
    const validateUser = await getSingleUser(userId);
    
    if(validateUser.isSuccessful === false) {
        return {
            status: 400,
            isSuccessful: false,
            message: "This user does not exist!",
            data: null
        }
    }
    try {
        const invoice = await Invoices.create({
            ...data,
            invoice_no: uuidv4(), // generate uuid
        })
        return {
            status: 201,
            isSuccessful: true,
            message: "Operation successful!",
            data: invoice
        }
    } catch(err) {
        console.error(err)
        return {
            status: 400,
            isSuccessful: false,
            message: err
        }
    }
}

export async function getInvoice(id: string) {
    try {
        const invoice = await Invoices.findOne({ _id: id }).lean().exec()

        // if no invoice was found on the db, then return false
        if(!invoice) {
            return {
                status: 404,
                isSuccessful: false,
                message: "invoice not found!",
            }
        } else {
            return {
                status: 200,
                isSuccessful: true,
                message: "Operation successful!",
                data: invoice
            }
        }
    } catch(err) {
        console.error(err)
        return {
            status: 400,
            isSuccessful: false,
            message: err
        }
    }
}

export async function editInvoice(data: any, id: string) {
    try {
        // do a check to see if an id is passed as an argument.
        // If no id, then return false
        if(!id) {
            return {
                status: 401,
                isSuccessful: false,
                message: "string id is required!",
            }
        }
        // else continue
        const updatedInvoice = await Invoices
            .findOneAndUpdate(
                { _id: id },
                data,
                { new: true }
            )
            .exec()
            
        // if no user was found on the db, then return false
        if(!updatedInvoice) {
            return {
                status: 404,
                isSuccessful: false,
                message: "Invoice not found!",
            }
        } else {
            return {
                status: 200,
                isSuccessful: true,
                message: "Successful update!",
                data: updatedInvoice
            }
        }
    } catch(err) {
        console.error(err)
        return {
            status: 400,
            isSuccessful: false,
            message: err
        }
    }
}

export async function removeInvoice(id:string) {
    if(!id) {
        return {
            status: 401,
            isSuccessful: false,
            message: "string invoice id is required!",
        }
    }
  try {
    const removedInvoice = await Invoices.findOneAndRemove({ _id: id })

    if (!removedInvoice) {
      return {
        status: 400,
        isSuccessful: false,
        message: "Invoice not found",
       }
    } else {
        return {
            status: 200,
            isSuccessful: true,
            message: "Invoice successfully deleted!",
            data: removedInvoice
        }
    }
  } catch (err) {
    console.error(err)
    return {
        status: 400,
        isSuccessful: false,
        message: err
    }
  }
}