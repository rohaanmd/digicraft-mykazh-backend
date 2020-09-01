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
          responsedata: err,
        });
    });
    // business.createdBy = req.user.userId;
   
    await business.save();
    // console.log(JSON.stringify(businessDetails, null, 4));
    return res.send({
      success: true,
      message: "company successfully created",
      responsedata: {
        business,
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

    if(JSON.stringify(userId)==JSON.stringify(createdBy))
      // if(business.createdBy = req.user.userId)
      {
        if (!business || !req.body){
            return res.send({
              success: false,
              message: "Buisness not found",
            });}
          

            const businessDetails =  {
              companyName: req.body.companyName,
              companyOverview: req.body.companyOverview,
              customContentInput: req.body.customContentInput,
              customContentTextarea: req.body.customContentTextarea,
              location: Request.body.location,
              press: req.body.press,
              companyTagline: req.body.companyTagline,
              companyKeyword: req.body.companyKeyword,
              email: req.body.email,
              canSms: req.body.canSms,
              websiteURL: req.body.websiteURL,
              conatctPhone: req.body.conatctPhone,
              linkedinURL: req.body.linkedinURL,
              facebookURL: req.body.facebookURL,
              twitterURL: req.body.twitterURL,
              url: req.body.url,
              team: req.body.team,
              kpi: req.body.kpi,
              featuredImg: req.body.featuredImg,
              video: req.body.video,
              youtubeURL:req.body.youtubeURL,
              test:req.body.test,
              traction: req.body.traction,
              qus: req.body.qus,
              CampaignVisibility: req.body.campaignVisibility,
              goal:req.body.goal,
              MaximumInvestmentAmount: req.body.MaximumInvestmentAmount,
              MinimumInvestmentAmount: req.body.MinimumInvestmentAmount,
              deal_stage: req.body.deal_stage,
              ClosingDate: req.body.ClosingDate,
              currentlyFunding: req.body.currentlyFunding,
              ExemptionType: req.body.ExemptionType,
              PreMoneyEvaluation: req.body.PreMoneyEvaluation,
              TermLength: req.body.TermLength,
              ConversionDiscount: req.body.ConversionDiscount,
              Intrest: req.body.Intrest,
              ValuationCap: req.body.ValuationCap,
              WarrantCoverage: req.body.WarrantCoverage,
              return: req.body.return,
              PaymentFrequency: req.body.PaymentFrequency,
              MaximumReturn: req.body.MaximumReturn,
              ReturnType: req.body.ReturnType,
              PaybackStartDate: req.body.PaybackStartDate,
              FundingSource: req.body.FundingSource,
              FundingAmount: req.body.FundingAmount,
              FundingDate: req.body.FundingDate,
              FundingType: req.body.FundingType,
              dealHighligths: req.body.dealHighligths,
              ElevatorPitch: req.body.ElevatorPitch,
              investor: req.body.investor,
              ExecutiveSummaryToogle: req.body.ExecutiveSummaryToogle,
              TermSheetToogle: req.body.TermSheetToogle,
              AdditionalToogle: req.body.AdditionalToogle,
              docs: {
                executiveSummary: {
                   Doctype: req.body.ExecutiveSummaryType, fileUrl: req.body.ExecutiveSummaryUrl },
                termSheet: {
                  Doctype:req.body.termSheetType,
                  fileUrl: req.body.termSheetUrl,
                },
                additionalDoc: {
                  Doctype:req.body.additionalDocType,
                  fileUrl: req.body.additionalDocUrl,
                },
              },
          
              RisksDisclosures: req.body.RiskDisclosures,
            };

            await business.updateOne(businessDetails,function(
                err,
                result
              ) {
                if (err) {
                  res.send(err);
                }
               
              });  
              
            return res.send({
              success: true,
              message: "business Updated Successfull",
              responseData: Getbusiness,            
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

const deleteBusinessById = async (req, res, next) => {
  const business = await Business.findByIdAndDelete(req.params.businessId)
    .where("createdBy")
    .equals(req.user.userId);
  console.log(business);
  if (business)
    return res.send({
      success: true,
      message: "business Delete Successfully",
      responsedata: business,
    });
  else
    return res.send({
      success: false,
      message: "business not found",
    });
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
}