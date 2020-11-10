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
  const ngo = await Ngo.find({})
    .where("createdBy")
    .equals(req.user.userId)
    .populate("createdBy")
    .exec();
  if (ngo)
    return res.send({
      success: true,
      message: "ngo Found successfully",
      responseData:  ngo ,
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
          responseData: err,
        });
    });
    ngo.createdBy = req.user.userId;
    // console.log(JSON.stringify(ngoDetails, null, 4));
    await ngo.save();
    console.log(JSON.stringify(ngoDetails, null, 4));
    return res.send({
      success: true,
      message: "company successfully created",
      responseData: {
        ngo,
      },
    })
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
          

            const ngoDetails = req.body

           const Getngo = await Ngo.findOneAndUpdate({_id:req.params.ngoId},ngoDetails,{new: true})
              
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

  const ngo = await Ngo.findById(req.params.ngoId)
  const userId = req.user.userId;
  const createdBy = ngo.createdBy;

  if(JSON.stringify(userId)==JSON.stringify(createdBy))
{
      if (!ngo || !req.body){
          return res.send({
            success: false,
            message: "NGO not found",
          });}
        
 await Ngo.findByIdAndDelete(req.params.ngoId)
  
  console.log(ngo);
  if (ngo)
    return res.send({
      success: true,
      message: "ngo Delete Successfully",
      responseData: ngo,
    });
  else
    return res.send({
      success: false,
      message: "ngo not found",
    });
  }
  else
  return res.send({
    success: false,
    message: "Unauthorized",
  });
};




const ApproveNgo = async (req, res, next) => {
  try{
    Ngo.findByIdAndUpdate(req.params.ngoId, { verification: 'approved' }, {
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
               message: "Ngo approve Successful",
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

const DisapproveNgo = async (req, res, next) => {
  try{
    Ngo.findByIdAndUpdate(req.params.ngoId, { verification: 'disapproved' }, {
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
                message: "Ngo disapprove Successful",
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
  const ngo = await Ngo.find({verification: "approved"});
  return res.send({
    success: true,
    message: "Approved ngo Listed",
    responseData: {
      ngo,
    },
  });
};
const getDisapproved =  async (req, res) => {
  const ngo = await Ngo.find({verification: "disapproved"});
  return res.send({
    success: true,
    message: "Disapproved ngo Listed",
    responseData: {
      ngo,
    },
  });
};
const getNULL =  async (req, res) => {
  const ngo = await Ngo.find({verification: "NULL"});
  return res.send({
    success: true,
    message: "NULL ngo Listed",
    responseData: {
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