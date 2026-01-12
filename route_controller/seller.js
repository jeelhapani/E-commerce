const { sellerServices } = require("../services/index");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

module.exports = {

    sellerSignup: async(req, res) => {
        try {
            const req_data = req.body;

            const existData = await sellerServices.existData(null, req_data.email, req_data.phoneNo);
            console.log(existData);
            
            if (existData.status) {
                
                req_data.password = await bcrypt.hash(req_data.password, 10);
    
                const sellerData = await sellerServices.sellerSignup(req_data);

                return res.status(201).json({
                    status: true,
                    message: "Seller Signup Successfully",
                    sellerData
                });
            } else {
                
                return res.status(201).json({
                    status: false,
                    message: existData.message
                });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: false,
                message: "Internal server error"
            });
        }
    },

    sellerLogin: async(req, res, next) => {
        try {
            const req_data = req.body;

            const sellerData = await sellerServices.userDataCheck(req_data.loginVal);
            if (!sellerData) {
                return res.status(201).json({ status: false, message: "Login Data or Password is wrong." })
            }
            
            const passwordMatch = await bcrypt.compare(req_data.password, sellerData.password);
            if (!passwordMatch) {
                return res.status(201).json({ status: false, message: "Login Data or Password is wrong." })
            }

            const payload = {
                userid: sellerData._id,
                username: sellerData.name,
                email: sellerData.email,
                user_role: "seller"
            }

            const token = await JWT.sign(payload, process.env.JWT_TOKEN, { expiresIn: 86400 });

            return res.status(201).json({
                status: true,
                message: "Login Successfully",
                token,
                sellerData
            })

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: false,
                message: "Internal server error"
            });            
        }
    },

}