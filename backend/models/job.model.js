import mongoose from "mongoose"; // ✅ Importing Mongoose to define a schema and model for MongoDB

const jobSchema = new mongoose.Schema({ // ✅ Starts defining a new schema for Job
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    requirements: [{    // ✅ List of required skills or qualifications for the job
        type: String,
    }],
    salary: {
        type: Number,
        required: true
    },
    experienceLevel: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true
    },
    position: {
        type: Number,
        required: true
    },
    company: {      // ✅ References the Company model
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    created_by: {       // ✅ References the User (usually a recruiter) who posted the job, Important for tracking job ownership
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    applications: [         // ✅ Stores an array of references to applications made for this job
        {                   // Allows easy population to see all applicants for this job
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Application',
        }
    ]
}, { timestamps: true });       // ✅ Automatically adds createdAt and updatedAt fields to each document

export const Job = mongoose.model('Job', jobSchema);
// ✅ Creates a model called `Job` based on the schema
// You can now use `Job.create()`, `Job.find()`, `Job.findById()`, etc.