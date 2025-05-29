import express from "express";
// const express = require('express'); old way
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js"

dotenv.config({});

const app = express();

// app.get("/home", (req, res) => {
//     return res.status(200).json({
//         message: "I'm comming from backend",
//         success:true
//     })
// });

// mongodb+srv://vivekunofficialmail:pX4ndqR3W5neU4sN@cluster0.l8ygd4s.mongodb.net/

// middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

// Api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port ${PORT}`);
});