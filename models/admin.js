const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    firstname: { type:String,
    required: true
    },
    lastname: { type:String,
        },
    email: { type:String,
            required:true,
    },
    password: {
        type: String,
        required:true,
            
    },
    number: { 
        type: Number,   
},
picture: String,
},{ timestamps: true });


AdminSchema.methods.generateAuthToken = async function () {
    const admin = this;
    const payload = {
      _id: admin._id,
      email: admin.email,
    };
                                                    
    const accessToken = jwt.sign(
      {
        _id: admin._id,
        email: admin.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_SECRET_EXPIRY,
      }
    );

    const refreshToken = jwt.sign(
      {
        _id: admin._id,
        email: admin.email,
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
  


module.exports = mongoose.model("admin",AdminSchema)