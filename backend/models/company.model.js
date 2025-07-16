import mongoose from "mongoose";    // ✅ Imports Mongoose to define schema and interact with MongoDB

const companySchema = new mongoose.Schema({     // ✅ Creates a new schema to represent a company
    name: {
        type: String,
        unique:true,
        required: true
    },
    description: {
        type: String,
    },
    website: {
        type: String,
    },
    location: {
        type: String,
    },
    logo: {
        type: String,    // URL to company logo, 🔸 Optional URL for the company’s logo image
    },
    userId: {       // ✅ References the User who created or manages this company
        type: mongoose.Schema.Types.ObjectId,      // Stored as an ObjectId and connected via .populate("userId")
        ref: 'User',        // Usually, this is a recruiter
        required: true
    },
}, { timestamps: true });       // ✅ Automatically adds createdAt and updatedAt fields to each document

export const Company = mongoose.model('Company', companySchema);
// ✅ Compiles the schema into a model named `Company`
// Now you can use `Company.create()`, `Company.find()`, etc. in your app