// Import required modules
import express from "express";      // Express for routing
import isAuthenticated from "../middleware/isAuthenticated.js";     // Middleware to ensure user is logged in
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js";
// Import controller functions related to company operations
import { singleUpload } from "../middleware/multer.js";     // Middleware to handle file upload (logo)

const router = express.Router();        // Create an Express Router instance

// Route: POST /register
// Description: Register a new company (must be authenticated)
router.route("/register").post(isAuthenticated, registerCompany);
// Route: GET /get
// Description: Get the company data of the currently authenticated user
router.route("/get").get(isAuthenticated, getCompany);
// Route: GET /get/:id
// Description: Get a specific company's data by its ID (accessible to authenticated users)
router.route("/get/:id").get(isAuthenticated, getCompanyById);
// Route: PUT /update/:id
// Description: Update a company by ID (must be authenticated and optionally upload a logo)
router.route("/update/:id").put(isAuthenticated, singleUpload, updateCompany);

export default router;  // Export the router to be used in your main server file