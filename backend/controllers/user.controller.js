import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/DataUri.js";
import jwt from "jsonwebtoken";
export const RegisterUser = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, role } = req.body;
    // if somethong is smissing
    if (!fullName || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    // upload profile pic to cloudinary
    const file = req.file;
    let profilePic_url = "";
    if (file) {
      const fileUri = getDataUri(file); // get data uri of the file
      const myCloud = await cloudinary.uploader.upload(fileUri.content); // upload to cloudinary
      profilePic_url = myCloud.secure_url; // get the secure url of the uploaded image
    }
    // if user already exist
    const isEmailExist = await User.findOne({ email });
    if (isEmailExist) {
      return res.status(400).json({
        message: "User exist with this email already!",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      profilePic: profilePic_url,
      role,
    });

    return res.status(201).json({
      message: "Registerd successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something Went Wrong",
      success: false,
    });
  }
};

// Login User

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Incorrect email",
        success: false,
      });
    }
    const isPassMatch = await bcrypt.compare(password, user.password);
    if (!isPassMatch) {
      return res.status(400).json({
        message: "Incorrect Password!",
        success: false,
      });
    }
    const tokenData = {
      userId: user._id,
      email: user.email,
    };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true, // it means that the cookie cannot be accessed via client-side JavaScript
        maxAge: 24*60 * 60 * 1000, // it means that the cookie will expire after 1 day
        sameSite: "strict", // it means that the cookie will only be sent in requests originating from the same site
      })
      .json({
        message: `Login Successful. Welcome ${user.fullName}`,
        success: true,
        user
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something Went Wrong",
      success: false,
    });
  }
};

export const Logout = async (req,res)=>{
  try {
    //clear the cookie 
    return res.status(200).clearCookie("token").json({
      message:"Logout Successfully",
      success:true,
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ 
      message: "Something Went Wrong",
      success: false,
    });
  }
}

export const updateUser  = async (req,res)=>{
  try {
    const userId = req._id //token sai nikaali hai
    const {fullName,email,phoneNumber,} = req.body
    const file = req.file;
    let profilePic_url = "";
    if (file) {
      const fileUri = getDataUri(file); // get data uri of the file
      const myCloud = await cloudinary.uploader.upload(fileUri.content); // upload to cloudinary
      profilePic_url = myCloud.secure_url; // get the secure url of the uploaded image
    }
    const updatedData = {
      fullName,
      email,
      phoneNumber,
    }
    if(profilePic_url){
      updatedData.profilePic = profilePic_url
    } 
    // new:true means that it will return the updated user
    const updatedUser = await User.findByIdAndUpdate(userId,updatedData,{new:true})
    return res.status(200).json({
      message:"User Updated Successfully",
      success:true,
      updatedUser
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something Went Wrong",
      success: false,
    }); 
  }
}


export const getCurrUser = async (req, res) => {
  try {
    const user = await User.findById(req._id).select("-password");

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
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};