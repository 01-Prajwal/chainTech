import mongoose from "mongoose";


const  connectDB = async()=>{


    try {
       const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log("Mongo Connection Established");
        
    } catch (error) {
        console.log(error);
        
    }

} 
export default connectDB ;