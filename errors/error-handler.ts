import NotFoundError from "./not-found-error";
import { Response } from "express";
import DuplicateValueError from "./duplicate-value-error";


export default function errorHandler(error:Error, res:Response, resourceType: string){
    if (error instanceof NotFoundError){
        res.status(404)
        res.send(`${resourceType} resource not found`);
    }

    else if (error instanceof DuplicateValueError){
        res.status(400)
        res.send(`Invalid (duplicate) value: ${error.message}`);
    }

    else {
        res.status(500); 
        res.send("Unknown server error");
    }
}