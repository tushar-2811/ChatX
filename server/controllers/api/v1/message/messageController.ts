import { NextFunction, Request , Response } from "express";
import prismadb from "../../../../config/prismadb";

// add new message to db
export const addMessageController = async(req: Request , res:Response ,next : NextFunction) => {
    try {
        const {fromUserId , toUserId , messageContent} = req.body;
        const {conversationId} = req.params;

        const newMessage = await prismadb.message.create({
            data : {
                body : messageContent,
                conversationId : conversationId,
                senderId : fromUserId
            }
        })

        if(!newMessage){
           return res.status(401).json({
            ok : false,
            msg : "failed to add msg to database"
           })
        }

        return res.status(201).json({
            ok : true,
            msg : "Message added successfully"
        })

        
    } catch (error) {
        console.log("error while adding message to db" , error);
        next(error);
    }
}

// get all messages
export const getAllMessagesController = async(req:Request , REs:Response) => {

}