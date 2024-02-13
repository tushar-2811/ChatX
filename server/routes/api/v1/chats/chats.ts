import { Router } from "express";
import {  getChatController } from "../../../../controllers/api/v1/chat/chatController";
const chatRouter = Router();

chatRouter.get("/:user1Id/:user2Id" , getChatController);

export default chatRouter;