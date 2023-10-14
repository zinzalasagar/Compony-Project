const express = require('express');

const signup = require('../../modules/signupModules');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const { Result } = require('express-validator');
const { escapeXML } = require('ejs');

const SECRET_KEY = "node";

module.exports.signupData = async (req, res) => {

    const { username, email, password } = req.body;
    if (!req.body.username) {
        res.status(400).json({ success: false, status: 0, message: "Name can not be empty!" });
        return;
    } else if (!req.body.email) {
        res.status(400).json({ success: false, status: 0, message: "email can not be empty!" });
        return;
    } else if (!req.body.password) {
        res.status(400).json({ success: false, status: 0, message: "password can not be empty!" });
        return;
    }
    try {
        const fData = await signup.findOne({ email: email });
        if (fData) {
            return res.status(400).json({ success: false, status: 0, message: "email already exist" });
        }

        plaintext = password.toString();
        const hashPassword = await bcrypt.hash(plaintext, 10);

        const data = await signup.create({
            username: username,
            email: email,
            password: hashPassword
        });
        const token = jwt.sign({ email: data.email, id: data._id }, SECRET_KEY, { expiresIn: 10000 });
        return res.status(201).json({ success: true, status: 1, data: data, token: token });

    } catch (error) {
        console.log(error);
        return res.status(404).json({ success: false, status: 0, message: "something wrong " });
    }
}

module.exports.signinData = async (req, res) => {
    const { id, email, password } = req.body;
    if (!req.body.email) {
        res.status(400).send({ success: false, status: 0, message: "email can not be empty!" });
        return;
    } else if (!req.body.password) {
        res.status(400).send({ success: false, status: 0, message: "password can not be empty!" });
        return;
    }
    try {
        const fData = await signup.findOne({ email: email })
        if (!fData) {
            return res.status(404).json({ success: false, status: 0, message: "User not found" });
        }

        plaintext = password.toString();
        const matchpassword = await bcrypt.compare(plaintext, fData.password);

        if (!matchpassword) {
            return res.status(400).json({ success: false, status: 0, message: "Invalid Credentials" });
        }

        const token = jwt.sign({ email: fData.email, id: fData._id }, SECRET_KEY, { expiresIn: 10000 });
        return res.status(201).json({ success: true, data: fData, token: token, status: 1 });
        

    } catch (error) {
        console.log(error);
        return res.status(404).json({ success: false, status: 0, message: "something wrong " })
    }
}