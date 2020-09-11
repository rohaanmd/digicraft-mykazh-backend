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
      _id: req.params.charityId,
    })
    if (!charity)
      return res.send({
        success: false,
        message: "Charity Not Found",
      });
      console.log(req.user.userId + charity.createdBy)
    const isAuthor = charity.createdBy.equals(req.user.userId);
    return res.send({
      success: true,
      message: "Charity Found successfully",
      responseData: { charity, isAuthor },
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
          responsedata: err,
        });
    });
    // console.log(req.user.userId)
    // console.log(JSON.stringify(charityDetails, null, 4));
    charity.createdBy = req.user.userId;
    charity.save();
    return res.send({
      success: true,
      message: "charity successfully created",
      responsedata: {
          charity,
      },
    })
  }
  catch (err) {
    return res.send({
      success: false,
      message: "something wrong happend",
      responsedata: err,
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
    const charity = await Charity.findOne({
      _id: req.params.charityId,
    })
      // .where("createdBy")
      // .equals(req.user.userId);
    if (!charity || !req.body)
      return res.send({
        success: false,
        message: "Unauthorized",
      });
    charity.Picture= req.body.Picture||charity.Picture,
     charity.VideoAppeal= req.body.VideoAppeal||charity.VideoAppeal,
     charity.PatientsAge= req.body.PatientsAge||charity.PatientsAge,
     charity.GoalAmount= req.body.GoalAmount||charity.GoalAmount,
     charity.PatientsName= req.body.PatientsName||charity.PatientsName,
     charity.PatientsGender= req.body.PatientsGender||charity.PatientsGender,
     charity.MedicalCon= req.body.MedicalCon||charity.MedicalCon,
     charity.Story= req.body.Story||charity.Story,
     charity.CustSrtLink=req.body.CustSrtLink||charity.CustSrtLink,
     charity.docs=req.body.docs||charity.docs,
     charity.cardImage=req.body.CardImage||charity.CardImage,
          

//     const updatedcharity = await charity.save();
      console.log(charity)
    await Charity.findOneAndUpdate({_id:req.params.charityId},charity)
     return res.send({
          success: true,
          message: "charity Updated Successfull",
          responseData: charity,
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
  const charity = await Charity.findByIdAndDelete(req.params.charityId)
    .where("createdBy")
    .equals(req.user.userId);
  console.log(charity);
  if (charity)
    return res.send({
      success: true,
      message: "charity Delete Successfully",
      responsedata: charity,
    });
  else
    return res.send({
      success: false,
      message: "charity not found",
    });
};
const ApproveCharity = async (req, res, next) => {
  try {
    const charity = await Charity.findById(req.params.charityId)  
        console.log(charity);
        if (!charity || !req.body){
            return res.send({
              success: false,
              message: "Buisness not found",
            });}
charity.verification="approved";
await charity.save();
return res.send({
  success: true,
  message: "approve Successfull",

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

const DisapproveCharity = async (req, res, next) => {
  try {
    const charity = await Charity.findById(req.params.charityId)  
        console.log(charity);
        if (!charity || !req.body){
            return res.send({
              success: false,
              message: "Buisness not found",
            });}
charity.verification="disapproved";
await charity.save();
return res.send({
  success: true,
  message: "disapprove Successfull",

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


const getApproved =  async (req, res) => {
  const charity = await Charity.find({verification: "approved"});
  return res.send({
    success: true,
    message: "Approved charity Listed",
    responsedata: {
      charity,
    },
  });
};
const getDisapproved =  async (req, res) => {
  const charity = await Charity.find({verification: "disapproved"});
  return res.send({
    success: true,
    message: "Disapproved charity Listed",
    responsedata: {
      charity,
    },
  });
};
const getNULL =  async (req, res) => {
  const charity = await Charity.find({verification: "NULL"});
  return res.send({
    success: true,
    message: "NULL charity Listed",
    responsedata: {
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