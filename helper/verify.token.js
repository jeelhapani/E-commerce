const JWT = require("jsonwebtoken");

module.exports = {
    verifyAccessToken: async(req, res, next) => {
        try {
            const token = req.headers.authorization;            
            
            if (!token) {
                return res.status(401).json({ status: false, message: "Unauthorized access Detected." });
            }

            const authToken = token.split(" ")[1];

            JWT.verify(authToken, process.env.JWT_TOKEN, (err, payload) => {
                if (err) {
                    return res.status(401).json({ status: false, messgae: err.message });
                }

                // console.log(payload);
                
                req.payload = payload;
                next();
            });

        } catch (error) {
            console.log(error);
            return res.status(401).json({ status: false, message: "Authentication failed." })
        }
    }
}