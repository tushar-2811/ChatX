import {Router} from 'express'
import { addMessageController, getAllMessagesController } from '../../../../controllers/api/v1/message/messageController';

const messageRouter = Router();

messageRouter.post("/add-message" , addMessageController);
messageRouter.get("/all-messages" , getAllMessagesController);

export default messageRouter;
