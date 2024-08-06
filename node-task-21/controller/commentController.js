const comments = require('../schema/commentSchema');


const addComment = async (req, res) => {
    let userPayload, commentData;
    try {
        userPayload = req.body;
        if (Object.keys(userPayload).length > 0) {
            if (userPayload) {
                commentData = await comments.create(userPayload);
                if (commentData !== undefined) {
                    return res.send({ status: 1, message: "Comment Added Successfully" })
                }
                else {
                    return res.send({ status: 0, message: "Invalid Data" })
                }
            }
        }
        else {
            return res.send({ status: 0, message: "Data not found" });
        }
    } catch (error) {
        return res.send({ status: 0, message: error.message })
    }
}

module.exports = {
    addComment
}