import { Request , Response } from "express";
import prismadb from "../../../../config/prismadb";


// get chats of two users
export const getChatController = async(req:Request , res: Response) => {
    try {
        const {user1Id , user2Id} = req.params;

        // check that there exist users for both the id's
        const user1 = await prismadb.user.findUnique({
            where : {
                id : user1Id
            }
        })

        const user2 = await prismadb.user.findUnique({
            where : {
                id : user2Id
            }
        })

        if(!user1 || !user2){
            return res.status(403).json({
                ok : false,
                msg : "user doesnot exist"
            })
        }

        //  Now , just check is there exist an chat for these two users
     

        return res.status(201).json({
           user1Id , user2Id
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