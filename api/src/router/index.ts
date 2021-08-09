import { Request, Response } from 'express';
import usersRouter from "../components/users/User.router";
import workspacesRouter from '../components/workspaces/Workspace.router';
import authRouter from '../components/auth/Auth.router';
import { authMiddleware } from '../utils/middleware/auth';

function routes(router:any) {        
    router.use("/api/users", usersRouter);
    router.use("/api/auth", authMiddleware, authRouter);
    router.use("/api/workspaces", workspacesRouter);

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