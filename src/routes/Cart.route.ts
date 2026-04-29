import "reflect-metadata"
import { Router } from "express";
import { CartController } from "../controllers/Cart.controller.js";

const cartController = new CartController();
const CartRouter = Router();


CartRouter.get("/:id", (req, res) => {
    cartController.getAllUsersCart(req, res);
});

CartRouter.post("/", (req, res) => {
    cartController.plusCartItem(req, res);
});

CartRouter.put("/:id", (req, res) => {
    cartController.minusCartItem(req, res);
});

CartRouter.delete("/:id", (req, res) => {
    cartController.removeFromCart(req, res);
}); 


export default CartRouter;  