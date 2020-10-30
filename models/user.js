const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,

  },
  number: {
    type: Number,
  },
  picture: String,
  isApproved: {
    type: String,
    required: true,
    enum: ["undefined", "approved", "disapproved"],
    default: "undefined",

  },
}, { timestamps: true });


UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const payload = {
    _id: user._id,
    email: user.email,
    isApproved: user.isApproved,
  };

  const accessToken = jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_SECRET_EXPIRY,
    }
  );

  const refreshToken = jwt.sign(
    {
      _id: user._id,
      email: user.email,
      isApproved: user.isApproved,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: process.env.JWT_REFRESH_EXPIRY,
    }
  );
  return {

    accessToken,
    refreshToken,

  };
};



module.exports = mongoose.model("User", UserSchema)