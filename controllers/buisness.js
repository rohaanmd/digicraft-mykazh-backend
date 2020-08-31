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
     
      location: {
        country: req.body.country,
        city: req.body.stateAndCit
      },
      company_tagline: req.body.companyTagline,
      company_keyword: req.body.companyKeywords,
      email: req.body.email,
      website: req.body.website,
      mobile: req.body.number,
      linkedin: req.body.linkedin,
      facebook: req.body.facebook,
      twitter: req.body.twitter,
      logo: req.body.logo,
      featuredImg: req.body.featuredImg,
      video: req.body.video,
      youtubeUrls: req.body.youtubeUrls,
      testimonials: req.body.testimonials,
      traction: req.body.traction,
      faq: req.body.faq,
      fundraising: {
        visibility: req.body.visibility,
        goal: req.body.goal,
        maxAmount: req.body.maxAmount,
        minAmount: req.body.minAmount,
        stage: req.body.stage,
        closingDate: req.body.closingDate,
        currentlyFunding: req.body.currentlyFunding,
        dealType: {
          exemption: req.body.exemption,
          equity: {
            PreMoneyEvaluation: req.body.PreMoneyEvaluation,
          },
          convertableNote: {
            termLength: req.body.termLength,
            conversionDiscount: req.body.conversionDiscount,
            intrest: req.body.convertableNoteIntrest,
            valuationCap: req.body.valuationCap,
            warrantCoverage: req.body.warrantCoverage,
          },
          safeNote: {
            valuationCap: req.body.valuationCap,
            conversionDiscount: req.body.conversionDiscount,

          },
          debt: {
            interest: req.body.interest,
            termLength: req.body.termLength,

          },

          revenueShare: {
            return: req.body.revenueShareReturn,
            paymentFrequency: req.body.paymentFrequency,
            MaxReturn: req.body.MaxReturn,
            returnType: req.body.revenueShareReturnType,
            PaybackStartDate: req.body.paymentStartDate

          }


        },
        PreviousFunding: {
          source: req.body.previousFundingSource,
          fundingAmount: req.body.fundingAmount,
          fundingDate: req.body.fundingDate,
        }

      },

      pitch: {
        highlight: req.body.pitchHighlights,
        elevatorPitch: req.body.elevatorPitch,
        investor: req.body.investor,
      },

      docs: {
        executiveSummary: { Doctype: req.body.ExecutiveSummaryType, fileUrl: req.body.ExecutiveSummaryUrl },
        termSheet: {
          Doctype: req.body.termSheetType,
          fileUrl: req.body.termSheetUrl,
        },
        additionalDoc: {
          Doctype: req.body.additionalDocType,
          fileUrl: req.body.additionalDocUrl,
        }
      },
      risk: req.body.risk,
    };
    console.log(req.user);
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
    console.log(JSON.stringify(businessDetails, null, 4));
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
          

            const businessDetails = {
                comanyName: req.body.comanyName || business.comanyName ,
                companyOverview: req.body.companyOverview ,
                location: {
                  country: req.body.country,
                  stateAndCity: req.body.stateAndCity,
                },
                companyTagline: req.body.companyTagline,
                companyKeywords: req.body.companyKeywords,
                email: req.body.email,
                website: req.body.website,
                mobile: req.body.number,
                linkedin: req.body.linkedin,
                facebook: req.body.facebook,
                twitter: req.body.twitter,
                logo: req.body.logo,
                featuredImg: req.body.featuredImg,
                video: req.body.video,
                youtubeUrls: req.body.youtubeUrls,
                testimonials: req.body.testimonials,
               
                faq: req.body.faq,
                fundraising: {
                  visibility: req.body.visibility,
                  goal: req.body.goal,
                  maxAmount: req.body.maxAmount,
                  minAmount: req.body.minAmount,
                  stage: req.body.stage,
                  closingDate: req.body.closingDate,
                  currentlyFunding: req.body.currentlyFunding,
                  dealType: {
                    exemption: req.body.exemption,
                    equity: {
                      PreMoneyEvaluation: req.body.PreMoneyEvaluation,
                    },
                    convertableNote: {
                      termLength: req.body.termLength,
                      conversionDiscount: req.body.conversionDiscount,
                      intrest: req.body.convertableNoteIntrest,
                      valuationCap: req.body.valuationCap,
                      warrantCoverage: req.body.warrantCoverage,
                    },
                    safeNote: {
                      valuationCap: req.body.valuationCap,
                      conversionDiscount: req.body.conversionDiscount,
          
                    },
                    debt: {
                      interest: req.body.interest,
                      termLength: req.body.termLength,
          
                    },
          
                    revenueShare: {
                      return: req.body.revenueShareReturn,
                      paymentFrequency: req.body.paymentFrequency,
                      MaxReturn: req.body.MaxReturn,
                      returnType: req.body.revenueShareReturnType,
                      PaybackStartDate: req.body.paymentStartDate
          
                    }
          
          
                  },
                  PreviousFunding: {
                    source: req.body.previousFundingSource,
                    fundingAmount: req.body.fundingAmount,
                    fundingDate: req.body.fundingDate,
                  }
          
                },
          
                pitch: {
                  highlight: req.body.pitchHighlights,
                  elevatorPitch: req.body.elevatorPitch,
                  investor: req.body.investor,
                },
          
                docs: {
                  executiveSummary: { Doctype: req.body.ExecutiveSummaryType, fileUrl: req.body.ExecutiveSummaryUrl },
                  termSheet: {
                    Doctype: req.body.termSheetType,
                    fileUrl: req.body.termSheetUrl,
                  },
                  additionalDoc: {
                    Doctype: req.body.additionalDocType,
                    fileUrl: req.body.additionalDocUrl,
                  }
                },
                risk: req.body.risk,
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