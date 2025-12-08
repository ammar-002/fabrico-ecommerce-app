import { Schema } from "mongoose";
import mongoose from "mongoose";

const cartSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    selectedSize:{
      type:String,
      required:true
    },
    quantity:{
      type:Number,
      default:1
    }
  },
  { timestamps: true }
);

export const Cart = mongoose.model("Cart", cartSchema);
