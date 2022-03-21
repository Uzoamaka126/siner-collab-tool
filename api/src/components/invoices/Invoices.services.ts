import { generateInvoiceRefNumber } from '../../utils/validators/invoice';
import { v4 as uuidv4 } from 'uuid';
const Invoices = require('./Invoices.model');
const User = require('../users/Users.model');
import { getSingleUser } from '../users/Users.service';
import { IBaseInvoice, IInvoiceResponsePayload, QueryStringsInvoice, InvoiceQueryData } from './Invoices.types';
import { isSameDay } from '../../utils/dateUtilities';

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

// Find a list of invoices belonging to a specific user or project 
export async function getInvoices (query: QueryStringsInvoice, id: QueryStringsInvoice['userId']): Promise<IInvoiceResponsePayload>  {  
    // TODOs: strip and search by client email, date created and due date      
    try {
        let buildQuery = {} as InvoiceQueryData;
        let page = Number(query.page) || 1;
        let limit = parseInt(query.limit) || 20;
        let offset = page ? (page - 1) * limit : 0; 
        let download = query.download ? query.download : 0

        if (offset) {
            buildQuery.offset = offset
        }
        
        // 
        if (id) {
            buildQuery.where = { ...buildQuery.where, user_id: id }
        }

        if (query.projectId) {
            buildQuery.where = { ...buildQuery.where, project_id: query.projectId }
        }


        if (query.status) {
            const regexedStatus = new RegExp(`^${query.status}$`, 'i');

            buildQuery.where = { ...buildQuery.where, status: regexedStatus }  // make title a case insensitive match
        }

        if (query.clientName) {      
            const regexClientName = new RegExp(`^${query.clientName}$`, 'i');

            buildQuery.where = { ...buildQuery.where, client_name: regexClientName } // make client name a case insensitive match
        }
        
        // TO DO: add a download feature/option
        if (download === 1) {
            limit = 1000
        } else {
            limit = limit
        }

        console.log('buildQuery.where:', buildQuery.where);

        const invoices = await Invoices.find(buildQuery.where).limit(limit).skip(buildQuery.offset).sort({ createdAt: -1 }).lean();
        const totalPages = Math.ceil(invoices.length / limit);
        // const pageSize = Math.ceil(projects.length / limit); // TO DO *

        if (typeof invoices === 'undefined') {
            return {
                status: 400,
                isSuccessful: false,
                message: "An error occurred",
                data: null
            }
        }

        return {
            status: 200,
            isSuccessful: true,
            message: "Operation successful!",
            data: {
                invoices: invoices,
                pageDetails: {
                    total: invoices.length,
                    currentPage: page,
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

export async function addNewInvoice(data: IBaseInvoice, id: QueryStringsInvoice['userId']) {
    const userId = id;
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
        const currentDate = new Date();
        const dueDate = data.due_date

        const isDueDate = isSameDay(currentDate, dueDate)

        const invoice = await Invoices.create({
            ...data,
            user_id: userId,
            status: !!isDueDate ? "due" : "pending",
            invoice_no: generateInvoiceRefNumber(), // generate uuid
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
        const invoice = await Invoices.findOne({ _id: id }).lean()

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

export async function editInvoice(id: string, data: any) {
    try {
        // else continue
        const updatedInvoice = await Invoices
            .findOneAndUpdate(
                { _id: id },
                {...data},
                { new: true }
            )
            .exec()
            
        // if no invoice was found on the db, then return false
        if(!updatedInvoice) {
            return {
                status: 404,
                isSuccessful: false,
                message: "Invoice not found!",
                data: null
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

export async function saveInvoiceAsDraft(data: IBaseInvoice, id: QueryStringsInvoice['userId']) {
    const userId = id;
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
            user_id: userId,
            status: 'draft',
            invoice_no: generateInvoiceRefNumber(), // generate ref number for invoice
        })
        return {
            status: 201,
            isSuccessful: true,
            message: "Invoice saved as draft",
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
