let ioInstance = null;

const initSocket = (httpServer) => {
    const { Server } = require("socket.io");

    ioInstance = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: [ "GET", "POST" ]
        },
        transports: ["websocket"] // 🔥 REQUIRED for Postman
    });

    ioInstance.on("connection", (socket) => {

        console.log("Socket connected:", socket.id);
        
        socket.on("join_room", ({ userId }) => {
            if (!userId) return;

            socket.join(userId);
            
            console.log(`User ${userId} joined room`);
        });

        socket.on("disconnect", () => {
            console.log("Socket disconnected:", socket.id);
        });

        return ioInstance;
    });
}

const getIo = () => {
    if (!ioInstance) {
        throw new Error("Socket.io not initialized!")
    }

    return ioInstance;
}

module.exports = {
    initSocket, getIo
}




// const { getIO } = require("../socket");

// exports.sendNotification = async (req, res) => {
//     try {
//         const { userId, message } = req.body;

//         const io = getIO();

//         // Emit to specific user room
//         io.to(userId).emit("notification", {
//             message,
//             time: new Date()
//         });

//         return res.status(200).json({
//             success: true,
//             message: "Notification sent"
//         });

//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             error: error.message
//         });
//     }
// };
