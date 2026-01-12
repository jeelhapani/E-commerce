const userModel = require("../model/user.model");

module.exports = {

    existData: async(id, email, phoneNo) => {
        return new Promise(async (resolve) => {

            const existUserEmail = await userModel.countDocuments({
                _id: { $nin: [id] },
                email
            });
            if (existUserEmail) {
                return resolve({ status: false, message: "User Email Already Exist" });
            }

            const existUserPhone = await userModel.countDocuments({
                _id: { $nin: [id] },
                phoneNo
            });
            if (existUserPhone) {
                return resolve({ status: false, message: "User PhoneNo Already Exist" });
            }

            if (
                !existUserEmail &&
                !existUserPhone
            ) {
                return resolve({ status: true, message: "All Data Is Not Exist" });
            }
        });
    },

    signup: async(req_data) => {
        return new Promise(async (resolve) => {
            await userModel.insertOne(req_data);
            return resolve(await userModel.find({ ...req_data }, { __v: 0 }));
        });
    },

    userDataCheck: async(loginVal) => {
        return new Promise(async (resolve) => {
            resolve(
                // await userModel.findOne({
                //     $or: [
                //         { email: loginVal },
                //         ...( !isNaN(loginVal) ? [{ phoneNo: loginVal }] : [] )
                //     ]
                // })
                await userModel.findOne({
                    $or: [
                        { email: loginVal },
                        { phoneNo: loginVal }   
                    ]
                })
            )
        });
    }

}