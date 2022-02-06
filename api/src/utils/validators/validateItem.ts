import { Document, Types } from "mongoose";


export function validateItem (id: string | Types.ObjectId , itemName: string): any {
    if (!id) {
        return {
            status: 401,
            isSuccessful: false,
            message: `${itemName} id as a string is required!`
        }
    }
}