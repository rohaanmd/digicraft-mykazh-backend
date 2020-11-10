const Charity = require('../models/medical');

const getCharity = (req, res, next) => {
  console.log("GET Request")
  res.json({
    message: 'this is home route of Charity'
  })
};

const getAllCharity = async (req, res, next) => {
  const charity = await Charity.find({})
    .populate("createdBy")
  if (!charity)
    return res.send({
      success: false,
      message: "Charity not found",
    });

  return res.send({
    success: true,
    message: " Charity Found successfull",
    responseData: charity,
  });
};


const getCharityById = async (req, res, next) => {
  try {
    const charity = await Charity.findOne({
      _id: req.params.medicalId,
    }).populate("createdBy")
    if (!charity)
      return res.send({
        success: false,
        message: "Charity Not Found",
      });
    return res.send({
      success: true,
      message: "Charity Found successfully",
      responseData: { charity},
    });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: "something wrong happened",
      responseData: { error },
    });
  }
};

const getCharityByUser = async (req, res, next) => {
  console.log(req.user);
  const charity = await Charity.find()
    .where("createdBy")
    .equals(req.user.userId)
    .populate("createdBy")
    .exec();
  if (charity)
    return res.send({
      success: true,
      message: "charity Found successfully",
      responseData: { charity },
    });
  return res.send({
    success: false,
    message: "charity Not Found",
  });
};


const createCharity = (req, res, next) => {
  try {
    const charityDetails = {
     Picture: req.body.Picture,
     VideoAppeal: req.body.VideoAppeal,
     PatientsAge: req.body.PatientsAge,
     GoalAmount: req.body.GoalAmount,
     PatientsName: req.body.PatientsName,
     PatientsGender: req.body.PatientsGender,
     MedicalCon: req.body.MedicalCon,
     Story: req.body.Story,
       
    };
    console.log(charityDetails)
    const charity = new Charity(charityDetails, (err) => {
      if (err)
        return res.send({
          success: false,
          message: "Request not found",
          responseData: err,
        });
    });
  
    charity.createdBy = req.user.userId;
    charity.save();
    return res.send({
      success: true,
      message: "charity successfully created",
      responseData: {
          charity,
      },
    });
  }
  catch (err) {
    return res.send({
      success: false,
      message: "something wrong happend",
      responseData: err,
    });
  }
}

// DEV purpose
const deleteAllCharity = async (req, res, next) => {
  try {
    await Charity.deleteMany({});
    return res.send({
      success: true,
      message: "Charity deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: "Deletion Failed",
      responseData: error,
    });
  }
};


const updateCharity = async (req, res, next) => {
  try {
    const charity = await Charity.findById(req.params.medicalId)
    const userId = req.user.userId;
    const createdBy = charity.createdBy;
    if(createdBy == userId)
    return res.send({
      success: false,
      message: "Unauthorized",
    });
    let newCharity= req.body;
    
   const updatedCharity =  await Charity.findOneAndUpdate({_id:req.params.medicalId},newCharity,{new: true})
      return res.send({
          success: true,
          message: "charity Updated Successfull",
          responseData: updatedCharity,
        });
     
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: "something wrong happened",
      responseData: error,
    });
  }
};

const deleteCharityById = async (req, res, next) => {
  const charity = await Charity.findById(req.params.medicalId)
  const userId = req.user.userId;
  const createdBy = charity.createdBy;
  if(createdBy == userId)
  return res.send({
    success: false,
    message: "Unauthorized",
  });
  await Charity.findByIdAndDelete(req.params.medicalId)

  console.log(charity);
  if (charity)
    return res.send({
      success: true,
      message: "charity Delete Successfully",
      responseData: charity,
    });
  else
    return res.send({
      success: false,
      message: "charity not found",
    });
};
const ApproveCharity = async (req, res, next) => {
  try{
    Charity.findByIdAndUpdate(req.params.medicalId, { verification: 'approved' }, {
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
};

const DisapproveCharity = async (req, res, next) => {
  
   try{
    Charity.findByIdAndUpdate(req.params.medicalId, { verification: 'disapproved' }, {
      new: true
    }, function (err, docs) { 
      if (err){ 
          console.log(err) ;
          return res.send({
                    success: false,
                    message: "disapprove not successful",
                    responseData: err,
                  });
      } 
      else{ 
         
          
          return res.send({
                success: true,
                message: "Charity disapprove Successful",
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
};


const getApproved =  async (req, res) => {
  const charity = await Charity.find({verification: "approved"});
  return res.send({
    success: true,
    message: "Approved charity Listed",
    responseData: {
      charity,
    },
  });
};

const getDisapproved =  async (req, res) => {
  const charity = await Charity.find({verification: "disapproved"});
  return res.send({
    success: true,
    message: "Disapproved charity Listed",
    responseData: {
      charity,
    },
  });
};
const getNULL =  async (req, res) => {
  const charity = await Charity.find({verification: "NULL"});
  return res.send({
    success: true,
    message: "NULL charity Listed",
    responseData: {
      charity,
    },
  });
};


module.exports = {
     deleteCharityById,
     updateCharity,
     deleteAllCharity,
     createCharity,
     getCharityByUser,
     getCharityById,
     getAllCharity,
     getCharity,
     ApproveCharity,
     DisapproveCharity,
     getNULL,
     getDisapproved,
     getApproved
}