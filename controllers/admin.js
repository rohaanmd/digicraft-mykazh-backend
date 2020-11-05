const Admin = require('../models/admin');
const User = require("../models/user");
const fs = require("fs");
const Joi = require("@hapi/joi"); // Package for validating Admin data

const {hashPassword , comparePassword} = require('../middleware/index');


const adminSchema = Joi.object({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    password: Joi.string(),
  });

const getAllAdmin = async (req, res, next) => {
    res.json({
        message: 'this is home route of admin'
    })
}

const LogOut = async (req, res, next) => {
        res.send({
            success: true,
            message: "admin LoggedOut successfully",
        });  
} 

const getCurrentAdmin = async (req, res,next) =>{
  try {
    const admin = await Admin.findOne({
      _id: req.user.userId
    });
    if(admin)
    return res.send({
      success: true,
      message: "user Found successfully",
      responseData: admin ,
    });
  return res.send({
    success: false,
    message: "admin Not Found",
  });
  } catch (error) {
    return res.send({
      success: false,
      message: "request cant be processed",
      responseData: error
    });
  }
}

const Login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
  
    const admin = await Admin.findOne({
        email: email,
      });
    
      if (!admin)
        return res.send({
          success: false,
          message: "Unauthorized",
        });
        const isSame = await comparePassword(password, admin.password);

        
  if (isSame) {
    const token = await admin.generateAuthToken();
    return res.send({
      success: true,
      message: "admin logged in successfully",
      responseData: {
        details: {
          adminId: admin._id,
          email: admin.email,
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
      const response = await adminSchema.validate(validationData);
      if (response.error) {
        return res.send({
          success: false,
          message: response.error.details[0].message,
        });
      }
      const checkadmin = await Admin.findOne({
        email: response.value.email,
      });
      if (checkadmin) {
        await fs.unlinkSync(req.file.path);
        return res.send({
          success: false,
          message: "admin already exist",
        });
      }
      const { salt, hash } = await hashPassword(response.value.password);
  response.value.password = hash;
 
  console.log({ ...req.body, ...response.value });
  const admin = new Admin({
    ...req.body,
    ...response.value,
  });
    
                    const token = await  admin.generateAuthToken(); 
                    await admin.save();
                    return res.send({
                        success: true,
                        message: "admin created successfully",
                        responseData: {
                            admin,
                            token
                        },
                    });
              
};



const getUsers = async (req, res) => {
    const users = await User.find({});
    return res.send({
      success: true,
      message: "Users Listed",
      responseData: {
        users,
      },
    });
  };

  const getUndefinedUser =  async (req, res) => {
    const users = await User.find({isApproved: "undefined"});
    return res.send({
      success: true,
      message: "Undefined Users Listed",
      responseData: {
        users,
      },
    });
  };

  const getApprovedUser =  async (req, res) => {
    const users = await User.find({isApproved: "approved"});
    return res.send({
      success: true,
      message: "approved Users Listed",
      responseData: {
        users,
      },
    });
  };

  const getDisapprovedUser =  async (req, res) => {
    const users = await User.find({isApproved: "disapproved"});
    return res.send({
      success: true,
      message: "disappr Users Listed",
      responseData: {
        users,
      },
    });
  };


const Approved =  async (req, res, next) =>{

try{
  User.findByIdAndUpdate(req.params.userId, { isApproved: 'approved' }, {
    new: true
  },function (err, docs) { 
    if (err){ 
        console.log(err) ;
        return res.send({
                  success: false,
                  message: "approve not successful",
                  responseData: err,
                });
    } 
    else{ 
        console.log("Updated User : ", docs); 
        
        return res.send({
              success: true,
              message: "User approve Successful",
              responseData: docs,
            });
    } 
}); 
} catch (err){
   
  return res.send({
    success: false,
    message: "Something went wrong",
    responseData:err,
  });

}   
}


const Disapproved =  async (req, res, next) =>{

  try{
    User.findByIdAndUpdate(req.params.userId, { isApproved: 'disapproved' }, function (err, docs) { 
      if (err){ 
          console.log(err) ;
          return res.send({
                    success: false,
                    message: "disapprove not successful",
                    responseData: err,
                  });
      } 
      else{ 
          console.log("Updated User : ", docs); 
          
          return res.send({
                success: true,
                message: "User disapprove Successful",
                responseData: docs,
              });
      } 
  }); 
  } catch (err){
     
    return res.send({
      success: false,
      message: "Something went wrong",
      responseData:err,
    });
  
  }   
  }
  

module.exports = {
    SignUp,
    Login,
    getAllAdmin,
    LogOut,
    getUsers,
    Approved,
    Disapproved,
    getApprovedUser,
    getDisapprovedUser,
    getUndefinedUser,
    getCurrentAdmin,
}