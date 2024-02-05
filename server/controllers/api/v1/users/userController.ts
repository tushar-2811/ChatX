import { Request , Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const UsersController = async(req: Request , res:Response) => {
     try {
        const allUsers = await prisma.user.findMany();
        
        return res.status(201).json({
            ok : true,
            msg : "all users",
            allUsers
        })
        
     } catch (error) {
        console.log("error in getting all users");
        return res.status(403).json({
            ok : false,
            msg : "error in getting all users",
            error
        })
     }
}