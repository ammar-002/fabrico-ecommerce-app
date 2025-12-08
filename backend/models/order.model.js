import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
    
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    products:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product",
            },
            quantity:{
                type:Number,
                default:1,
            },
        }
    ],
     
    email:{
        type:String
    },
    phoneNumber:{
        type:String
    },

    address:{
        type:String,
        required:true,
    },
    method:{
        type:String,
        enum:["COD","Online"],
        default:"COD",
        required:true
    },
    

    status:{
        type:String,
        enum:["Pending","Delivered","Cancelled"],
        default:"Pending",
    },
    totalAmount:{
        type:Number,
        required:true
    }
    

}, { timestamps: true });

export const Order = mongoose.model("Order", orderSchema);