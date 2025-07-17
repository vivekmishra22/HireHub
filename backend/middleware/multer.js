import multer from "multer";    // Import multer, a middleware for handling multipart/form-data (used for file uploads)

const storage = multer.memoryStorage();     // Define a storage engine that stores files in memory (RAM) as Buffer objects

// Create a middleware for uploading a single file
// - 'storage' defines where and how the file will be stored (in memory here)
// - '.single("file")' means it expects a single file with the field name "file"
export const singleUpload = multer({storage}).single("file");