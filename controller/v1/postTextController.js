const express = require('express');

const Post = require('../../modules/postextModules');

const jwt = require('jsonwebtoken');

const SECRET_KEY = "node";

module.exports.postData = async (req, res) => {
    const { postText, userId, avatar } = req.body;
    if (!req.body.postText) {
        res.status(401).send({ success: false, status: 0, message: "postText can not be empty!" });
        return;
    }
    try {
        const authData = await jwt.verify(req.token, SECRET_KEY);
        var imagePath = '';
        if (req.file) {
            imagePath = Post.avatarPath + "/" + req.file.filename;
        }
        // req.body.avatar = imagePath;
        const postData = await Post.create({
            postText: postText,
            avatar: imagePath,
            userId: authData.id,
        });
        if (!postData) {
            return res.status(404).json({ success: false, status: 0, message: "Data not     " });
        }
        if (postData) {
            return res.status(200).json({ success: true, status: 1, message: "Data Inserted", data: postData });
        }
    } catch (error) {
        console.log(error);
        return res.status(404).json({ success: "false", status: 0, message: " invalid  token " });
    }
}

module.exports.getData = async (req, res) => {

    try {
        const authData = await jwt.verify(req.token, SECRET_KEY);
        if (authData) {
            const findData = await Post.aggregate([
                {
                    $group: {
                        _id: "$_id",
                        postText: {
                            $first: "$postText"
                        },
                        userId: {
                            $first: "$userId"
                        },
                        avatar: {
                            $first: "$avatar"
                        }
                    }
                },
                {
                    $lookup: {
                        from: "likeposts",
                        localField: "_id",
                        foreignField: "postId",
                        pipeline: [
                            {
                                $match: { isLike: true },
                            },
                        ],
                        as: "LikeCount"
                    },
                },
                {
                    $project: {
                        postText: 1,
                        userId: 1,
                        avatar: 1,
                        likeCount: {
                            $size: "$LikeCount"
                        }
                    }
                },
            ]);
            // findData.toArray();
            if (!findData) {
                return res.status(404).json({ success: false, message: "Data not found", status: 0, });
            }
            if (findData) {
                return res.status(200).json({ success: true, message: "Data found Successfully", status: 1, data: findData, });
            }
        }
    } catch (error) {
        console.log("err--", error)
        return res.status(404).json({ success: false, status: 0, message: "Please Provide valide token" });
    }
}

module.exports.GetAllPost = async (req,res) =>{
     try {
        const authData = await jwt.verify(req.token, SECRET_KEY);
        // console.log(authData);
        if (authData) {
            const getdata = await Post.aggregate([
                {
                    $group: {
                        _id: "$_id",
                        postText: {
                            $first: "$postText"
                        },
                        userId: {
                            $first: "$userId"
                        },
                        avatar: {
                            $first: "$avatar"
                        },
                    }
                },
                {
                    $lookup: {
                        from: "likeposts",
                        localField: "_id",
                        foreignField: "postId",
                        pipeline: [
                            {
                                $match: { isLike: true },
                            },
                            // {
                            // liked : {$in: [ req.authData.id, "$userId" ]},
                            // }
                        ],
                        as: "LikeCount"
                    },
                },
                {
                    $project: {
                        postText: 1,
                        userId: 1,
                        avatar: 1,
                        // liked : {$in: [ req.authData.id, "$userId" ]},
                        likeCount: {
                            $size: "$LikeCount",
                        }
                    }
                },
                // {
                //     $addFields: {
                //       isLike: { ifNull: ["$userId", false] },
                //     },
                //   },
            ]);
            if (!getdata) {
                return res.status(404).json({ success: false, message: "Data not found", status: 0, });
            }
            if (getdata) {
                return res.status(200).json({ success: true, message: "Data found Successfully", status: 1, data: getdata, });
            }
            return res.status(200).json({ success: true, status: 1, message: "Data found successfully", data: authData });
        }
    } catch (error) {
        return res.status(404).json({ success: false, status: 0, message: "Please Provide valide token" });
    }
}