const Invoices = require('./Invoices.model');
import { v4 as uuidv4 } from 'uuid';
import { getSingleUser } from '../users/Users.service';
import { IBaseInvoice } from './Invoices.types';

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

export async function addNewInvoice(data: IBaseInvoice) {
    const userId = data.user_id;
    const validateUser = await getSingleUser(userId);
    
    if(!validateUser) {
        return {
            status: 401,
            isSuccessful: false,
            message: "An error occured while creating this invoice. Please, try again!",
            data: null
        }
    }
    try {
        const invoice = await Invoices.create({
            client_email: data.client_email,
            currency: data.currency,
            amount: data.amount,
            due_date: data.due_date,
            status: data.status,
            invoice_no: uuidv4(), // generate uuid
            other_emails: data.other_emails,
            items: data.items,
            price: data.price,
            tax: data.tax,
            total_amount: data.total_amount,
            memo: data.memo,
            user_id: data.user_id,
            project_id: data.project_id,
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
        // do a check to see if an id is passed as an argument.
        // If no id, then return false
        if(!id) {
            return {
                status: 401,
                isSuccessful: false,
                message: "string invoice id is required!",
            }
        }
        // else continue
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