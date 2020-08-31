const Charity = require('../models/charity');

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
    }).populate("createdBy");
    if (!charity)
      return res.send({
        success: false,
        message: "Charity Not Found",
      });
    const isAuthor = charity.createdby.equals(req.user.userId);
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
      title: req.body.fundraiserTitle,
     Picture: req.body.uploadImage,
     VideoAppeal: req.body.VideoAppeal,
     PatientsAge: req.body.PatientsAge,
     GoalAmount: req.body.GoalAmount,
     PatientsName: req.body.PatientsName,
     PatientsGender: req.body.PatientGender,
     MedicalCon: req.body.MedicalCondition,
     Story: req.body.Story,
       
    };
    const charity = new Charity(charityDetails, (err) => {
      if (err)
        return res.send({
          success: false,
          message: "Request not found",
          responsedata: err,
        });
    });
    console.log(JSON.stringify(charityDetails, null, 4));
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
      .where("createdBy")
      .equals(req.user.userId);
    if (!charity || !req.body)
      return res.send({
        success: false,
        message: "Unauthorized",
      });
      
      charity.Picture= req.body.Picture;
     charity.VideoAppeal= req.body.VideoAppeal;
     charity.PatientsAge= req.body.PatientsAge;
     charity.GoalAmount= req.body.GoalAmount;
     charity.PatientsName= req.body.PatientsName;
     charity.PatientsGender= req.body.PatientsGender;
     charity.MedicalCon= req.body.MedicalCon;
     charity.Story= req.body.Story;
     charity.CustSrtLink=req.body.CustSrtLink;
     charity.docs.MedEsti.fileUrl=req.body.MedEsti;
     charity.docs.LetFrmPatie.fileUrl=req.body.LetFrmPatie;
     charity.docs.MedRep.fileUrl=req.body.MedRep;


//     const updatedBusiness = await business.save();

    const updatedCharity= Charity.findOneAndUpdate({_id:req.params.charityId},{project})
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


module.exports = {
     deleteCharityById,
     updateCharity,
     deleteAllCharity,
     createCharity,
     getCharityByUser,
     getCharityById,
     getAllCharity,
     getCharity
}