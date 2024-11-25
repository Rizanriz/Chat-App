import mongoose from "mongoose";

export const connectDB =  async()=>{
    try {
       const con = await mongoose.connect(process.env.MONGODB_URL)
       console.log("mongodb connected ");
    } catch (error) {
        console.log("mongodb not connected :", error);
    }
}