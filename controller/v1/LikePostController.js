const express = require('express');

const Post = require('../../modules/postextModules');

const jwt = require('jsonwebtoken');

const SECRET_KEY = "node";

const LikePost = require('../../modules/LikePostModules');

// var count = 0;
// function countFunction() {
//     var newcount = count += 1;
//     count = newcount;
//     console.log(count);
// }

module.exports.PostLike = async (req, res) => {
    const { isLike, postId, userId } = req.body;

    if (!req.body.postId) {
        res.status(401).send({ success: false, status: 0, message: "postId can not be empty!" });
        return;
    }
    try {
        const authData = await jwt.verify(req.token, SECRET_KEY);

        let like = await LikePost.findOne({
            postId: postId,
            userId: authData.id,

        })
        if (like) {
            const updateData = await LikePost.findByIdAndUpdate(like._id, { isLike: !like.isLike });
            if (updateData) {
                return res.status(200).json({ success: true, message: like.isLike ? "Dislike post" : "Like post", status: 1 });

            } else {
                return res.status(404).json({ success: false, message: "Data not updated", status: 0 });
            }
        }
        if (!like) {
            const LikeData = await LikePost.create({
                isLike: true,
                userId: authData.id,
                postId: postId,
                // postText: postText
            });
            if (!LikeData) {
                return res.status(404).json({ success: false, status: 0, message: "Data not inserted" });
            }
            if (LikeData) {

                return res.status(200).json({ success: true, status: 1, message: "Data Inserted", data: LikeData });
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(404).json({ success: "false", status: 0, message: " invalid  token " });
    }
}

module.exports.getLikePost = async (req, res) => {

    try {
        const authData = await jwt.verify(req.token, SECRET_KEY);
        // console.log(authData);
        if (authData) {
            const getdata = await LikePost.aggregate([  
                { $match: { isLike: true } },
                // {$group:{couny:{$count:{}}}},
                { $count: "totals" },
                // {$project:{_id:0,userId:0,postId:0,__v:0}},
                // { $count: "totals" },
                // {$out:'info'}
                // {$limit : 3},
                // {$sort :{isLike:1}}
                // { $group:{_id:{ count: { $sum: 1 } }}},
                // { $project: { _id: 0 } }
                // {$sort : {numeber : 1}},
                // { $group:{_id:null, count: {$sum:{$size:{$ifNull:["$postId",[]]}}} } }
            ])

            if (!getdata) {
                return res.status(404).json({ success: false, message: "Data not found", status: 0, });
            }
            if (getdata) {
                return res.status(200).json({ success: true, message: "Data found Successfully", status: 1, data: getdata});
            }
            return res.status(200).json({ success: true, status: 1, message: "Data found successfully", data: authData });
        }
    } catch (error) {
        return res.status(404).json({ success: false, status: 0, message: "Please Provide valide token" });
    }
}