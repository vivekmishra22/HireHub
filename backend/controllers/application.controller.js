import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

/* Controller to apply for a job */
export const applyJob = async (req, res) => {
    try {
        const userId = req.id;      // Get user ID from authenticated middleware
        // const {id:jobId} = req.params;
        const jobId = req.params.id;    // Get job ID from route params
        if (!jobId) {       // Check if job ID is provided
            return res.status(400).json({
                message: "Job id is required.",
                success: false
            });
        };

        // Check if user has already applied to this job
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this jobs.",
                success: false
            });
        };

        // Check if the job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        };

        // Create a new job application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId
        });

        // Add application reference to the job's applications array
        job.applications.push(newApplication._id);
        await job.save();
        return res.status(201).json({
            message: "Job applied successfully!",
            success: true
        });

    } catch (error) {
        console.log(error);
    }
}

/* Controller to get all jobs applied by the user */
export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        // Find applications by the current user and populate job & company details
        const application = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: 'job',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'company',
                options: { sort: { createdAt: -1 } }
            }
        });

        if (!application) {     // If no applications found
            return res.status(404).json({
                message: "No Applications",
                success: false
            });
        };

        return res.status(200).json({
            application,
            success: true
        });

    } catch (error) {
        console.log(error)
    }
}

// Admin may see no. of applicant applied for job, Controller for admin: get all applicants for a particular job
export const getApplicants = async (req, res) => {
    try {
        // const {id} = req.params;
        const jobId = req.params.id;
        // Find the job and populate its applications & applicant details
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'applicant',
                options: { sort: { createdAt: -1 } }
            }
        });

        if (!job) {         // If job not found
            return res.status(404).json({
                message: 'Job not found',
                success: false
            });
        };

        return res.status(200).json({
            job,
            success: true
        });

    } catch (error) {
        console.log(error);
    }
}

/* Controller to update the status of a job application */
export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;    // new status: 'pending' | 'accepted' | 'rejected'
        const applicationId = req.params.id;
        if (!status) {      // Check if status is provided
            return res.status(404).json({
                message: 'status is required',
                success: false
            });
        };

        // find the application by application id, Find the application by its ID
        const application = await Application.findOne({_id:applicationId});
        if(!application){
            return res.status(404).json({
                message:"Application not found.",
                success:false
            });
        };

        // update the status, Update the status and save
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message:"Status updated successfully.",
            success:true
        })

    } catch (error) {
        console.log(error);
    }
}