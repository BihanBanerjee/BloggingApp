import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
export const signup = async (req, res) => {
    //console.log(req.body);
    const { username, email, password } = req.body;
    if (!username || !email || !password || username === "" || email === "" || password === "") {
        return res.status(400).json({ msg: "Not all fields have been entered." });
    }
    if (password.length < 6) {
        return res
            .status(400)
            .json({ msg: "The password needs to be at least 6 characters long." });
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
            return res.status(400).json({ msg: "An account with this email already exists." });
        }
        if (existingUser.username === username) {
            return res.status(400).json({ msg: "An account with this username already exists." });
        }
    }

    const salt = await bcryptjs.genSalt();
    const passwordHash = await bcryptjs.hash(password, salt);

    
    const newUser = new User({
        username,
        email,
        password: passwordHash, 
    });
    const savedUser = await newUser.save();
    res.json(savedUser);        
};