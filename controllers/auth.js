const User = require('../models/user');
const bcrypt = require('bcryptjs');
const fs = require("fs");

const getAllUser = async (req, res, next) => {
    console.log("api call : get all users")
    res.json({
        message: 'this is home route of User'
    })
}

const Login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({email: email})
    .then(user =>{
        if (!user)
        return res.send({
            success: false,
            message: "Unauthorized",
        });
        bcrypt.compare(password,user.password).then(doMatch => {
            if(doMatch){
                req.session.isLoggedIn = true;
                req.session.user = user;
                console.log(req.session);
                return res.send({
                    success: true,
                    message: "user Logged IN successfully",
                    responseData: {
                        user,
                    },
                });
            }


            return res.send({
                success: false,
                message: "Password is Wrong",
                responseData: {user}
            })

        }).catch(err=>{
            console.log(err);
        })
    })
  

}


const SignUp = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: req.body.email })
        .then(userDoc => {
            if (userDoc) {
                return res.send({
                    success: false,
                    message: "User already exist!!",
                });
            }
            return bcrypt
                .hash(password, 12)
                .then(hashedPassword => {
                    const user = User(
                        {
                            email: email,
                            password: hashedPassword,
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            phone: req.body.phone,
                           
                        },
                        (err) => {
                            if (err)
                                return res.send({
                                    success: false,
                                    message: err.message,
                                });
                        },
                    )
                    // if(req.file.path)
                    // {
                    //     const imgResponse = cloudinary.uploader.upload(req.file.path);
                    //     user.picture=imgResponse.secure_url;
                    //     fs.unlinkSync(req.file.path);
                    // }
                    user.save();
                    return res.send({
                        success: true,
                        message: "user created successfully",
                        responseData: {
                            user,
                        },
                    });
                })
        })
        .catch(error => {
            console.log(error);
            return res.send({
                success: false,
                message: error.message,
            });
        })
};
module.exports = {
    SignUp,
    Login,
    getAllUser
}