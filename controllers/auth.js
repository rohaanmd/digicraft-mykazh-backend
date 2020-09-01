const User = require('../models/user');
const fs = require("fs");
const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi"); // Package for validating user data
const { hashPassword, comparePassword } = require('../middleware/index');

const userSchema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: Joi.string(),
});

const getAllUser = async (req, res, next) => {
  console.log("api call : get all users")
  res.json({
    message: 'this is home route of User'
  })
}

const LogOut = async (req, res, next) => {
  res.send({
    success: true,
    message: "user LoggedOut successfully",
  });
}

const Login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({
    email: email,
  });

  if (!user)
    return res.send({
      success: false,
      message: "Unauthorized",
    });
  const isSame = await comparePassword(req.body.password, user.password);


  if (isSame) {
    const token = await user.generateAuthToken();
    return res.send({
      success: true,
      message: "User logged in successfully",
      responsedata: {
        details: {
          userId: user._id,
          email: user.email,
          name:user.firstname
        },
        token,
      },
    });
  } else {
    return res.send({
      success: false,
      message: "ID or PASSWORD is wrong",
    });
  }

}


const SignUp = async (req, res, next) => {
  validationData = {
    password: req.body.password,
    email: req.body.email,
  };
  const response = await userSchema.validate(validationData);
  if (response.error) {
    return res.send({
      success: false,
      message: response.error.details[0].message,
    });
  }
  const checkUser = await User.findOne({
    email: response.value.email,
  });
  if (checkUser) {
    await fs.unlinkSync(req.file.path);
    return res.send({
      success: false,
      message: "User already exist",
    });
  }
  const { salt, hash } = await hashPassword(response.value.password);
  response.value.password = hash;

  console.log({ ...req.body, ...response.value });
  const user = new User({
    ...req.body,
    ...response.value,
  });



  // if(req.file.path)
  // {
  //     const imgResponse = cloudinary.uploader.upload(req.file.path);
  //     user.picture=imgResponse.secure_url;
  //     fs.unlinkSync(req.file.path);
  // }


  const token = await user.generateAuthToken();
  await user.save();
  return res.send({
    success: true,
    message: "user created successfully",
    responseData: {
      user,
      token
    },
  });


};
module.exports = {
  SignUp,
  Login,
  getAllUser,
  LogOut,
}