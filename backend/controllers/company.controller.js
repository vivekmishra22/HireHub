import { Company } from "../models/company.model.js"    // Importing required modules and utilities
import getDataUri from "../utils/datauri.js";       // Converts uploaded file to Data URI format
import cloudinary from "../utils/cloudinary.js";    // Cloudinary config for image upload

export const registerCompany = async (req, res) => {    // Register a new company
    try {
        const { companyName } = req.body;
        if (!companyName) {     // Validate input
            return res.status(400).json({
                message: "Company name is required.",
                success: false
            });
        };

        // Check if company already exists
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "You can't register same company.",
                success: false
            });
        };

        company = await Company.create({    // Create new company
            name: companyName,
            userId: req.id      // Logged in user (admin) who is registering the company
        });

        return res.status(201).json({
            message: "Company registered successfully.",
            company,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}

// Get all companies registered by a specific admin user
export const getCompany = async (req, res) => {
    try {
        const userId = req.id;  // logges in user id, Logged in user ID (admin)
        const companies = await Company.find({ userId });

        if (!companies) {
            return res.status(404).json({
                message: "Companies not found",
                success: false
            });
        };

        return res.status(200).json({
            companies,
            success: true
        });

    } catch (error) {
        console.log(error);
    }
}

// Get a company by its ID
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;        // Extract company ID from route

        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        };

        return res.status(200).json({
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

// Update company details including logo upload to Cloudinary
export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const file = req.file;      // Multer will give uploaded file

        // Here cloudinary code, Convert file to base64 data URI format
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);    // Upload to Cloudinary and get secure image URL
        const logo = cloudResponse.secure_url;

        const updateDate = { name, description, website, location, logo };  // Prepare data to update

        const company = await Company.findByIdAndUpdate(req.params.id, updateDate, { new: true });  // Update company by ID
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        };

        return res.status(200).json({
            message: "Company information updated",
            company,
            success: true
        });

    } catch (error) {
        console.log(error);
    }
}