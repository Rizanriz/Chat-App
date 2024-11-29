import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";


export const listOfUsers = async (req,res) =>{
    try {
        const loggedInUserId = req.user._id 
        const filteredUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password")// To not include the user

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("error in getting users", error.message);
        res.status(500).json({message: error.message})
    }
} 

export const getMessages = async (req, res) =>{
    try {
        const {id:userToChatId} = req.params
        const myId = req.user._id

        const messages = await Message.find({
            $or:[
                {senderId:myId, receiverId:userToChatId},
                {senderId:userToChatId, receiverId:myId}
            ]
        })
        res.status(200).json(messages);
    } catch (error) {
        console.log("error in getting messages", error.message);
        res.status(500).json({error:"Internal server error"})
    }
}

export const sendMessage = async (req, res) =>{
    try {
        const {text,image} = req.body
        const {id:receiverId} = req.params
        const senderId = req.user._id

        let imageUrl
        if(image){
            const uploadResponces = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponces.secure_url   
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl 
        })

        await newMessage.save()
        res.status(201).json(newMessage);
    } catch (error) {
        console.log("error in sendMessage",error.message);
        res.status(500).json({error:"Internal server error"})
    }
}