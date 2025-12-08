import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { addToCart, clearCart, getCartProducts,removeCartItem } from "../controllers/cart.controller.js";

const cartRouter = express.Router()

cartRouter.route("/add-to-cart/:id").post( isAuthenticated,addToCart)
cartRouter.route("/get-cart-items").get(isAuthenticated,getCartProducts)
cartRouter.route("/remove-cart-item/:id").delete(isAuthenticated,removeCartItem)
cartRouter.route("/clear-cart").delete(isAuthenticated,clearCart)
export default cartRouter