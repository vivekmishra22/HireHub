import jwt from "jsonwebtoken"; // Import the jsonwebtoken library to work with JWTs

const isAuthenticated = async (req, res, next) => {     // Define an asynchronous middleware function
    try {
        const token = req.cookies.token;    // Extract the token from cookies (assumes cookie-parser middleware is used)
        if(!token){             // If token is not found, user is not authenticated
            return res.status(401).json({
                message:"User not authenticated",   // Inform the client
                success:false           // Operation failed
            });
        };

        // Verify the token using the secret key from environment variables
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        if(!decode){        // If decoding fails or returns null, the token is invalid
            return res.status(401).json({
                message:"Invalid token",    // Inform about invalid token
                success:false               // Operation failed
            });
        };
        req.id = decode.userId;     // Store the decoded userId from the token in the request object
        next();         // Proceed to the next middleware or route handler
    } catch (error) {
        console.log(error);     // If any unexpected error occurs, log it to the console
    }
}

export default isAuthenticated;     // Export the middleware so it can be used in other parts of the app