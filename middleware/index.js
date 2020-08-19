const multer = require("multer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require('../models/user');
const Admin = require('../models/admin');
const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(15);
    const hash = await bcrypt.hash(password, salt);
    return { salt, hash };
  } catch (error) {
    return error;
  }
};

const comparePassword = async (password, hash) => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    return error;
  }
};


const authUser = async (req, res, next) => {
  if (!req.header("Authorization"))
    return res.status(401).json({
      error: "UnAuthorized",
    });

  const token = req.header("Authorization").split(" ")[1];
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    if (data) {
      const user = await User.find({
        _id: data._id,
        email: data.email,
      });
      if (!user && user.length <= 1)
        return res.status(401).json({
          message: "Auth failed",
        });
      req.user = {
        userId: user[0]._id,
        userEmail: user[0].email,
      };
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      error: "Unauthorized",
    });
  }
};

const authAdmin = async (req, res, next) => {
  if (!req.header("Authorization"))
    return res.status(401).json({
      error: "UnAuthorized",
    });

  const token = req.header("Authorization").split(" ")[1];
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    if (data) {
      const admin = await Admin.find({
        _id: data._id,
        email: data.email,
      });
      if (!admin && admin.length <= 1)
        return res.status(401).json({
          message: "Auth failed",
        });
      req.user = {
        userId: admin[0]._id,
        userEmail: admin[0].email,
      };
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      error: "Unauthorized",
    });
  }
};


// multer storage engine
const Storage = multer.diskStorage({
    destination: function (req, res, cb) {
      cb(null, "./uploads/");
    },
  });
  

  //multer middleware
  const ImgUploader = multer({
    storage: Storage,
  }).single("picture");
  
  
  module.exports = {
      ImgUploader,
      authUser,
      authAdmin,
      comparePassword,
      hashPassword,
  }