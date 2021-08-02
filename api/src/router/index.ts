import { Request, Response, NextFunction } from 'express';
import { sampleValidator } from '../utils/middleware/validate';
const usersRouter = require("../components/users/User.router");

function routes(router:any, port: string | number) {    
    // router.use("/api/users", usersRouter);

    router.get("/", sampleValidator, (req: Request, res: Response) => {
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