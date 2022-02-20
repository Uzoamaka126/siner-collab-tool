import { Document, Types } from "mongoose";
const Project = require('../../components/projects/Projects.model');


export function validateItem (id: string | Types.ObjectId , itemName: string): any {
    if (!id) {
        return {
            status: 401,
            isSuccessful: false,
            message: `${itemName} id as a string is required!`
        }
    }
}

export async function validateProject(id: string) {
    if (!id || typeof id !== 'string') {
        return {
            status: 404,
            isSuccessful: false,
            message: 'string id is required!',
            data: null
        }
    }

    try {
        const project = await Project.findOne({ _id: id }).lean().exec();

        // if no project was found on the db, then return false
        if(!project) {
            return {
                status: 404,
                isSuccessful: false,
                message: 'Project not found!',
                data: null
            }
        } else {
            return {
                status: 200,
                isSuccessful: true,
                message: "success",
                data: project
            }
        }
    } catch(err) {
        console.error(err)
        return {
            status: 400,
            isSuccessful: false,
            message: "An error occurred",
            data: err.message
        }
    }
}