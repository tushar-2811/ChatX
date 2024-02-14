import e, { Request , Response } from "express";
import prismadb from "../../../../config/prismadb";


// access chat of two users
export const accessChatController = async(req:Request , res:Response) => {
    try {
        const {currentUserId , anotherUserId} = req.params;

        if(!currentUserId || !anotherUserId) {
            return res.status(401).json({
                ok : false,
                msg : "UserId's not present"
            })
        }

        let existingChat = await prismadb.conversation.findFirst({
            where : {
                AND : {
                    userIds : {
                        hasEvery : [currentUserId , anotherUserId]
                    }
                }
            },
            include : {
               messages : true
            }
               
        });

        if (existingChat) {
            return res.status(201).json({
                ok : true,
                newChatCreated : false,
                msg : "chat exist already",
                chat : existingChat
            }) 
        }

       const newChat  = await prismadb.conversation.create({
            data: {
                users: {
                    connect: [
                        { id: currentUserId },
                        { id: anotherUserId }
                    ]
                },
                userIds : [currentUserId , anotherUserId]
            }
        });

       
        return res.status(201).json({
            ok : true,
            newChatCreated : true,
            msg : "new chat created",
            chat : newChat
        })

        
    } catch (error) {
        console.log("error in accessing chat" , error);
        return res.status(501).json({
            ok : false , 
            msg : "error in accessing chat",
            error
        })
    }
}




// fetch all chats for a user
export const getChatController = async(req:Request , res: Response) => {
    try {
        const {currentUserId} = req.params;

        const existingUser = await prismadb.user.findUnique({
            where : {
                id : currentUserId
            },
            include : {
                conversations : {
                    include : {
                        messages : true
                    }
                }
            }
        })

        if(!existingUser) {
            return res.status(401).json({
                ok : false ,
                msg : "No user found"
            })
        }

        return res.status(201).json({
            ok : true,
            msg : "all chats found",
            chats : existingUser.conversations
        })

    } catch (error) {
        console.log('error' , error);
        return res.status(500).json({
             ok : false,
             msg : "error in getting chats",
             error 
        })
    }
}