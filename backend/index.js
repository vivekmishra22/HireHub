// ✅ Imports the Express framework to create the web server and define routes
import express from "express";
// const express = require('express'); old way  🔸 This is the CommonJS syntax (used before ES Modules)
import cookieParser from "cookie-parser";
// ✅ Middleware to parse cookies from incoming requests and make them accessible via `req.cookies`
import cors from "cors";
// ✅ Enables Cross-Origin Resource Sharing (CORS) to allow frontend on a different origin (like localhost:5173) to access your backend
import dotenv from "dotenv";
// ✅ Loads environment variables from a `.env` file into `process.env`
import connectDB from "./utils/db.js";
// ✅ Imports your custom MongoDB connection function (likely connects using MONGODB_URL from `.env`)
import userRoute from "./routes/user.route.js";
// ✅ Imports user-related API routes
import companyRoute from "./routes/company.route.js"
// ✅ Imports company-related API routes
import jobRoute from "./routes/job.route.js"
// ✅ Imports job-related API routes
import applicationRoute from "./routes/application.route.js"
// ✅ Imports job application-related API routes
import path from "path";

dotenv.config({});
// ✅ Loads `.env` variables so you can use `process.env.KEY_NAME` anywhere in your code

const app = express();
// ✅ Creates an instance of the Express application

const __dirname = path.resolve();

// app.get("/home", (req, res) => {
//     return res.status(200).json({
//         message: "I'm comming from backend",
//         success:true
//     })
// });

// middleware 
app.use(express.json());
// ✅ Parses incoming JSON requests and puts the parsed data in `req.body`
app.use(express.urlencoded({ extended: true }));
// ✅ Parses URL-encoded form data (from HTML forms) and puts it in `req.body`
// extended: true => supports rich objects and arrays
app.use(cookieParser());
// ✅ Allows reading cookies from incoming requests via `req.cookies`
// const corsOptions = {
//     origin: 'https://hirehub-d63h.onrender.com',    // ✅ Allow backend from this origin
//     origin: 'https://hirehubcareers.netlify.app',    // ✅ Allow frontend from this origin
//     origin: 'http://localhost:5173',    // ✅ Allow frontend from this origin
//     credentials: true                   // ✅ Allow cookies and credentials to be sent
// };
const corsOptions = {
  origin: [
    'https://hirehubcareers.netlify.app',
    'https://hirehub-d63h.onrender.com',
    'http://localhost:5173'
  ],
  credentials: true
};
app.use(cors(corsOptions)); // ✅ Applies the CORS policy to all incoming requests

const PORT = process.env.PORT || 3000;  // ✅ Tries to use the port defined in `.env`; if not present, defaults to 3000

app.options('*', cors(corsOptions)); // Handle OPTIONS requests

// Api's
app.use("/api/v1/user", userRoute); // ✅ All user-related endpoints will now start with `/api/v1/user`
app.use("/api/v1/company", companyRoute);   // ✅ All company-related endpoints will start with `/api/v1/company`
app.use("/api/v1/job", jobRoute);   // ✅ All job-related endpoints will start with `/api/v1/job`
app.use("/api/v1/application", applicationRoute);   // ✅ All application-related endpoints will start with `/api/v1/application`

app.use(express.static(path.join(__dirname, "/frontend/dist")));
// app.get('/*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
// });

app.listen(PORT, () => {
    connectDB();    // ✅ Establish MongoDB connection when the server starts
    console.log(`Server running at port ${PORT}`);  // ✅ Logs to console that the server is up and running
});