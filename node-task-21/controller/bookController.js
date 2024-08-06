const books = require('../schema/bookSchema');
const users = require('../schema/userSchema');
const fs = require('fs');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId


async function addBook(req, res) {
    let userPayload, existingObject;
    try {
        userPayload = req.body;
        if (Object.keys(userPayload).length > 0) {
            if (userPayload) {
                existingObject = await books.findOne({ title: userPayload.title });
                if (existingObject === null) {
                    await books.create(userPayload);
                    return res.send({ status: 1, message: 'Added successfully' });
                }
                else {
                    return res.send({ status: 1, message: 'book already added' });
                }
            }

        }
        else {
            return res.send({ status: 0, message: "Data not found" });
        }
    } catch (error) {
        return res.send({ status: 0, message: error.message });
    }
}

async function deleteBook(req, res) {
    let userPayload, findOneObject;
    try {
        userPayload = req.body;
        if (Object.keys(userPayload).length > 0) {
            if (userPayload) {
                findOneObject = await books.findByIdAndUpdate(userPayload.id, { status: 2 });
                if (findOneObject !== null) {
                    return res.send({ status: 1, message: "Deleted Successfully" });
                }
                else {
                    return res.send({ status: 0, message: "invalid id" });
                }
            }

        }
        else {
            return res.send({ status: 0, message: "Data not found" });
        }
    } catch (error) {
        return res.send({ status: 0, message: error.message });
    }
}

async function getAllBook(req, res) {
    let bookData;
    try {
        bookData = await books.find({ status: 1 });
        if (bookData) {
            return res.send({ status: 1, count: bookData.length, data: bookData });
        }
        else {
            return res.send({ status: 0, message: "Data not found" });
        }
    } catch (error) {
        return res.send({ status: 0, message: error.message });
    }
}

async function getAllBookByUserId(req, res) {
    let userPayload, bookData, userId;
    try {
        userPayload = req.body;
        if (Object.keys(userPayload).length > 0) {
            userId = userPayload.id;
            if (userId) {
                bookData = await books.find({ userId });
                if (bookData !== null) {
                    res.send({ status: 1, count: bookData.length, data: bookData });
                }
                else {
                    return res.send({ status: 0, message: "Invalid Id" });
                }
            }
        }
        else {
            return res.send({ status: 0, message: "Data not found" });
        }


    } catch (error) {
        return res.send({ status: 0, message: error.message });
    }
}

async function getAllBookByUserIdwithUserInfo(req, res) {
    let userId, bookData, userData, base64String, fileContent, newBookData;
    try {
        userId = req.body.id;
        if (userId) {
            bookData = await books.find({ userId });
            userData = await users.findOne({ _id: userId });
            fileContent = fs.readFileSync(userData.filePath);
            base64String = fileContent.toString("base64");
            userData.filePath = base64String;
            if (bookData !== null && userData) {
                res.send({
                    status: 1, data: {
                        userData,
                        bookData
                    }
                });
            }
            else {
                return res.send({ status: 0, message: "invalid id" });
            }
        }
        else {
            return res.send({ status: 0, message: "Data not found" });
        }


    } catch (error) {
        return res.send({ status: 0, message: error.message });
    }
}

async function getAllBookUserData(req, res) {
    let userBookData;
    try {
        userBookData = await users.aggregate([
            {
                $match: {
                    status: 1
                }
            },

            {
                $lookup: {
                    from: 'books',
                    localField: '_id',
                    foreignField: 'userId',
                    as: 'publishedBooks'
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    email: 1,
                    mobile: 1,
                    publishedBooks: {
                        title: 1,
                        author: 1,
                        publishedDate: 1,
                    }
                }
            },
        ]);

        return res.send({ status: 1, data: userBookData });

    } catch (error) {
        res.send({ status: 0, message: error.message });
    }
}

async function getAllCommentsByBookId(req, res) {

    let userId, allCommentData;
    try {
        userId = req.body.userId;
        allCommentData = await users.aggregate([
            {
                $match: {
                    _id: new ObjectId(userId)
                }
            },
            {
                $lookup: {
                    from: "books",
                    foreignField: "userId",
                    localField: "_id",
                    as: "allBooks"
                }
            },
            {
                $lookup: {
                    from: "comments",
                    localField: "allBooks._id",
                    foreignField: "bookId",
                    as: "allComments"
                }
            },
            {
                $project: {
                    name: 1,
                    email: 1,
                    mobile: 1,
                    books: {
                        $map: {
                            input: "$allBooks",
                            as: "book",
                            in: {
                                _id: "$$book._id",
                                title: "$$book.title",
                                comments: {
                                    $filter: {
                                        input: "$allComments",
                                        as: "comment",
                                        cond: { $eq: ["$$comment.bookId", "$$book._id"] },
                                    }
                                },
                            }
                        }
                    }
                }
            }
        ]);
        return res.send({ status: 1, data: allCommentData });
    } catch (error) {
        return res.send({ status: 0, message: error.message });
    }

}




module.exports = {
    addBook,
    deleteBook,
    getAllBook,
    getAllBookByUserId,
    getAllBookByUserIdwithUserInfo,
    getAllBookUserData,
    getAllCommentsByBookId,
}