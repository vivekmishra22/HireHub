// Importing necessary modules and middleware
import express from "express";      // Express for routing
import { login, logout, register, updateProfile } from "../controllers/user.controller.js";     // Importing controller functions
import isAuthenticated from "../middleware/isAuthenticated.js";     // Middleware to check if user is authenticated
import { singleUpload } from "../middleware/multer.js";     // Multer middleware to handle single file upload (like profile picture)

const router = express.Router();    // Creating a new Express router instance

// router.route("/register").post(register);

// Route: POST /register
// Description: Register a new user with file upload (e.g., profile photo)
router.route("/register").post(singleUpload, register);
// Route: POST /login
// Description: Log in an existing user
router.route("/login").post(login);
// Route: GET /logout
// Description: Log out the currently logged-in user
router.route("/logout").get(logout);
// Route: PUT /profile/update
// Description: Update user profile (only if authenticated), also handles file upload
router.route("/profile/update").put(isAuthenticated, singleUpload, updateProfile);
// router.route("/profile/update").post(updateProfile);

export default router;  // Export the router so it can be used in the main app