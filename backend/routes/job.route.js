import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import {addJob, getAdminJobs, getAllJobs, getJobById} from "../controllers/job.controller.js"

const router = express.Router();

router.route("/post").post(isAuthenticated, addJob);
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
router.route("/get/:id").get(isAuthenticated, getJobById);


export default router;