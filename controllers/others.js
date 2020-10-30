const Others = require('../models/others');

const getOthers = (req, res, next) => {
  console.log("GET Request")
  res.json({
    message: 'this is home route of others'
  })
};

const getAllOthers = async (req, res, next) => {
  const others = await Others.find({})
    .populate("createdBy")
  if (!others)
    return res.send({
      success: false,
      message: "others not found",
    });

  return res.send({
    success: true,
    message: " others Found successfull",
    responseData: others,
  });
};


const getOthersById = async (req, res, next) => {
  try {
    const others = await Others.findOne({
      _id: req.params.othersId,
    })
    if (!others)
      return res.send({
        success: false,
        message: "others Not Found",
      });
  
    return res.send({
      success: true,
      message: "others Found successfully",
      responseData: { others},
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

const getOthersByUser = async (req, res, next) => {
  console.log(req.user);
  const others = await Others.find({})
    .where("createdBy")
    .equals(req.user.userId)
    .populate("createdBy")
    .exec();
  if (others)
    return res.send({
      success: true,
      message: "others Found successfully",
      responseData: others ,
    });
  return res.send({
    success: false,
    message: "others Not Found",
  });
};


const createOthers = async (req, res, next) => {
  try {
    const othersDetails = {
        GoalAmount:req.body.GoalAmount,
        purpose:req.body.purpose,
        fundFor:req.body.fundFor,
        cause:req.body.cause,
    };
    const others = new Others(othersDetails, (err) => {
      if (err)
        return res.send({
          success: false,
          message: "Request not found",
          responsedata: err,
        });
    });
    console.log(JSON.stringify(others, null, 4));
    others.createdBy = req.user.userId;
    // console.log(JSON.stringify(othersDetails, null, 4));
    await others.save();
    console.log(JSON.stringify(othersDetails, null, 4));
    return res.send({
      success: true,
      message: "company successfully created",
      responsedata: {
        others,
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
const deleteAllOthers = async (req, res, next) => {
  try {
    await Others.deleteMany({});
    return res.send({
      success: true,
      message: "others deleted successfully",
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


const updateOthers = async (req, res, next) => {
  try {
    const others = await Others.findById(req.params.othersId)
    const userId = req.user.userId;
    const createdBy = Others.createdBy;
console.log(req.user);
    if(JSON.stringify(userId)==JSON.stringify(createdBy))
      // if(Others.createdBy = req.user.userId)
      {
        if (!others || !req.body){
            return res.send({
              success: false,
              message: "Buisness not found",
            });}
          

            const othersDetails = req.body
          const Getothers = await Others.findOneAndUpdate({_id:req.params.othersId},othersDetails);  
              
            return res.send({
              success: true,
              message: "others Updated Successfull",
              responseData: Getothers,            
            });
      }
      else{
        return res.send({
              success: false,
              message: "Unauthorized kutter",
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

const deleteOthersById = async (req, res, next) => {
  const others = await Others.findByIdAndDelete(req.params.othersId)
    .where("createdBy")
    .equals(req.user.userId);
  console.log(others);
  if (others)
    return res.send({
      success: true,
      message: "others Delete Successfully",
      responsedata: others,
    });
  else
    return res.send({
      success: false,
      message: "others not found",
    });
};
const ApproveOthers = async (req, res, next) => {
  try{
    Others.findByIdAndUpdate(req.params.othersId, { verification: 'approved' }, {
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
         return res.send({
               success: true,
               message: "Others approve Successful",
               responsedata: docs,
             });
     } 
 }); 
 } catch (err){
    
   return res.send({
     success: false,
     message: "Something went wrong",
     responsedata:err,
   });
 
 }  
};

const DisapproveOthers = async (req, res, next) => {
  try{
    Others.findByIdAndUpdate(req.params.othersId, { verification: 'disapproved' }, {
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
                message: "Others disapprove Successful",
                responsedata: docs,
              });
      } 
  }); 
  } catch (err){
     
    return res.send({
      success: false,
      message: "Something went wrong",
      responsedata:err,
    });
  
  }
};


const getApproved =  async (req, res) => {
  const others = await Others.find({verification: "approved"});
  return res.send({
    success: true,
    message: "Approved others Listed",
    responsedata: {
      others,
    },
  });
};
const getDisapproved =  async (req, res) => {
  const others = await Others.find({verification: "disapproved"});
  return res.send({
    success: true,
    message: "Disapproved others Listed",
    responsedata: {
      others,
    },
  });
};
const getNULL =  async (req, res) => {
  const others = await Others.find({verification: "NULL"});
  return res.send({
    success: true,
    message: "NULL others Listed",
    responsedata: {
      others,
    },
  });
};


module.exports = {
    getOthers,
    createOthers,
    updateOthers,
    deleteOthersById,
    deleteAllOthers,
    getOthersByUser,
    getOthersById,
    getAllOthers,
    ApproveOthers,
    DisapproveOthers,
    getNULL,
    getDisapproved,
    getApproved
}