import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//POST api/users/signup
export const signup = async (req, res)=>{
    try{
        const {fullname, email, password} = req.body;
        if(!fullname|| !email||!password){
            return res.status(400).json({
                success : false,
                message: "Please fill all the fields",
            });
        }

        const existingUser = await User.findOne({email});
        
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create user
        const user = await User.create({
            fullname,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user:{
                id: user._id,
                fullname: user.fullname,
                email: user.email,
                role: user.role,
            },
        })

    }catch(error){
        console.error(error);
        res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
    }
}

//Post api/users/login
export const login = async (req, res)=>{
    try{
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide email and password",
            });
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({message: "Invalid password"});
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {expiresIn: "7d",}
        )

        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.json({
            success: true,
            message: "Login successful",
            user:{
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                role: user.role,
            }
        })
    }catch(error){
        console.error(error);
            res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }   
}

// POST /api/users/logout
export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// GET /api/users/profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
