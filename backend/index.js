import express from 'express';
import dotenv from 'dotenv';
import authroute from "./src/routes/auth.routes.js"
import { connectDB } from './src/lib/db.js';
import cookieParser from 'cookie-parser';


dotenv.config()
const app = express();

app.use(express.json());   
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authroute);

const port = process.env.PORT || 5000

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
    connectDB()
})