    import express from "express"
    import isAuthenticated from "../middlewares/isAuthenticated.js"
    import { createSession, getAllOrders, getOrderByID, getSession, placeOrder, updateDeliveryStatus } from "../controllers/order.controller.js"
    const orderRouter =  express.Router()

    orderRouter.route("/place-order").post(isAuthenticated,placeOrder)
    orderRouter.route("/update-status/:id").post(isAuthenticated,updateDeliveryStatus)
    orderRouter.route("/get-all-orders").get(isAuthenticated,getAllOrders)
    orderRouter.route("/get-order/:id").get(isAuthenticated,getOrderByID)
    orderRouter.route("/create-checkout-session").post(createSession)
    orderRouter.route("/get-session/:id").get(getSession);

    export default orderRouter