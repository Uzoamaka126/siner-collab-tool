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

export async function validateBodyIdAsString(req: Request, res: Response, next: NextFunction) {
    // console.log("req.baseUrl:", req.baseUrl);
    if (!req.body.id || typeof req.body.id !== 'string') {
        return res.status(401).json({
          message: 'id should be a string'
        })
    }

    else if (req.body.id.length < 24) {
        return res.status(401).json({
          message: 'Incorrect id. String should not be less than 24 characters'
        })
    }
    else {
        next();
    }
}
export async function validateProjectIdAsString(req: Request, res: Response, next: NextFunction) {
    if (!req.body.project_id || typeof req.body.project_id !== 'string') {
        return res.status(401).json({
          message: 'project id should be a string'
        })
    }

    else if (req.body.project_id.length < 24) {
        return res.status(401).json({
          message: 'Incorrect project id. String should not be less than 24 characters'
        })
    }
    else {
        next();
    }
}

export async function validateParamsIdAsString(req: Request, res: Response, next: NextFunction) {
    if (!req.params.id || typeof req.params.id !== 'string') {
        return res.status(401).json({
          message: 'id should be a string'
        })
    }

    else if (req.params.id.length < 24) {
        return res.status(401).json({
          message: 'Incorrect id. String should not be less than 24 characters'
        })
    }
    else {
        next();
    }
}

export async function validateRequestArray(req: Request, res: Response, next: NextFunction) {
    if (!req.body.tags.length) {
        return res.status(401).json({
          message: 'array should not be empty'
        })
    }
    
    else if (!Array.isArray(req.body.tags)) {
        return res.status(401).json({
          message: 'expected array should be in an array format'
        })
    } 
    else {
        next();
    }
}