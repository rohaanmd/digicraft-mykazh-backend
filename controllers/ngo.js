const Ngo = require('../models/ngo');

const getNgo = (req, res, next) => {
  console.log("GET Request")
  res.json({
    message: 'this is home route of ngo'
  })
};

const getAllNgo = async (req, res, next) => {
  const ngo = await Ngo.find({})
    .populate("createdBy")
  if (!ngo)
    return res.send({
      success: false,
      message: "ngo not found",
    });

  return res.send({
    success: true,
    message: " ngo Found successfull",
    responseData: ngo,
  });
};


const getNgoById = async (req, res, next) => {
  try {
    const ngo = await Ngo.findOne({
      _id: req.params.ngoId,
    })
    if (!ngo)
      return res.send({
        success: false,
        message: "ngo Not Found",
      });
  
    return res.send({
      success: true,
      message: "ngo Found successfully",
      responseData: { ngo},
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

const getNgoByUser = async (req, res, next) => {
  console.log(req.user);
  const ngo = await Ngo.find()
    .where("createdBy")
    .equals(req.user.userId)
    .populate("createdBy")
    .exec();
  if (ngo)
    return res.send({
      success: true,
      message: "ngo Found successfully",
      responseData: { ngo },
    });
  return res.send({
    success: false,
    message: "ngo Not Found",
  });
};


const createNgo = async (req, res, next) => {
  try {
    const ngoDetails = {
        GoalAmount:req.body.GoalAmount,
        purpose:req.body.purpose,
        ngoName:req.body.ngoName,
        cause:req.body.cause,
    };
    const ngo = new Ngo(ngoDetails, (err) => {
      if (err)
        return res.send({
          success: false,
          message: "Request not found",
          responsedata: err,
        });
    });
    ngo.createdBy = req.user.userId;
    // console.log(JSON.stringify(ngoDetails, null, 4));
    await ngo.save();
    console.log(JSON.stringify(ngoDetails, null, 4));
    return res.send({
      success: true,
      message: "company successfully created",
      responsedata: {
        ngo,
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
const deleteAllNgo = async (req, res, next) => {
  try {
    await ngo.deleteMany({});
    return res.send({
      success: true,
      message: "ngo deleted successfully",
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


const updateNgo = async (req, res, next) => {
  try {
    const ngo = await Ngo.findById(req.params.ngoId)
    const userId = req.user.userId;
    const createdBy = ngo.createdBy;

    if(JSON.stringify(userId)==JSON.stringify(createdBy))
      // if(ngo.createdBy = req.user.userId)
      {
        if (!ngo || !req.body){
            return res.send({
              success: false,
              message: "Buisness not found",
            });}
          

            const ngoDetails = {
              GoalAmount:req.body.GoalAmount||ngo.GoalAmount,
              purpose:req.body.purpose||ngo.purpose,
              ngoName:req.body.ngoName||ngo.ngoName,
              cause:req.body.cause||ngo.cause,
                mediaLink:req.body.mediaLink||ngo.mediaLink,
                location:req.body.location||ngo.location,
                 story: req.body.story||ngo.story,
                 cardImage:req.body.cardImage || ngo.cardImage,
                 ngoCreater:req.body.ngoCreater||ngo.ngoCreater,
                 creatorbio:req.body.creatorbio||ngo.creatorbio,
             
              };

           const Getngo = await Ngo.findOneAndUpdate({_id:req.params.ngoId},ngoDetails)
              
            return res.send({
              success: true,
              message: "ngo Updated Successfull",
              responseData: Getngo,            
            });

      }
      else{
        return res.send({
              success: false,
              message: "Unauthorized",
            });
      }

  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: "something wrong happened",
      responseData: error,
    });
  }
};

const deleteNgoById = async (req, res, next) => {
  const ngo = await Ngo.findByIdAndDelete(req.params.ngoId)
    .where("createdBy")
    .equals(req.user.userId);
  console.log(ngo);
  if (ngo)
    return res.send({
      success: true,
      message: "ngo Delete Successfully",
      responsedata: ngo,
    });
  else
    return res.send({
      success: false,
      message: "ngo not found",
    });
};
const ApproveNgo = async (req, res, next) => {
  try {
    const ngo = await Ngo.findById(req.params.ngoId)  
        console.log(ngo);
        if (!ngo || !req.body){
            return res.send({
              success: false,
              message: "Buisness not found",
            });}
ngo.verification="approved";
await ngo.save();
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

const DisapproveNgo = async (req, res, next) => {
  try {
    const ngo = await Ngo.findById(req.params.ngoId)  
        console.log(ngo);
        if (!ngo || !req.body){
            return res.send({
              success: false,
              message: "Buisness not found",
            });}
ngo.verification="disapproved";
await ngo.save();
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
  const ngo = await Ngo.find({verification: "approved"});
  return res.send({
    success: true,
    message: "Approved ngo Listed",
    responsedata: {
      ngo,
    },
  });
};
const getDisapproved =  async (req, res) => {
  const ngo = await Ngo.find({verification: "disapproved"});
  return res.send({
    success: true,
    message: "Disapproved ngo Listed",
    responsedata: {
      ngo,
    },
  });
};
const getNULL =  async (req, res) => {
  const ngo = await Ngo.find({verification: "NULL"});
  return res.send({
    success: true,
    message: "NULL ngo Listed",
    responsedata: {
      ngo,
    },
  });
};


module.exports = {
  getNgo,
  createNgo,
  updateNgo,
  deleteNgoById,
  deleteAllNgo,
  getNgoByUser,
  getNgoById,
  getAllNgo,
  ApproveNgo,
  DisapproveNgo,
  getNULL,
  getDisapproved,
  getApproved,

}