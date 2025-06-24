import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { generateToken } from '../lib/utils.js';
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
    const {fullName, email, password} = req.body;

   try {
    // hashing
    if(!fullName || !email || !password) {
        return res.status(400).json({message: "all fields are required"})
    }
    
    if(password.length < 6) {
        return res.status(400).json({message: "password must be at least 6 characters"})
    }

    const user = await User.findOne({email})

    if(user) return res.status(400).json({message: "email already exists"});

    const salt = await bcryptjs.genSalt(10)
    const hashPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
        fullName: fullName,
        email: email,
        password: hashPassword
    })

    if(newUser) {
         // generate jwt token
         generateToken(newUser._id, res)
         await newUser.save();
         res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePic: newUser.profilePic
         })
    } else {
        res.status(400).json({message: "invalid user data"});
    }
   } catch(err) {
    console.log("Error in signup controller", err);
    res.status(500).json({message: "internal server error"});
   }
}


// we have to find if user exists or not
export const login = async (req, res) => {
    const { email, password } = req.body;
   try {
    const user = await User.findOne({email})

    if(!user) {
        return res.status(400).json({message: "invalid credentials"});
    } 

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if(!isPasswordCorrect) {
        return res.status(400).json({message: "invalid credentials"});
    }

    generateToken(user._id, res);

    res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic
    });
   } catch(err) {
    console.log("Error in login controller", err.message);
    res.status(500).json({message: "internal server error"});
   }
}

export const logout = (req, res) => {
    try {
        res.cookie('jwt',"", {maxAge:0});
        res.status(200).json({message: "logout successfully"});
    } catch(err) {
        console.log("error in logout controller", err);
        res.status(500).json({message: "internal server error"});
    }
}


export const updateProfile = async () => {
    
}