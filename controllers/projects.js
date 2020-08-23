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
    }).populate("createdBy");
    if (!project)
      return res.send({
        success: false,
        message: "Project Not Found",
      });
    const isAuthor = project.createdby.equals(req.user.userId);
    return res.send({
      success: true,
      message: "Project Found successfully",
      responseData: { project, isAuthor },
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
  console.log(req.user);
  const project = await Project.find()
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


const createProject = (req, res, next) => {
  try {
    const projectDetails = {
          compaigntitle: req.body.compaigntitle,
          compaigntagline: req.body.compaigntagline,
          location: req.body.state+','+req.body.country,
          compaigncardimage: req.body.compaigncardimage,
          catergory: req.body.catergory,
          tags: req.body.tags,
          videourl: req.body.videourl,
          videooverlayimg: req.body.vidOvlayimg,
          FAQ:req.body.faq,
          perk:req.body.perk,
          fundingType:req.body.fundingType,
          campaigngoalAmountCurrency:req.body.campaigngoalAmountCurrency,
          countryoflegalresidence:req.body.countryoflegalresidence,
          customerBillingStatement:req.bodycustomerBillingStatement,
          legalFirstname:req.body.legalFirstname,
          legalLastname:req.body.legalLastname,
          dateofbirth:req.body.dateofbirth,
          phonenumber:req.body.phonenumber,
          country:req.body.country,
          streetAddress:req.body.streetAddress,
          ExtraAddress:req.body.ExtraAddress,
          supportEmailaddress:req.body.supportEmailaddress,
          campaignTeam:req.body.campaignTeam,
          draftcampaignlink:req.body.draftcampaignlink,
          facebookshareimage:req.body.facebookshareimage,
          marketingimage:req.body.marketingimage,
          customshorturl:req.body.customshorturl,
          googleAnalytics:{
               trackingid:req.body.trackingid
          },
          googleAdtracking:{
               conversionid:req.body.conversionid,
               conversionlabel:req.body.conversionlabel,
               remarketingid:req.body.remarketingid
          },
          facebookAdtracking:{
               Facebookpixelid:req.body.Facebookpixelid
          },
          videosgallery:{
               youtubeorvimeourl:req.body.youtubeorvimeourl
          },
          imagegallery:req.body.imagegallery

      
    };
    const project = new Business(projectDetails, (err) => {
      if (err)
        return res.send({
          success: false,
          message: "Request not found",
          responsedata: err,
        });
    });
    console.log(JSON.stringify(projectDetails, null, 4));
    project.createdBy = req.user.userId;
    project.save();
    return res.send({
      success: true,
      message: "Project successfully created",
      responsedata: {
          project,
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
    const project = await Project.findOne({
      _id: req.params.projectId,
    })
      .where("createdBy")
      .equals(req.user.userId);
    if (!project || !req.body)
      return res.send({
        success: false,
        message: "Unauthorized",
      });

          project.compaigntitle= req.body.compaigntitle,
          project.compaigntagline= req.body.compaigntagline,
          project.location= req.body.state+','+req.body.country,
          project.compaigncardimage= req.body.compaigncardimage,
          project.catergory= req.body.catergory,
          project.tags= req.body.tags,
          project.videourl= req.body.videourl,
          project.videooverlayimg= req.body.vidOvlayimg,
          project.faq=req.body.faq,
          project.perk=req.body.perk,
          project.fundingType=req.body.fundingType,
          project.campaigngoalAmountCurrency=req.body.campaigngoalAmountCurrency,
          project.countryoflegalresidence=req.body.countryoflegalresidence,
          project.customerBillingStatement=req.bodycustomerBillingStatement,
          project.legalFirstname=req.body.legalFirstname,
          project.legalLastname=req.body.legalLastname,
          project.dateofbirth=req.body.dateofbirth,
          project.phonenumber=req.body.phonenumber,
          project.country=req.body.country,
          project.streetAddress=req.body.streetAddress,
          project.ExtraAddress=req.body.ExtraAddress,
          project.supportEmailaddress=req.body.supportEmailaddress,
          project.campaignTeam=req.body.campaignTeam,
          project.draftcampaignlink=req.body.draftcampaignlink,
          project.facebookshareimage=req.body.facebookshareimage,
          project.marketingimage=req.body.marketingimage,
          project.customshorturl=req.body.customshorturl,
          project.googleAnalytics.trackingid=req.body.trackingid
          project.googleAdtracking.conversionid=req.body.conversionid,
          project.googleAdtracking.conversionlabel=req.body.conversionlabel,
          project.googleAdtracking.remarketingid=req.body.remarketingid
          project.facebookAdtracking.Facebookpixelid=req.body.Facebookpixelid
          project.videosgallery.youtubeorvimeourl=req.body.youtubeorvimeourl
         project.imagegallery=req.body.imagegallery

//     const updatedBusiness = await business.save();

     Project.findOneAndUpdate({_id:req.params.projectId},{project})
     return res.send({
          success: true,
          message: "business Updated Successfull",
          responseData: updatedBusiness,
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

const deleteProjectById = async (req, res, next) => {
  const project = await Project.findByIdAndDelete(req.params.projectId)
    .where("createdBy")
    .equals(req.user.userId);
  console.log(project);
  if (project)
    return res.send({
      success: true,
      message: "business Delete Successfully",
      responsedata: project,
    });
  else
    return res.send({
      success: false,
      message: "business not found",
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
     getProject
}