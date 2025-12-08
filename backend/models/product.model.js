import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    secondImage:{
        type:String,
        
    },
    
    category:{
        type:String,
        enum:["T-Shirt","Trouser","Jeans", "Shirt", "Jacket"],
        required:true,
    },
    size:{
        type:[String],
        enum:["XS","S","M","L","XL","XXL"],
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    stock:{
        type:Number,
        required:true,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }
  
},{timestamps:true});

// create fields for 1st 2nd and 3rd image for product

export const Product  = mongoose.model("Product",productSchema)