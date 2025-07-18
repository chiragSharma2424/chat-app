import express from 'express';
import dotenv  from 'dotenv';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'

const app = express();
import authRoutes from './routes/auth.route.js';
import messageRoute from './routes/message.route.js'
dotenv.config();

const port = process.env.PORT
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoute);


app.listen(port, () => {
    console.log("server is running on", port);
    connectDB();
});