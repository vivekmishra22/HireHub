// Import required modules
import express from "express";      // Express for routing
import isAuthenticated from "../middleware/isAuthenticated.js"      // Middleware to check if the user is logged in
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controller.js"
// Import functions for job applications

const router = express.Router();        // Create an Express router instance

/*
  Route: GET /apply/:id
  Description: Apply for a job using its job ID
  Middleware: isAuthenticated - Only logged-in users can apply
*/
router.route("/apply/:id").get(isAuthenticated, applyJob);
/*
  Route: GET /get
  Description: Get all jobs that the current user has applied to
  Middleware: isAuthenticated - Only accessible to logged-in users
*/
router.route("/get").get(isAuthenticated, getAppliedJobs);
/*
  Route: GET /:id/applicants
  Description: For a job (by ID), get all users who applied to it
  Middleware: isAuthenticated - Only logged-in users (typically admin/recruiter) can access
*/
router.route("/:id/applicants").get(isAuthenticated, getApplicants);
/*
  Route: POST /status/:id/update
  Description: Update the application status (pending → accepted/rejected)
  Middleware: isAuthenticated - Only authenticated users can update
*/
router.route("/status/:id/update").post(isAuthenticated, updateStatus);

export default router;      // Export the router so it can be used in main app