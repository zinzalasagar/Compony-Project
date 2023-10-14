// routes.post('/postData', varifytoken, async (req, res) => {
//     const { postText,userId  } = req.body;
//     if (!req.body.postText) {
//         res.status(401).send({ success: false, message: "postText can not be empty!" });
//         return;
//     }
//     try {

//         const authData = await jwt.verify(req.token, SECRET_KEY);
//         console.log("data====", authData);
//         const postData = await Post.create({
//             postText: postText,
//             userId: authData.id
//         });
//         if (!postData) {
//             return res.status(404).json({ success: false, message: "Data not inserted", status: 0 })
//         }
//         if (postData) {
//             return res.status(200).json({ success: true, message: "Data Inserted", data: postData, status: 1 })
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(404).json({ success: "false", message: " invalid  token ", status: 0 })
//     }
// })

// async function varifytoken(req, res, next) {
//     try {
//         const bearerHeader = await req.headers['authorization'];
//         if (typeof bearerHeader !== 'undefined') {
//             const bearer = bearerHeader.split(" ");
//             const token = bearer[1];
//             req.token = token;
//             next();
//         }
//         else {
//             // console.log(error);
//             res.status(400).json({ success: "false", message: "Token is not valid", status: 0 });
//         }
//     } catch (error) {
//         res.status(400).json({ success: "false", message: "Token is not valid", status: 0 });
//     }
// }



// let storage = multer.diskStorage({
//     destination : function(req,file,cd){
//         cd(null,path.join(__dirname+'-'+AVATAR_PATH));
//     },
//     filename : function(req,file,cd){
//         cd(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname));
//     }
// })

// userschema.static.uploaded = multer({storage : storage}).single('avatar');
// userschema.static.avatapath = AVATAR_PATH;



//post.findOne({_id: userId}).then(function(user){
//     // Do something with the user
//     return res.send(200);
// });

const jwt = require('jsonwebtoken');
const SECRET_KEY = "node";

// const Post = require('../modules/postextModules');

const varifytoken = async (req, res, next) => {
    try {
        const bearerHeader = await req.headers['authorization'];
        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(" ");
            const token = bearer[1];
            req.token = token;
            next();
        }
        else {
            console.log(error);
            res.status(400).json({ success: "false", message: "Token is not valid", status: 0 });
        }
    } catch (error) {
        res.status(400).json({ success: "false", message: "Token Required", status: 0 });
    }
}
// const varifyToken = async (req, res, next) => {
//     try {
//         const bearerHeader = await req.headers['authorization'];
//         if (typeof bearerHeader !== 'undefined') {
//             const bearer = bearerHeader.split(" ");
//             const token = bearer[1];
//             req.token = token;
//             const verified = jwt.verify(token, SECRET_KEY)
//             if (verified) {
//                 res.status(400).json({ success: true, message: "get ", status: 1,data : verified });
//                 next();
//             }
//             else {
//                 res.status(400).json({ success: false, message: "Not valid token", status: 0 });
//             }
//         }
//         else {
//             // console.log(error);
//             res.status(400).json({ success: "false", message: "Token is not valid", status: 0 });
//         }
//     } catch (error) {
//         res.status(400).json({ success: "false", message: "Token is not valid", status: 0 });
//     }
// }
module.exports = { varifytoken }
