// Importing required modules
import express from "express";      // Express for routing
import isAuthenticated from "../middleware/isAuthenticated.js";     // Middleware to verify user authentication
import {addJob, getAdminJobs, getAllJobs, getJobById} from "../controllers/job.controller.js"
// Import controller functions for handling job-related logic

const router = express.Router();    // Create a new Express Router instance

// Route: POST /post
// Description: Add a new job posting (only accessible by an authenticated user)
router.route("/post").post(isAuthenticated, addJob);
// Route: GET /get
// Description: Get all job listings (accessible to authenticated users)
router.route("/get").get(isAuthenticated, getAllJobs);
// Route: GET /getadminjobs
// Description: Get jobs posted by the currently logged-in admin/employer
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
// Route: GET /get/:id
// Description: Get details of a specific job by its ID
router.route("/get/:id").get(isAuthenticated, getJobById);

export default router;      // Export the router so it can be used in the main server file