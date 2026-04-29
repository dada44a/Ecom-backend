import "reflect-metadata"
import express from 'express';
import ProductRouter from "./routes/Product.route.js";
import CartRouter from "./routes/Cart.route.js";
import AuthRouter from "./routes/Auth.route.js";
import UserRouter from "./routes/User.route.js";

const app = express();

app.use(express.json());
app.use("/api/products", ProductRouter);
app.use("/api/users", UserRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/cart", CartRouter);



app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});