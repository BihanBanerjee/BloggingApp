import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
export const signup = async (req, res, next) => {
    //console.log(req.body);
    const { username, email, password } = req.body;
    if (!username || !email || !password || username === "" || email === "" || password === "") {
        // return res.status(400).json({ msg: "Not all fields have been entered." });
        return next(errorHandler(400, "Not all fields have been entered."));
    }
    if (password.length < 6) {
        // return res.status(400).json({ msg: "The password needs to be at least 6 characters long." });
        return next(errorHandler(400, "The password needs to be at least 6 characters long."));
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

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password || email === "" || password === "") {
        // return res.status(400).json({ msg: "Not all fields have been entered." });
        const res = next(errorHandler(400, "Not all fields have been entered."));
        console.log(res);
        return next(errorHandler(400, "Not all fields have been entered."));
    }
    try{
        const user = await User.findOne({ email });
        if (!user) {
            // return res.status(400).json({ msg: "No account with this email has been registered." });
            return next(errorHandler(400, "No account with this email has been registered."));
        }
        const isMatch = bcryptjs.compareSync(password, user.password);
        if (!isMatch) {
            // return res.status(400).json({ msg: "Invalid credentials." });
            return next(errorHandler(400, "Invalid password."));
        }
        // const token = user.generateAuthToken();
        // res.json({ token, ...user._doc });
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
        );
        
        const { password: pass, ...rest } = user._doc;

        res.status(200).cookie('access_token', token, { httpOnly: true }).json(rest);

    }catch(error){
        next(error);
    }
};

export const google = async (req, res, next) => {
    const { email, name, googlePhotoUrl } = req.body;

    try{
        const user = await User.findOne({ email });
        if (user) {
            const token = jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET,
            );
            
            const { password: pass, ...rest } = user._doc;
            res.status(200).cookie('access_token', token, { httpOnly: true }).json(rest);
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const user = new User({
                username: name.toLowerCase().split(' ').join('') + Math.random().toString(36).slice(-4),
                email,
                password: hashedPassword,
                profilePicture: googlePhotoUrl
            });
            await user.save();
            const token = jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET,
            );
            
            const { password: pass, ...rest } = user._doc;
            res.status(200).cookie('access_token', token, { httpOnly: true }).json(rest);
        }
    }catch(error){
        next(error);
    }

}