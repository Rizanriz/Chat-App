import { generateToken } from "../lib/utils.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import cloudinary from "../lib/cloudinary.js"

export const signup = async (req, res) => {

    const { fullName, email, password } = req.body

    try {
        if(!fullName || !email || !password){
            return res.status(400).json({ error: "All fields are required" })
        }
        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters long" })
        }

        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ error: "Email already exists" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({ fullName, email, password: hashedPassword })

        if (newUser) {
            generateToken(newUser._id, res)
            await newUser.save()
            res.status(201).json({
                message: "User created successfully",
                _id: newUser._id,
                email: newUser.email,
                password: newUser.password,
                profilePic: newUser.profilePic
            })
        } else {
            return res.status(400).json({ error: "Failed to create user" })
        }

    } catch (error) {
        console.log("error creating user", error.message);
        res.status(500).json({ message: "Failed to create user" })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email})

        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" })
        }

        const isPasswordCoreect = await bcrypt.compare(password, user.password)
        if (!isPasswordCoreect) {
            return res.status(401).json({ error: "Invalid credentials" })
        }
        generateToken(user._id, res)
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic
        })
    } catch (error) {
        console.log("error in login", error.message);
        res.status(500).json({message: error.message})
    }
}
export const logout = (req, res) => {
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message: "logged out successfully"})
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"})    
    }
}

export const updateProfile = async (req, res) => {
    try {
    const {profilePic} = req.body
    const userId = req.user._id

    if (!profilePic){
        return res.status(400).json({error: "Profile picture is required"})
    }
    const uploadResponce = await cloudinary.uploader.upload(profilePic)
    const updateUser = await User.findByIdAndUpdate(userId,
        {profilePic:uploadResponce.secure_url},
        {new:true})

    res.status(200).json(updateUser)
    } catch (error) {
        console.log("error in updateProfile", error);
        res.status(500).json({message: "Failed to update profile"})
    }

}

export const checkAuth = async (req, res) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("error in checkAuth", error.message);
        res.status(500).json({message: "Failed to check authentication"})
    }
}