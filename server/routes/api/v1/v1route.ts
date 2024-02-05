import { Router} from "express";
import AuthRouter from "./auth/auth";
import userRouter from "./users/user";
const V1Router = Router();

V1Router.use("/auth" , AuthRouter);
V1Router.use("/users" , userRouter);

export default V1Router;