import mongoose from "mongoose";    // ✅ Imports Mongoose library to define the schema and interact with MongoDB

const applicationSchema = new mongoose.Schema({ // ✅ Defines a new Mongoose schema called applicationSchema
    job: {          // ✅ References the Job being applied to, ref: 'Job' means this connects to a document in the Job collection
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    applicant: {            // ✅ References the User who applied for the job
        type: mongoose.Schema.Types.ObjectId,   // This will usually be a user with role "student" (based on your User model)
        ref: 'User',        // Enables .populate("applicant") to get full user info
        required: true
    },
    status: {       // ✅ Tracks the current status of the job application
        type: String,
        enum: ['pending', 'accepted', 'rejected'],  // Allowed values (enum)
        default: 'pending'
    },
}, { timestamps: true });   // ✅ Automatically adds createdAt, updatedAt

export const Application = mongoose.model('Application', applicationSchema);
// ✅ Creates and exports the `Application` model based on the schema
// You can now do things like:
// Application.create(), Application.find(), Application.updateOne(), etc.