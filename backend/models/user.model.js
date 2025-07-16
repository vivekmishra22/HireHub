import mongoose from "mongoose";
// ✅ Imports Mongoose, an ODM (Object Data Modeling) library to interact with MongoDB using schemas and models

const userSchema = new mongoose.Schema({    // ✅ Defines a new Mongoose schema named userSchema
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'recruiter'],     // enum: limits allowed string values
        required: true
    },
    profile: {      // 🧾 profile (Sub-document), ✅ Nested object that holds extended user details
        bio: { type: String },
        skills: [{ type: String }], // ✅ An array of strings
        resume: { type: String }, // URL to resume file
        resumeOriginalName: { type: String },   // URL to resume file
        company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },  // ✅ References the Company collection
        profilePhoto: {     // ✅ URL for the profile picture
            type: String,
            default: ""
        }
    }
}, { timestamps: true });   // ✅ timestamps: true automatically adds: createdAt, updatedAt, to each document in MongoDB

export const User = mongoose.model('User', userSchema);
// ✅ Compiles the schema into a model named `User`
// You can now use `User.find()`, `User.create()`, `User.updateOne()` etc. in your app