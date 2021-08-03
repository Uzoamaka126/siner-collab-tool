import { Request, Response, NextFunction,  } from 'express';


export function sampleValidator (req: Request, res: Response, next: NextFunction) {
  console.log('Time: ', Date.now());
  next()
}

export function sampleValidatorTwo (req: Request, res: Response, next: NextFunction) {
  console.log('Testing:');
  next()
}