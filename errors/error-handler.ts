import NotFoundError from "./not-found-error";
import { Response } from "express";


export default function errorHandler(error:Error, res:Response, resourceType: string){
    if (error instanceof NotFoundError){
        res.status(404)
        res.send(`${resourceType} resource not found`);
    }

    else {
        res.status(500); 
        res.send("Unknown server error");
    }
}