import { Request, Response, NextFunction } from 'express';
import { RequestCustom } from './express';
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config/index");

export function validateUserToken (req: RequestCustom, res: Response, next: NextFunction) {
  const token = req.headers["authorization"];
  
  if(token) {
    jwt.verify(token, JWT_SECRET, (err: Error, decoded: any) => {      
      if(err) {
        return res.status(401).json({
          message: 'User is not validated'
        })
      }

      req.body.user = decoded.subject._id;
      req.user = decoded
      next();
    })
  } else {
    return res.status(401).json({
      error: 'No token provided, token is required in the Authorization Header'
    })
  }
}