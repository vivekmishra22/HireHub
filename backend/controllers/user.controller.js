import { User } from "../models/user.model.js";    // Mongoose User model
import bcrypt from "bcryptjs";          // For hashing passwords
import jwt from "jsonwebtoken";         // For generating JSON Web Tokens
import getDataUri from "../utils/datauri.js";   // To convert file buffer to data URI
import cloudinary from "../utils/cloudinary.js";    // Cloudinary instance for uploading files

// =============== REGISTER CONTROLLER =================
export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;

        // Validation: check for required fields
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };

        // implementing cloudinary, File upload handling via Cloudinary
        const file = req.file;
        const fileUri = getDataUri(file);   // Convert buffer to base64 format
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);    // Upload to Cloudinary

        const user = await User.findOne({ email });     // Check if user already exists
        if (user) {
            return res.status(400).json({
                message: "User already exist with this email",
                success: false
            });
        };

        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password securely

        await User.create({     // Create a new user with the uploaded profile photo
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile:{
                profilePhoto:cloudResponse.secure_url
            }
        });
        return res.status(201).json({
            message: "Account created Successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

// =============== LOGIN CONTROLLER =================
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Validation
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };

        // Check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email.",
                success: false
            });
        };

        // Compare passwords
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect password.",
                success: false
            });
        };

        // check role is correct or not, Check for role mismatch
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false
            });
        };

        // Generate JWT token
        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        // Clean user data before sending
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        // Set token in HTTP-only cookie, maxAge 1 day
        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        });

    } catch (error) {
        console.log(error);
    }
}

// =============== LOGOUT CONTROLLER =================
export const logout = async (req, res) => {
    try {
        // Clear the token cookie by setting it to empty and expiring it immediately
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}

// =============== UPDATE PROFILE CONTROLLER =================
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;
        // cloudinary code, Convert uploaded resume (PDF) to data URI and upload to Cloudinary
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        // if (!fullname || !email || !phoneNumber || !bio || !skills) {
        //     return res.status(400).json({
        //         message: "Something is missing",
        //         success: false
        //     });
        // };


        // Convert comma-separated skills string to array
        let skillsArray;
        if (skills) {
            skillsArray = skills.split(",");
        }
        const userId = req.id;  // middleware authentication, Retrieved from authentication middleware
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            })
        };

        //  updating data, Update fields only if provided
        if (fullname) user.fullname = fullname
        if (email) user.email = email
        if (phoneNumber) user.phoneNumber = phoneNumber
        if (bio) user.profile.bio = bio
        if (skills) user.profile.skills = skillsArray

        // Upload resume if provided
        if(cloudResponse){
            user.profile.resume = cloudResponse.secure_url  // save the cloudinary url
            user.profile.resumeOriginalName = file.originalname // save the original file name
        }

        // user.fullname = fullname,
        //     user.email = email,
        //     user.phoneNumber = phoneNumber,
        //     user.profile.bio = bio,
        //     user.profile.skills = skillsArray

        // resume comes later here..

        await user.save();

        // Prepare clean user data for response
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message: "Profile Updated Successfully.",
            user,
            success: true
        })

    } catch (error) {
        console.log(error)
    }
}