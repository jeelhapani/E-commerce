const { chatServices } = require("../services/index");
const { getIo } = require("../helper/common/socket.io");
const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;
const commonFunction = require("../helper/commonFunctions");


module.exports = {

    createChat: async(req, res) => {
        try {
            const req_data = req.body;

            const chatData = await chatServices.saveMessage(req_data);

            const io = getIo();
            
            io.to(req_data.receiver).emit("receive_message", {
                sender: req_data.sender,
                message: req_data.message,
                createdAt: chatData.createdAt,
            });
            
            return res.status(201).json({
                status: true,
                message: "Chat send successfully",
                chatData
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: false,
                message: "Internal server error"
            });
        }
    },

    chatWiseUserList: async(req, res) => {
        try {
            const userId = req.payload.userid;
            console.log(userId);
            
            const cl = await chatServices.userWiseChatList(new objectId(userId));
            console.log(cl);

            const chatList = cl.map(chat => ({
                ...chat,
                date: commonFunction.formateChatTime(chat.date)
            }));
            
            return res.status(201).json({
                status: true,
                message: "Chat list fetch successfully",
                chatList
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: false,
                message: "Internal server error"
            });
        }
    },

    userChatHistory: async(req, res) => {
        try {
            const req_data = req.body;
            const userId = req.payload.userid;
            
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;

            const cl = await chatServices.userChatHistory(
                new objectId(userId),
                new objectId(req_data.senderId),
                new objectId(req_data.receiverId),
                skip,   
                limit
            );

            const messages = cl[0].messages;
            const total = cl[0].totalCount[0]?.count || 0;
            
            const chatList = messages.map(chat => ({
                ...chat,
                createdAt: commonFunction.formateChatTime(chat.createdAt)
            }));

            return res.status(201).json({
                status: true,
                message: "Chat history fetch successfully",
                page,
                limit,
                total,
                hasMore: page * limit < total,
                data: chatList.reverse()
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: false,
                message: "Internal server error"
            });
        }
    },

}