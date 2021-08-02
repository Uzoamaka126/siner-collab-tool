import { Request, Response, NextFunction,  } from 'express';


export function sampleValidator (req: Request, res: Response, next: NextFunction) {
  console.log('Time: ', Date.now());
  next()
}