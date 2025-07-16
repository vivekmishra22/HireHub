import { v2 as cloudinary } from "cloudinary";
// ✅ Imports the Cloudinary SDK — specifically version 2 (v2) — and renames it to `cloudinary`
// This allows you to use `cloudinary.uploader.upload(...)` or other v2 APIs
import dotenv from "dotenv";
// ✅ Imports the `dotenv` package so you can load environment variables from your `.env` file

dotenv.config();
// ✅ Loads the `.env` file into `process.env`, making variables like `CLOUD_NAME`, `API_KEY`, and `API_SECRET` accessible

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, // ✅ Cloudinary account's cloud name (from .env)
    api_key: process.env.API_KEY,   // ✅ Cloudinary API key (from .env)
    api_secret: process.env.API_SECRET // Click 'View API Keys' above to copy your API secret // ✅ Cloudinary secret key (from .env)
});

export default cloudinary;
// ✅ Exports the configured `cloudinary` instance so it can be imported and used in other files
// Example:
// import cloudinary from './config/cloudinary.config.js';
// cloudinary.uploader.upload(filePath)