import { Order } from "../models/order.model.js";
import Stripe from "stripe";
import dotenv from "dotenv"
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export const createSession = async (req, res) => {
  try {

    const { products } = req.body;   // array of products
    console.log(products)

    const line_items = products.map((p) => ({
      price_data: {
        currency: "pkr",
        product_data: {
          name: p.productId.title,

        },
        unit_amount: Math.round(p.productId.price * 100),
      },
      quantity: p.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URI}/check-out-now/success/${'{CHECKOUT_SESSION_ID}'}`,
      cancel_url: `${process.env.FRONTEND_URI}/check-out-now/cancel`,
      
    });
    // console.log("Sucess URL: "+session.success_url)
    return res.status(200).json({
      url: session.url,
      success: true
    });

  } catch (error) {
    console.log("STRIPE SESSION ERROR:", error.message);
    return res.status(500).json({
      message: "Stripe session error",
      error: error.message,
    });
  }
};

export const getSession = async (req, res) => {
  try {
    const sessionId = req.params.id;
    const session = await stripe.checkout.sessions.retrieve(sessionId);
     
    return res.status(200).json({
      success: true,
      session,
    });
  } catch (error) {
    console.log("GET STRIPE SESSION ERROR:", error.message);
    return res.status(500).json({
      message: "Get stripe session error",
      error: error.message,
    });
  }
};

export const placeOrder = async (req, res) => {
  try {
    const userId = req._id;
    const { products, address, method, status, email, phoneNumber, totalAmount } = req.body;
    if (!products || !address || !method) {
      return res.status(400).json({
        message: "All Fields Are Required",
        success: false,
      });
    }
    
    // create order
    const order = await Order.create({
      userId,
      products,
      address,
      method,
      totalAmount,
      email,
      phoneNumber,
      status,
    });
    await order.populate("products.productId");
    return res.status(200).json({
      message: "Order placed successfully",
      success: true,
      order,

    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something Went Wrong!",
      success: false,
    });
  }
};

export const updateDeliveryStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { updateOrderdStatus } = req.body;

    const allowedStatuses = ["Pending", "Delivered", "Cancelled"];
    if (!allowedStatuses.includes(updateOrderdStatus)) {
      return res.status(400).json({
        message: "Invalid status",
        success: false,
      });
    }
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status: updateOrderdStatus },
      { new: true }
    );
    return res.status(200).json({
      message: "Status Updated Successfully",
      success: true,
      updatedOrder,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something Went Wrong",
      success: false,
    });
  }
};

// getAllOrders---current admin ki products per jo order hen vohi dikhay
export const getAllOrders = async (req, res) => {
  try {
    const allOrders = await Order.find()

    return res.status(200).json({
      message: "Orders Found",
      success: true,
      allOrders
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Something Went Wrong",
      success: false,
    })

  }
}

// getOrderByID
export const getOrderByID = async (req, res) => {
  try {
    const orderId = req.params.id

    const order = await Order.findById(orderId).populate("products.productId")
    if (!order) {
      return res.status(400).json({
        message: "Order not found with this ID",
        success: false
      })
    }
    return res.status(200).json({
      message: "Order Found",
      success: true,
      order
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Something Went Wrong",
      success: false,
    })

  }
}


