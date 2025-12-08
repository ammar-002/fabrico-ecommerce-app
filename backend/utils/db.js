import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_DATA_URI)
        console.log("MongoDB Connected Successfuylly.")
    } catch (error) {
        console.log(error)
        
    }

}

export default connectDB