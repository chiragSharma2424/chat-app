import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import cloudniary from "../lib/cloudinary.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filterUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password");

        res.status(200).json(filterUsers);

    } catch(err) {
        console.log("error in getUsersforSidebar: ", err);
        res.status(500).json({
            error: "internal server error"
        });
    }
}

export const getMessages = async(req, res) => {
    try {
        const {id: userToChatId} = req.params;
        const myId = req.user._id;
        const messages = await Message.find({
            $or: [
                {senderId: myId, recieverId: userToChatId},
                {senderId: userToChatId, recieverId: myId}
            ]
        })
        res.status(200).json({messages});
    } catch(err) {
        console.log("error in getmessages contoller", err);
        res.status(500).json({error: "internal server error"});
    }
}

export const sendMessage = async (req, res) => {
    try {
        const {text, image} = req.body;
        const {id: recieverId} = req.params;
        const senderId = req.user._id

        let imgaeUrl;
        if(!image) {
            const uploadResponse = await cloudniary.uploader.upload(image);
            imgaeUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            recieverId,
            text,
            image: imgaeUrl
        });

        await newMessage.save();
    } catch(err) {
        console.log("error in sendMessage controller", err);
        res.status(500).json({error: "internal server error"})
    }
}