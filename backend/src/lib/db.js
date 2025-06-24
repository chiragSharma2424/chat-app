import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connectDB = () => {
   mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("database connected successfully")
   }).catch((err) => {
    console.log('something went wrong', err);
   })
}