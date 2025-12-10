import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";
import orderRouter from "./routes/order.route.js";
import cartRouter from "./routes/cart.route.js";
dotenv.config();

connectDB();
const app = express();
const port = process.env.PORT || 3000;
const corsOption = {
  origin: process.env.FRONTEND_URI,
  credentials: true,
}

// Middlewares
app.use(express.json()); // it is used to parse the json data from the request
app.use(cookieParser()); // it is used to parse the cookies from the request
app.use(cors(corsOption)); // it is used to allow the cross-origin requests

// Routes
app.use("/api/v1/user", userRouter)
app.use("/api/v1/product", productRouter)
app.use("/api/v1/order", orderRouter)
app.use("/api/v1/cart", cartRouter)



// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });
export default app