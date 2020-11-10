const Business = require('../models/business');

const getBusiness = (req, res, next) => {
  console.log("GET Request")
  res.json({
    message: 'this is home route of business'
  })
};

const getAllBusiness = async (req, res, next) => {
  const business = await Business.find({})
    .populate("createdBy")
  if (!business)
    return res.send({
      success: false,
      message: "Business not found",
    });

  return res.send({
    success: true,
    message: " Business Found successfull",
    responseData: business,
  });
};


const getBusinessById = async (req, res, next) => {
  try {
    const business = await Business.findOne({
      _id: req.params.businessId,
    })
    if (!business)
      return res.send({
        success: false,
        message: "business Not Found",
      });
  
    return res.send({
      success: true,
      message: "business Found successfully",
      responseData: { business},
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

const getBusinessByUser = async (req, res, next) => {
  console.log(req.user);
  const business = await Business.find()
    .where("createdBy")
    .equals(req.user.userId)
    .populate("createdBy")
    .exec();
  if (business)
    return res.send({
      success: true,
      message: "business Found successfully",
      responseData: { business },
    });
  return res.send({
    success: false,
    message: "business Not Found",
  });
};


const createBusiness = async (req, res, next) => {
  try {
    const businessDetails = {
      companyName: req.body.companyName ,
      location: req.body.location,
      companyTagline: req.body.companyTagline,
      companyKeyword: req.body.companyKeywords,
      url: req.body.url,
    };
    // console.log(req.user);
    const business = new Business(businessDetails, (err) => {
      if (err)
        return res.send({
          success: false,
          message: "Request not found",
          responseData: err,
        });
    });
    business.createdBy = req.user.userId;
   
    await business.save();
    // console.log(JSON.stringify(businessDetails, null, 4));
    return res.send({
      success: true,
      message: "company successfully created",
      responseData: {
        business,
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
const deleteAllBusiness = async (req, res, next) => {
  try {
    await Business.deleteMany({});
    return res.send({
      success: true,
      message: "business deleted successfully",
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
 
const updateBusiness = async (req, res, next) => {
  try {
    const business = await Business.findById(req.params.businessId)
    const userId = req.user.userId;
    const createdBy = business.createdBy;

    // if(JSON.stringify(userId)==JSON.stringify(createdBy))
      if(business.createdBy = req.user.userId)
      {
        console.log(business);
        if (!business || !req.body){
            return res.send({
              success: false,
              message: "Buisness not found",
            });}
          

            // const businessDetails =  {
            //   companyName: req.body.companyName||business.companyName,
            //   companyOverview: req.body.companyOverview||business.companyOverview,
            //   companyLogo:req.body.companyLogo||business.companyLogo,
            //   customContentInput: req.body.customContentInput||business.customContentInput,
            //   customContentTextarea: req.body.customContentTextarea||business.customContentTextarea,
            //   location: req.body.location||business.location,
            //   press: req.body.press||business.press,
            //   companyTagline: req.body.companyTagline||business.companyTagline,
            //   companyKeyword: req.body.companyKeyword||business.companyKeyword,
            //   email: req.body.email||business.email,
            //   canSms: req.body.canSms||business.canSms,
            //   conatctPhone: req.body.conatctPhone||business.conatctPhone,
            //   linkedinURL: req.body.linkedinURL||business.linkedinURL,
            //   facebookURL: req.body.facebookURL||business.facebookURL,
            //   twitterURL: req.body.twitterURL||business.twitterURL,
            //   url: req.body.url||business.url,
            //   team: req.body.team||business.team,
            //   kpi: req.body.kpi||business.kpi,
            //   featuredImg: req.body.featuredImg||business.featuredImg,
            //   video: req.body.video||business.video,
            //   youtubeURL:req.body.youtubeURL||business.youtubeURL,
            //   test:req.body.test||business.test,
            //   traction: req.body.traction||business.traction,
            //   qus: req.body.qus||business.qus,
            //   CampaignVisibility: req.body.campaignVisibility||business.campaignVisibility,
            //   goal:req.body.goal||business.goal,
            //   MaximumInvestmentAmount: req.body.MaximumInvestmentAmount||business.MaximumInvestmentAmount,
            //   MinimumInvestmentAmount: req.body.MinimumInvestmentAmount||business.MinimumInvestmentAmount,
            //   deal_stage: req.body.deal_stage||business.deal_stage,
            //   ClosingDate: req.body.ClosingDate||business.closingDate,
            //   currentlyFunding: req.body.currentlyFunding||business.currentlyFunding,
            //   ExemptionType: req.body.ExemptionType||business.ExemptionType,
            //   PreMoneyEvaluation: req.body.PreMoneyEvaluation||business.PreMoneyEvaluation,
            //   TermLength: req.body.TermLength||business.TermLength,
            //   ConversionDiscount: req.body.ConversionDiscount||business.ConversionDiscount,
            //   Intrest: req.body.Intrest||business.Intrest,
            //   ValuationCap: req.body.ValuationCap||business.ValuationCap,
            //   WarrantCoverage: req.body.WarrantCoverage||business.WarrantCoverage,
            //   return: req.body.return||business.return,
            //   PaymentFrequency: req.body.PaymentFrequency||business.PaymentFrequency,
            //   MaximumReturn: req.body.MaximumReturn||business.MaximumReturn,
            //   ReturnType: req.body.ReturnType||business.ReturnType,
            //   PaybackStartDate: req.body.PaybackStartDate||business.PaybackStartDate,
            //   FundingSource: req.body.FundingSource||business.FundingSource,
            //   FundingAmount: req.body.FundingAmount||business.FundingAmount,
            //   FundingDate: req.body.FundingDate||business.FundingDate,
            //   FundingType: req.body.FundingType||business.FundingType,
            //   dealHighligths: req.body.dealHighligths||business.dealHighligths,
            //   ElevatorPitch: req.body.ElevatorPitch||business.ElevatorPitch,
            //   investor: req.body.investor||business.investor,
            //   ExecutiveSummaryToogle: req.body.ExecutiveSummaryToogle||business.ExecutiveSummaryToogle,
            //   TermSheetToogle: req.body.TermSheetToogle||business.TermSheetToogle,
            //   AdditionalToogle: req.body.AdditionalToogle||business.AdditionalToogle,
            //   // docs: {
            //   //   executiveSummary: {
            //   //      Doctype: req.body.ExecutiveSummaryType, fileUrl: req.body.ExecutiveSummaryUrl },
            //   //   termSheet: {
            //   //     Doctype:req.body.termSheetType,
            //   //     fileUrl: req.body.termSheetUrl,
            //   //   },
            //   //   additionalDoc: {
            //   //     Doctype:req.body.additionalDocType,
            //   //     fileUrl: req.body.additionalDocUrl,
            //   //   },
            //   // },
            //   RisksDisclosures: req.body.RiskDisclosures||business.RiskDisclosures,
            //   sideshareURL:req.body.sideshareURL||business.sideshareURL,
            //   PreMoneyValuation:req.body.PreMoneyEvaluation||business.PreMoneyEvaluation,
            //   fundraisingGoal:req.body.fundraisingGoal||business.fundraisingGoal,
            //   DateRoundOpened:req.body.DateRoundOpened||business.DateRoundOpened,
            //   websiteURL:req.body.websiteURL||business.websiteURL,
            // };
            // console.log(req.body);

          const UpdateBusiness = await Business.findOneAndUpdate({_id:req.params.businessId},req.body,{new: true})
            return res.send({
                 success: true,
                 message: "project Updated Successfull",
                 responseData: UpdateBusiness,
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

 
const ApproveBusiness = async (req, res, next) => {
  try{
     Business.findByIdAndUpdate(req.params.businessId, { verification: 'approved' }, {
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

const DisapproveBusiness = async (req, res, next) => {
  try{
    Business.findByIdAndUpdate(req.params.businessId, { verification: 'disapproved' }, {
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
          console.log("Updated User : ", docs); 
          
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
  const business = await Business.find({verification: "approved"});
  return res.send({
    success: true,
    message: "Approved business Listed",
    responseData: {
      business,
    },
  });
};
const getDisapproved =  async (req, res) => {
  const business = await Business.find({verification: "disapproved"});
  return res.send({
    success: true,
    message: "Disapproved business Listed",
    responseData: {
      business,
    },
  });
};
const getNULL =  async (req, res) => {
  const business = await Business.find({verification: "NULL"});
  return res.send({
    success: true,
    message: "NULL business Listed",
    responseData: {
      business,
    },
  });
};




const deleteBusinessById = async (req, res, next) => {
  const business = await Business.findById(req.params.businessId)
    if(business.createdBy = req.user.userId)
    {
      console.log(business);
      if (!business || !req.body){
          return res.send({
            success: false,
            message: "Buisness not found",
          });}
        
   await Business.findByIdAndDelete(req.params.businessId)
  
  console.log(business);
  if (business)
    return res.send({
      success: true,
      message: "business Delete Successfully",
      responseData: business,
    });
  else
    return res.send({
      success: false,
      message: "business NOT DELETED",
    });
  }
  else{
    return res.send({
      success: false,
      message: "Unautharized",
    });
  }
};


module.exports = {
  getBusiness,
  createBusiness,
  updateBusiness,
  deleteBusinessById,
  deleteAllBusiness,
  getBusinessByUser,
  getBusinessById,
  getAllBusiness,
  ApproveBusiness,
  DisapproveBusiness,
  getNULL,
  getDisapproved,
  getApproved
}