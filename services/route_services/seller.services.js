const sellerModel = require("../model/seller.model");

module.exports = {

    existData: async(id, email, phoneNo) => {
        return new Promise(async (resolve) => {
            const existEmail = await sellerModel.countDocuments({
                email
            });
            if (existEmail) {
                return resolve({ status: false, message: "Email Already Exist" });
            }

            const existPhoneNo = await sellerModel.countDocuments({
                phoneNo
            });
            if (existPhoneNo) {
                return resolve({ status: false, message: "Email Already Exist" });
            }

            if (
                !existEmail &&
                !existPhoneNo
            ) {
                return resolve({ status: true, message: "All Data is Not Exist" });
            }
        });
    },

    sellerSignup: async(req_data) => {
        return new Promise(async (resolve) => {
            await sellerModel.insertOne(req_data);
            return resolve(await sellerModel.find({ ...req_data }, { __v: 0 }));
        });
    },

    userDataCheck: async(loginVal) => {
        return new Promise(async (resolve) => {
            return resolve(
                await sellerModel.findOne({
                    $or: [
                        { email: loginVal },
                        { phoneNo: loginVal }
                    ]
                })
            )
        });
    }

    
}