const { valid } = require('joi');
const jwt = require('jsonwebtoken');

const postText = require('../modules/signupModules');

const SECRET_KEY = "node";
const Post = require('../modules/postextModules');

const auth = async (req, res, next) => {
    try {
        let token = req.headers['authorization'];
        if (token) {
            const verified = jwt.verify(token, SECRET_KEY);
            token = token.split(' ')[1];
            req.token = token;
            if (verified) {
                console.log(verified);
                console.log(verified.id);
                next();
            }
            else {
                res.status(400).json({ success: false, message: "Not valid token", status: 0 });
            }

        }

        else {
            res.status(400).json({ success: false, message: "Token require", status: 0 });

        }

    } catch (error) {
        res.status(400).json({ success: false, message: "Token require", status: 0 });
    }
}

module.exports = auth;