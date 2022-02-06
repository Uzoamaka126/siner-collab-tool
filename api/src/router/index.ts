import { Request, Response } from 'express';
import usersRouter from "../components/users/User.router";
import clientsRouter from '../components/clients/Clients.router';
import authRouter from '../components/auth/Auth.router';
import tagsRouter from '../components/tags/Tags.router
import { authMiddleware } from '../utils/middleware/auth';
import { validateUserToken } from '../utils/middleware/validateToken';

function routes(router: any) {  
    router.get("/api/", (req: Request, res: Response) => {
        res.status(200).json({
            message: "API is uppp 🚀"
        });
    });

    // handle error url
    // router.all("*", (_:any, res: Response) => {
    //     res.status(404).json({ message: "This URL cannot be found!" });
    // });    

    /*
         router.use takes in a path and a function
         router.use(path, function)
    */

    router.use("/api/users", validateUserToken, usersRouter);
    router.use("/api/auth", authMiddleware, authRouter);
    router.use("/api/clients", validateUserToken, clientsRouter);
    router.use("/api/tags", validateUserToken, tagsRouter);
}

module.exports = routes;