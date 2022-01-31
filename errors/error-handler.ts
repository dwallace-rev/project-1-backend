import NotFoundError from "./not-found-error";
import { Response } from "express";
import DuplicateValueError from "./duplicate-value-error";
import BadLoginError from "./bad-login-error";
import {logger} from "../index";


export default function errorHandler(error:Error, res:Response, resourceType: string){
    if (error instanceof NotFoundError){
        res.status(404)
        res.send(`${resourceType} resource not found: ${error.message}`);
        logger.error("404: NOT FOUND");
    }

    else if (error instanceof DuplicateValueError){
        res.status(400)
        res.send(`Invalid (duplicate) value: ${error.message}`);
        logger.error("400: BAD REQUEST (duplicate of unique value)");
    }
    
    else if (error instanceof BadLoginError){
        res.status(401)
        res.send(error.message)
        logger.error("401: UNAUTHORIZED");
    }

    else {
        res.status(500); 
        res.send("Unknown server error");
        logger.fatal("500: UNKNOWN SERVER ERROR");
    }
}