import "reflect-metadata"
import { Router } from "express";
import { UserController } from "../controllers/User.controller.js";


const userController = new UserController();
const UserRouter = Router();

UserRouter.get("/", userController.getAllUsers);

UserRouter.get("/:id", userController.getUserById);


UserRouter.put("/:id", userController.updateUser);

UserRouter.delete("/:id", userController.deleteUser);

export default UserRouter;