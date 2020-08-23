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
    }).populate("createdBy");
    if (!business)
      return res.send({
        success: false,
        message: "business Not Found",
      });
    const isAuthor = business.created_by.equals(req.user.userId);
    return res.send({
      success: true,
      message: "business Found successfully",
      responseData: { business, isAuthor },
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


const createBusiness = (req, res, next) => {
  try {
    const businessDetails = {
      comanyName: req.body.comanyName,
      companyOverview: req.body.companyOverview,
      location: {
        country: req.body.country,
        city: req.body.city,
      },
      company_tagline: req.body.company_tagline,
      company_keyword: req.body.company_keyword,
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
    const business = new Business(businessDetails, (err) => {
      if (err)
        return res.send({
          success: false,
          message: "Request not found",
          responsedata: err,
        });
    });
    console.log(JSON.stringify(businessDetails, null, 4));
    business.createdBy = req.user.userId;
    business.save();
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
    const business = await Business.findOne({
      _id: req.params.businessId,
    })
      .where("createdBy")
      .equals(req.user.userId);
    if (!business || !req.body)
      return res.send({
        success: false,
        message: "Unauthorized",
      });
    business.comanyName = req.body.comanyName;
    business.companyOverview = req.body.companyOverview;
    business.location.country = req.body.country;
    business.location.city = req.body.city;
    business.company_tagline = req.body.company_tagline;
    business.company_keyword = req.body.company_keyword;
    business.email = req.body.email;
    business.website = req.body.website;
    business.mobile = req.body.number;
    business.linkedin = req.body.linkedin;
    business.facebook = req.body.facebook;
    business.twitter = req.body.twitter;
    business.logo = req.body.logo;
    business.featuredImg = req.body.featuredImg;
    business.video = req.body.video;
    business.youtubeUrls = req.body.youtubeUrls;
    business.testimonials = req.body.testimonials;
    business.traction = req.body.traction;
    business.faq = req.body.faq;
    business.fundraising.visibility = req.body.visibility;
    business.fundraising.goal = req.body.goal;
    business.fundraising.maxAmount = req.body.maxAmount;
    business.fundraising.minAmount = req.body.minAmount;
    business.fundraising.stage = req.body.stage;
    business.fundraising.closingDate = req.body.closingDate;
    business.fundraising.currentlyFunding = req.body.currentlyFunding;
    business.fundraising.dealType.exemption = req.body.exemption;
    business.fundraising.dealType.equity.PreMoneyEvaluation = req.body.PreMoneyEvaluation;
    business.fundraising.dealType.convertableNote.termLength = req.body.termLength;
    business.fundraising.dealType.convertableNote.conversionDiscount = req.body.conversionDiscount;
    business.fundraising.dealType.convertableNote.intrest = req.body.convertableNoteIntrest;
    business.fundraising.dealType.convertableNote.valuationCap = req.body.valuationCap;
    business.fundraising.dealType.convertableNote.warrantCoverage = req.body.warrantCoverage;
    business.fundraising.dealType.safeNote.valuationCap = req.body.valuationCap;
    business.fundraising.dealType.safeNote.conversionDiscount = req.body.conversionDiscount;
    business.fundraising.dealType.debt.interest = req.body.interest;
    business.fundraising.dealType.debt.termLength = req.body.termLength;
    business.fundraising.dealType.revenueShare.return = req.body.revenueShareReturn;
    business.fundraising.dealType.revenueShare.paymentFrequency = req.body.paymentFrequency;
    business.fundraising.dealType.revenueShare.MaxReturn = req.body.MaxReturn;
    business.fundraising.dealType.revenueShare.returnType = req.body.revenueShareReturnType;
    business.fundraising.dealType.revenueShare.PaybackStartDate = req.body.paymentStartDate;
    business.fundraising.PreviousFunding.source = req.body.previousFundingSource;
    business.fundraising.PreviousFunding.fundingAmount = req.body.fundingAmount;
    business.fundraising.PreviousFunding.fundingDate = req.body.fundingDate;
    business.pitch.highlight = req.body.pitchHighlights;
    business.pitch.elevatorPitch = req.body.elevatorPitch;
    business.pitch.investor = req.body.investor;
    business.docs.executiveSummary.Doctype = req.body.ExecutiveSummaryType;
    business.docs.executiveSummary.fileUrl = req.body.ExecutiveSummaryUrl;
    business.docs.termSheetDoctype = req.body.termSheetType;
    business.docs.termSheetfileUrl = req.body.termSheetUrl;
    business.docs.additionalDocDoctype = req.body.additionalDocType;
    business.docs.additionalDocfileUrl = req.body.additionalDocUrl;
    business.risk = req.body.risk;
    const updatedBusiness = await business.save();
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