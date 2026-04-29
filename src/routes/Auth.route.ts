import "reflect-metadata"
import { Router } from "express";
import { AuthController } from "../controllers/Auth.controller.js";

const authController = new AuthController();
const AuthRouter = Router();

AuthRouter.post("/register", (req, res) => {
    authController.signUp(req, res);
});

AuthRouter.post("/login", (req, res) => {
    authController.login(req, res);
});

export default AuthRouter;  