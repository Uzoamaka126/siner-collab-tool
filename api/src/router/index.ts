import { Request, Response } from 'express';
import { sampleValidator, sampleValidatorTwo } from '../utils/middleware/validate';
import usersRouter from "../components/users/User.router";
import { authMiddleware } from '../utils/middleware/auth';

function routes(router:any, port: string | number) {        
    router.use("/api/users", authMiddleware, usersRouter);

    router.get("/", (req: Request, res: Response) => {
        res.status(200).json({
            message: "API is uppp 🚀"
        });
    });

    // handle error url
    router.all("*", (_:any, res: Response) => {
        res.status(404).json({ message: "This URL cannot be found!" });
    });    
}

module.exports = routes;