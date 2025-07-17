import { Job } from "../models/job.model.js"

//  admin post job, Controller to allow admin to post a job
export const addJob = async (req, res) => {
    try {
        // Extract data from request body
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;  // Get the logged-in user's ID from middleware (injected after token verification)

        // Validate if any required field is missing
        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };

        // Create a new job in the database
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),      // Convert comma-separated string to array
            salary: Number(salary),     // Ensure salary is a number
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId      // Set the creator of the job
        });

        return res.status(201).json({       // Send response back to client
            message: "New Job Created Successfully.",
            job,
            success: true
        })
    } catch (error) {
        console.log(error);     // Log error for debugging
    }
}

//  for students, Controller for students to get all jobs (with search/filter)
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";    // Get keyword from query for search
        const query = {     // Search query: match title or description using case-insensitive regex
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };

        // Fetch jobs with matching query and populate company details
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 }); // Sort jobs by newest first

        // If no jobs found, return error
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };

        // Return found jobs
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

// for students, Controller to get a specific job by its ID
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;    // Get job ID from URL parameters
        // Find job by ID and populate its applications (if any)
        const job = await Job.findById(jobId).populate({
            path:"applications"
        });
        if (!job) {     // If job doesn't exist
            return res.status(404).json({   
                message: "Job not found",
                success: false
            });
        };

        return res.status(200).json({ job, success: true });    // Return the found job
    } catch (error) {
        console.log(error);
    }
}

// All jobs created by Admin, Controller for recruiter/admin to view all jobs they created
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id; // Get current admin's user ID
        // Find all jobs created by the admin and populate company info
        const jobs = await Job.find({ created_by: adminId }).populate({
            path:'company',
            createdAt:-1
        });
        if (!jobs) {    // If no jobs found
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        };

        return res.status(200).json({   // Return admin's posted jobs
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}