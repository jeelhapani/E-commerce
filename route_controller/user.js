const { userServices } = require("../services/index");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

module.exports = {
    signup: async(req, res) => {
        try {
            const req_data = req.body;
            
            const existData = await userServices.existData(null, req_data.email, req_data.phoneNo);
            
            if (existData.status) {
                
                req_data.password = await bcrypt.hash(req_data.password, 10);
                
                const userData = await userServices.signup(req_data);
                
                return res.status(201).json({
                    status: false,
                    messgae: "User Create Successfully",
                    data: userData
                });
            } else {
                return res.status(201).json({
                    status: false,
                    messgae: existData.message
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

    login: async(req, res) => {
        try {
            const req_data = req.body;

            const data_check = await userServices.userDataCheck(req_data.loginVal);
             
            if (!data_check) {
                return res.status(201).json({ status: false, messgae: "Login Data or Password is wrong." });
            }
            
            const passwordMatch = await bcrypt.compare(req_data.password, data_check.password);
            if (!passwordMatch) {
                return res.status(201).json({ status: false, messgae: "Login Data or Password is wrong." });
            }

            const payload = {
                userid: data_check._id,
                username: data_check.name,
                email: data_check.email,
                user_role: "user"
            }
            
            const jwtToken = await JWT.sign(payload, process.env.JWT_TOKEN, { expiresIn: 86400 });
            
            res.cookie("ecommerce", jwtToken);

            return res.status(201).json({ status: true, messgae: "Login Successfully", jwtToken, userData: data_check });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: false,
                message: "Internal server error"
            });
        }
    }

}