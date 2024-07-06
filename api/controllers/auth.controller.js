import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
export const signup = async (req, res, next) => {
    //console.log(req.body);
    const { username, email, password } = req.body;
    if (!username || !email || !password || username === "" || email === "" || password === "") {
        // return res.status(400).json({ msg: "Not all fields have been entered." });
        next(errorHandler(400, "Not all fields have been entered."));
    }
    if (password.length < 6) {
        // return res.status(400).json({ msg: "The password needs to be at least 6 characters long." });
        next(errorHandler(400, "The password needs to be at least 6 characters long."));
    }

    // Check if the user already exists
    // const existingUser = await User.findOne({ email });
    // if (existingUser) {
    //     return res
    //         .status(400)
    //         .json({ msg: "An account with this email already exists." });
    // }

    
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    // Check if the email or username already exists
    if (existingUser) {
        if (existingUser.email === email) {
            //return res.status(400).json({ msg: "An account with this email already exists." });
            return next(errorHandler(400, "An account with this email already exists."));
        }
        if (existingUser.username === username) {
            //return res.status(400).json({ msg: "An account with this username already exists." });
            return next(errorHandler(400, "An account with this username already exists."));
        }
    }

    const salt = await bcryptjs.genSalt();
    const passwordHash = await bcryptjs.hash(password, salt);

    
    const newUser = new User({
        username,
        email,
        password: passwordHash, 
    });
    
    try{
        const savedUser = await newUser.save();
        res.json(savedUser); 
    } catch(error){
        next(error); // When next is called with an error object, Express recognizes this as an error and will skip any non-error handling middleware. Instead, it will look for error-handling middleware to handle the error.
    }        
};