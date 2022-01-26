import { Request, Response, NextFunction } from 'express';
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config/index");

export function validateUserToken (req: Request, res: Response, next: NextFunction) {
  const token = req.headers["authorization"];
  
  if(token) {
    jwt.verify(token, JWT_SECRET, (err: Error, decoded: any) => {
      if(err) {
        return res.status(401).json({
          message: 'User not allowed'
        })
      }

      req.body.user = decoded;
      next();
    })
  } else {
    return res.status(401).json({
      error: 'No token provided, token is required in the Authorization Header'
    })
  }
}