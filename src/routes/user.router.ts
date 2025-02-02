import { Router } from "express";
import { container } from "tsyringe";
import { UserServices } from "../services/UserServices";
import { UserController } from "../controllers/UserController";
import { VerifyToken } from "../middlewares/VerifyToken.middleware";
import { VerifyUniqueEmail } from "../middlewares/VerifyUniqueEmail.mmiddleware";

container.registerSingleton("UserServices", UserServices);
const userController = container.resolve(UserController);

export const userRouter = Router();

userRouter.post("/register", VerifyUniqueEmail.execute, (req, res) => userController.register(req, res));

userRouter.post("/login", (req, res) => userController.login(req, res));

userRouter.get("/", VerifyToken.execute, (req, res) => userController.getUser(req, res));
