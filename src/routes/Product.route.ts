import "reflect-metadata"
import { Router } from "express";
import { ProductController } from "../controllers/Products.controller.js";

const productController = new ProductController();

const ProductRouter = Router();

ProductRouter.get("/", productController.getAllProducts);

ProductRouter.get("/:id", productController.getProductById);

ProductRouter.post("/", productController.createProduct);

ProductRouter.put("/:id", productController.updateProduct);

ProductRouter.delete("/:id", productController.deleteProduct);

export default ProductRouter;