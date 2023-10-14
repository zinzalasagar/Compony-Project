
const { check, validationResult }
    = require('express-validator');


const user = require('../../modules/userModules');


module.exports.insertData = async (req, res) => {
    const { name, email, password,avatar } = req.body;
   
    try {
        if (!req.body.name) {
            res.status(400).json({ success: false, message: "Name can not be empty!", status: 0 });
            return;
        } else if (!req.body.email) {
            res.status(400).json({ success: false, message: "email can not be empty!", status: 0 });
            return;
        } else if (!req.body.password) {
            res.status(400).json({ success: false, message: "password can not be empty!", status: 0 });
            return;
        }
        const fData = await user.findOne({ email: req.body.email })
        if (fData)
            return res.status(404).json({success :false , message: "email already exist", status: 0 });

        const data = await user.create({
            name: name,
            email: email,
            password: password,
            
        });
        if (!data) {
            return res.status(404).json({success :false , message: "Data not inserted", status: 0 });
        }
        if (data) {
            return res.status(200).json({ success :true ,message: "Data Inserted", data: data, status: 1 });
        }
    } catch (error) {
        return res.status(404).json({success :false , message: "Data not inserted", status: 0 });
    }
}

module.exports.viewData = async (req, res) => {
    try {
        const view = await user.find({});
        if (!view) {
            return res.status(404).json({ success :false ,message: "Data not found", status: 0 });
        }
        if (view) {
            return res.status(200).json({success :true , message: "Data found successfully", data: view, status: 1 });
        }
    } catch (error) {
        return res.status(404).json({ success :false ,message: "Data not found", status: 0 });
    }
}

module.exports.deleteData = async (req, res) => {
    try {
        var id = (req.params.id);

        const deleteData = await user.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({success :false , message: "Data not Deleted", status: 0 });
        }
        if (deleteData) {
            return res.status(200).json({success :true , message: "Data Detele successfully", status: 1 });
        }
    } catch (error) {
        return res.status(404).json({ success :false ,message: "Data not Deleted", status: 0 });
    }
}


module.exports.updateData = async (req, res) => {
    try {
        var id = (req.params.id);

        const UpdateData = await user.findByIdAndUpdate(id, req.body);
        if (!UpdateData) {
            return res.status(404).json({success :false , message: "Data not updated", status: 0 });
        }
        if (UpdateData) {
            return res.status(200).json({ success :true ,message: "Data updated successfully", status: 1 });
        }
    } catch (error) {
        return res.status(404).json({ success :false ,message: "Data not updated", status: 0 });
    }
}
