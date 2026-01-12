const chatModel = require("../model/chat.model");

module.exports = {

    saveMessage: async(chatData) => {
        return new Promise( async( resolve) => {
            const chatdata = await chatModel.insertOne(chatData);
            console.log(chatdata);
            
            return resolve( await chatModel.findOne({ ...chatData }) )
        });
    },

    userWiseChatList: async(userId) => {
        console.log(userId);
        
        return new Promise( async( resolve) => {
            const chatdata = await chatModel.aggregate([
                {
                    $match: {
                        $or: [
                            { sender: userId },
                            { receiver: userId }
                        ]
                    }
                },
                {
                    $sort: { createdAt: -1 }
                },
                {
                    $addFields: {
                        status: {
                            $cond: [
                                { $eq: ["$sender", userId] },
                                "$receiver",
                                "$sender"
                            ]
                        }
                    }
                },
                {
                    $group: {
                        _id: "$status",
                        message: { $first: "$message" },
                        date: { $first: "$createdAt" },
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "_id",
                        foreignField: "_id",
                        as: "user"
                    }
                },
                { $unwind: "$user" },
                {
                    $project: {
                        _id: "$user._id",
                        name: "$user.name",
                        message: 1,
                        date: 1
                    }
                    // $project: {
                    //     _id: 0,
                    //     user: {
                    //         _id: "$user._id",
                    //         name: "$user.name",
                    //         email: "$user.email",
                    //     },
                    //     message: 1,
                    //     date: 1
                    // }
                }
            ]);
            console.log(chatdata);
            
            return resolve( chatdata );
        });
    },

    userChatHistory: async(userId, senderId, receiverId, skip, limit) => {
        
        return new Promise( async( resolve) => {

            const chatdata = await chatModel.aggregate([
                {
                    $match: {
                        $or: [
                            { sender: senderId, receiver: receiverId },
                            { sender: receiverId, receiver: senderId },
                        ]
                    }
                },
                { $sort: { createdAt: -1 } },
                {
                    $addFields: {
                        status: {
                            $cond: [
                                { $eq: ["$sender", userId] },
                                1,
                                0
                            ]
                        }
                    }
                },
                {
                    $facet: {
                        messages: [
                            { $skip: skip },
                            { $limit: limit },
                            {
                                $project: {
                                    sender: 1,
                                    receiver: 1,
                                    message: 1,
                                    createdAt: 1,
                                    status: 1,
                                }
                            }
                        ],
                        totalCount: [
                            { $count: "count" }
                        ]
                    }
                }
            ]);

            // const chatdata = await chatModel.aggregate([
            //     {
            //         $match: {
            //             $or: [
            //                 { sender: senderId, receiver: receiverId },
            //                 { sender: receiverId, receiver: senderId },
            //             ]
            //         }
            //     },
            //     { $sort: { createdAt: -1 } },
            //     {
            //         $addFields: {
            //             status: {
            //                 $cond: [
            //                     { $eq: ["$sender", userId] },
            //                     1,
            //                     0
            //                 ]
            //             }
            //         }
            //     },
            //     {
            //         $project: {
            //             sender: 1,
            //             receiver: 1,
            //             message: 1,
            //             createdAt: 1,
            //             status: 1,
            //         }
            //     }
            // ]);


            
            return resolve( chatdata );
        });
    },

}