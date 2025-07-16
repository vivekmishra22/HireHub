import DataUriParser from "datauri/parser.js";
// ✅ Imports the `DataUriParser` class from the `datauri` package
// It helps convert file buffers into Data URI strings (base64-encoded)
// Used when you want to upload to Cloudinary without saving the file locally
import path from "path";
// ✅ Node.js built-in module to handle file paths
// Here it’s used to extract the file extension from the uploaded file's name

const getDataUri = (file) => {
    // ✅ Defines a utility function getDataUri that accepts a file object (typically from multer middleware)
    const parser = new DataUriParser(); // ✅ Creates an instance of the DataUriParser class
    const extName = path.extname(file.originalname).toString(); // ✅ Gets the file extension (like .jpg, .png) from the original file name
    return parser.format(extName, file.buffer); // ✅ Converts the file to a Data URI string
}

export default getDataUri;
// ✅ Exports the utility so you can use it elsewhere (e.g., in an upload controller)
// Example:
// const dataUri = getDataUri(req.file);
// const fileUri = dataUri.content;