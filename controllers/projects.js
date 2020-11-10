const Project = require('../models/project');

const getProject = (req, res, next) => {
  console.log("GET Request")
  res.json({
    message: 'this is home route of Project'
  })
};

const getAllProject = async (req, res, next) => {
  const project = await Project.find({})
    .populate("createdBy")
  if (!project)
    return res.send({
      success: false,
      message: "Projects not found",
    });

  return res.send({
    success: true,
    message: " Projects Found successfull",
    responseData: project,
  });
};


const getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findOne({
      _id: req.params.projectId,
    })
    // .populate("createdBy");
    if (!project)
      return res.send({
        success: false,
        message: "Project Not Found",
      });
    // const isAuthor = project.createdby.equals(req.user.userId);
    return res.send({
      success: true,
      message: "Project Found successfully",
      responseData: { project },
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

const getProjectByUser = async (req, res, next) => {
 
  const project = await Project.find({})
    .where("createdBy")
    .equals(req.user.userId)
    .populate("createdBy")
    .exec();
  if (project)
    return res.send({
      success: true,
      message: "projects Found successfully",
      responseData: { project },
    });
  return res.send({
    success: false,
    message: "projects Not Found",
  });
};


const createProject = async (req, res, next) => {
  try {
     const projectDetails = {
          bigList:req.body.bigList,
          campaigntitle: req.body.campaigntitle,
          campaigntagline: req.body.campaigntagline,
          location: req.body.location,
          campaigncardimage: req.body.campaigncardimage,
          selectCategory: req.body.selectCategory,
          SubCategory: req.body.SubCategory,

          tags: req.body.tags,
          uploadImage:req.body.uploadImage
       
          
   

      
    };

    console.log(req.body);
  
    // console.log(JSON.stringify(projectDetails, null, 4));
    const project = new Project(projectDetails, (err) => {
      if (err)
        return res.send({
          success: false,
          message: "Request not found",
          responseData: err,
        });
    });
   
    project.createdBy = req.user.userId;
    await project.save();
   
    return res.send({
      success: true,
      message: "Project successfully created",
      responseData: {
          project,
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
const deleteAllProject = async (req, res, next) => {
  try {
    await Project.deleteMany({});
    return res.send({
      success: true,
      message: "Project deleted successfully",
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


const updateProject = async (req, res, next) => {
 
    try {
      const project = await Project.findById(req.params.projectId)
      const userId = req.user.userId;
      const createdBy = project.createdBy;
  
    if(JSON.stringify(userId)==JSON.stringify(createdBy))
    {
    if (!project || !req.body)
      return res.send({
        success: false,
        message: "Unauthorized",
      });


     await Project.findOneAndUpdate({_id:req.params.projectId},req.body,{new: true})
     return res.send({
          success: true,
          message: "project Updated Successfull",
          responseData: project,
        });
      } else{
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

const deleteProjectById = async (req, res, next) => {
 
  try {
    const project = await Project.findById(req.params.projectId)
    const userId = req.user.userId;
    const createdBy = project.createdBy;

  if(JSON.stringify(userId)==JSON.stringify(createdBy))
  {
  if (!project || !req.body)
    return res.send({
      success: false,
      message: "Unauthorized",
    });


   await Project.findByIdAndDelete(req.params.projectId)
   return res.send({
        success: true,
        message: "project Updated Successfull",
        responseData: project,
      });
    } else{
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
// {

//     const project = await Project.findById(req.params.projectId)
//     const userId = req.user.userId;
//     const createdBy = project.createdBy;

//   if(JSON.stringify(userId)==JSON.stringify(createdBy))
//   {
//   if (!project || !req.body)
//     return res.send({
//       success: false,
//       message: "Unauthorized",
//     });
//   }
  
//   await Project.findByIdAndDelete(req.params.projectId)
 

//   console.log(project);
//   if (project)
//     return res.send({
//       success: true,
//       message: "project Delete Successfully",
//       responseData: project,
//     });
//   else
//     return res.send({
//       success: false,
//       message: "Unauthrized",
//     });
// };
const ApproveProject = async (req, res, next) => {
  try{
    Project.findByIdAndUpdate(req.params.projectId, { verification: 'approved' }, {
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
               message: "project approve Successful",
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

const DisapproveProject = async (req, res, next) => {
   try{
    Project.findByIdAndUpdate(req.params.projectId, { verification: 'disapproved' }, {
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
                message: "BUISSNESS disapprove Successful",
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
  const project = await Project.find({verification: "approved"});
  return res.send({
    success: true,
    message: "Approved project Listed",
    responseData: {
      project,
    },
  });
};
const getDisapproved =  async (req, res) => {
  const project = await Project.find({verification: "disapproved"});
  return res.send({
    success: true,
    message: "Disapproved project Listed",
    responseData: {
      project,
    },
  });
};
const getNULL =  async (req, res) => {
  const project = await Project.find({verification: "NULL"});
  return res.send({
    success: true,
    message: "NULL project Listed",
    responseData: {
      project,
    },
  });
};


module.exports = {
     deleteProjectById,
     updateProject,
     deleteAllProject,
     createProject,
     getProjectByUser,
     getProjectById,
     getAllProject,
     getProject,
     ApproveProject,
     DisapproveProject,
     getNULL,
     getDisapproved,
     getApproved
}