import {Request , Response , NextFunction } from "express";

export const authMiddleware = async(req:Request , res:Response , next: NextFunction) => {
     try {
        let authHeader = req.headers.authorization;

        
     } catch (error) {
        console.log("error in middleware", error);
        return;
     } 
}