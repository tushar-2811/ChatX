import { Router} from "express";
import AuthRouter from "./auth/auth";
import userRouter from "./users/user";
import chatRouter from "./chats/chats";
const V1Router = Router();

V1Router.use("/auth" , AuthRouter);
V1Router.use("/users" , userRouter);
V1Router.use("/chats" , chatRouter);

export default V1Router;