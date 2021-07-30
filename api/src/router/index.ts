import { Request, Response, NextFunction } from 'express';
const express = require('express')
const usersRouter = require("../components/users/User.router");

function routes(app:any) {
    app.use("/api/users", usersRouter);

    app.get("/", (req: Request, res: Response) => {
        res.status(200).json({
            message: "API is uppp 🚀"
        });
    });

    // handle error url
    app.all("*", (_:any, res: Response) => {
        res.status(404).json({ message: "This URL cannot be found!" });
    });
}

module.exports = routes;