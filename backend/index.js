import express from 'express';
import dotenv from 'dotenv';
import authroutes from "./src/routes/auth.routes.js"
import messageRoutes from './src/routes/message.routes.js';
import { connectDB } from './src/lib/db.js';
import cookieParser from 'cookie-parser';
import cors from "cors"
import path from "path"
import {app,server} from "./src/lib/socket.js"

dotenv.config()

app.use(express.json());   
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

const port = process.env.PORT || 5000
const __dirname = path.resolve()

app.use("/api/auth",authroutes);
app.use("/api/messages",messageRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "frontend/dist")));
  
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
    });
  }

server.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
    connectDB()
})