const users = require('../schema/userSchema');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const books = require('../schema/bookSchema');
const { uploadToBlobStorage } = require('../common/upload');



// const register = async (req, res) => {
//     let userPayload, profilePic, encryptedPassword, getBase64, filePath, existingEmail, userDetails;
//     try {
//         userPayload = req.body;
//         encryptedPassword = await bcrypt.hash(userPayload.password, 10);
//         userPayload.password = encryptedPassword;
//         profilePic = req.files;
//         existingEmail = await users.findOne({ email: userPayload.email });
//         if (existingEmail === null) {
//             userDetails = await users.create(userPayload);
//             filePath = `files/${userDetails._id}/${userPayload.name}.pdf`
//             getBase64 = Buffer.from(profilePic[0].buffer).toString("base64")
//             const blobName = `${userDetails._id}/${userPayload.name}.pdf`;
//             await uploadToBlobStorage(profilePic[0].buffer, blobName);
//             if (userDetails) {
//                 fs.mkdir(`files/${userDetails._id}`, async (err) => {
//                     if (err) {
//                         return console.log(err)
//                     }
//                     else {
//                         fs.writeFileSync(`files/${userDetails._id}/${userPayload.name}.pdf`, getBase64, "base64");
//                         await users.findByIdAndUpdate(userDetails._id, { filePath })

//                         return res.send({ status: 1, message: "Registered Successfully" })
//                     }
//                 })
//             }
//         }
//         else {
//             return res.send({ status: 0, message: "email already registered" })
//         }

//     } catch (error) {
//         return res.send({ status: 0, message: error.message })
//     }
// }

const me =  async (req,res) => {
    try {
          res.send("Hello world");
    } catch (error) {
        
    }
}

const register = async (req, res) => {
    let userPayload, encryptedPassword, existingEmail, userDetails;
    try {
        userPayload = req.body;
        encryptedPassword = await bcrypt.hash(userPayload.password, 10);
        userPayload.password = encryptedPassword;
        profilePic = req.files;
        existingEmail = await users.findOne({ email: userPayload.email });
        if (existingEmail === null) {
            userDetails = await users.create(userPayload);
            if (userDetails) {
                return res.send({ status: 1, message: "Registered Successfully" })
            }
        }
        else {
            return res.send({ status: 0, message: "email already registered" })
        }

    } catch (error) {
        return res.send({ status: 0, message: error.message })
    }
}

const getAllUser = async (req, res) => {
    let userData, usersWithBase64, fileContent, base64String;

    try {
        userData = await users.find({ status: 1 });

        if (userData) {
            usersWithBase64 = await (
                userData.map((e) => {
                    fileContent = fs.readFileSync(e.filePath);
                    base64String = fileContent.toString('base64');
                    return {
                        name: e.name,
                        email: e.email,
                        mobile: e.mobile,
                        password: e.password,
                        status: e.status,
                        filePath: base64String,
                    };
                })
            )

            return res.send({ status: 1, count: userData.length, data: usersWithBase64 })

        }
    } catch (error) {
        return res.send({ status: 0, message: error.message })
    }
}

const getUserById = async (req, res) => {
    let userId, userPayload;
    try {
        userPayload = req.body;
        if (Object.keys(userPayload).length > 0) {
            userId = userPayload.id
            userData = await users.find({ _id: userId });
            return res.send({ status: 1, data: userData })
        }
        else {
            return res.send({ status: 0, message: "data not found" })
        }
    } catch (error) {
        return res.send({ status: 0, message: error.message })
    }
}

const login = async (req, res) => {
    let userPayload, existingObject, comparePassword, updatedUserData
    try {
        userPayload = req.body;
        existingObject = await users.findOne({ email: userPayload.email, status: 1 });
        if (existingObject !== null) {
            updatedUserData = {};
            updatedUserData.name = existingObject.name;
            updatedUserData.email = existingObject.email;
            updatedUserData.mobile = existingObject.mobile;
            comparePassword = await bcrypt.compare(userPayload.password, existingObject.password);
            if (comparePassword) {
                return res.send({
                    status: 1,
                    message: "Login Successfully",
                    token: jwt.sign(
                        {
                            data: updatedUserData,
                        },
                        "secretkey", { expiresIn: '2h' }
                    ),
                });
            }
            else {
                return res.send({ status: 0, message: "Email or Password not correct" })
            }

        }
        else {
            return res.send({ status: 0, message: "Email not found" })
        }


    } catch (error) {
        return res.send({ status: 0, message: error.message })
    }
}

async function deleteUser(req, res) {
    let userPayload, userCheck;
    try {

        userPayload = req.body;

        if (Object.keys(userPayload).length > 0) {
            userCheck = await users.findOne({ _id: userPayload.userId, status: 1 });
            if (userCheck !== null) {
                existingObject = await users.findByIdAndUpdate(userPayload.userId, { status: 2 });
                await books.updateMany({ userId: userPayload.userId }, { status: 2 });
                return res.send({ status: 1, message: "User Deleted Successfully" });
            }
            else {
                return res.send({ status: 0, message: "User not found" });
            }
        }
        else {
            return res.send({ status: 0, message: "data Not found" });
        }

    } catch (error) {
        return res.send({ status: 0, message: error.message });
    }
}






async function test(req, res) {
    let data;
    try {
        data = await users.aggregate([
            {
                $match: {
                    status: 1
                }
            },
            {
                $lookup: {
                    from: 'books',
                    localField: '_id',
                    foreignField: "userId",
                    as: "userBooks"

                }
            },
            {
                $project: {
                    name: 1,
                    email: 1,
                    mobile: 1,
                    userBooks: {
                        title: 1,
                        author: 1,
                        publishedDate: 1
                    }
                }
            }
        ]);
        return res.send({ status: 1, data });
    } catch (error) {
        return res.send({ status: 0, message: error.message });
    }

}



module.exports = {
    register,
    getAllUser,
    getUserById,
    login,
    deleteUser,
    test,
    me
}

