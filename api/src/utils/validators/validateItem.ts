import { Types } from "mongoose";
import { Request, Response, NextFunction } from 'express';

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

export async function validateAddProjectTagDataTypes(req: Request, res: Response, next: NextFunction) {
    if (typeof req.body.id !== 'string') {
        return res.status(401).json({
          message: 'project id should be a string'
        })
    }

    else if (req.body.id.length < 24) {
        return res.status(401).json({
          message: 'Incorrect project id. String should not be less than 24 characters'
        })
    }

    else if (!req.body.tags.length) {
        return res.status(401).json({
          message: 'tags array should not be empty'
        })
    }
    
    else if (!Array.isArray(req.body.tags)) {
        return res.status(401).json({
          message: 'tags should be in an array format'
        })
    } 
    else {
        next();
    }
}