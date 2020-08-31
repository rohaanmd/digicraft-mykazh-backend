const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BusinessSchema = new Schema(
  {
    companyName: {
      type: String,
      // required: true,
    },
    companyOverview: {
      type: String,
      // required: true,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
    customContentInput: String,
    customContentTextarea: String,
    location: {
      country: {
        type: String,
        // required: true,
      },
      stateAndCity: String,
    },
    press: String,

    companyTagline: String,
    companyKeyword: String,
    email: String,
    canSms: Boolean,
    websiteURL: String,
    conatctPhone: Number,
    linkedinURL: String,
    facebookURL: String,
    twitterURL: String,
    url: {
      type: String,
      // required: true,
    },
    team: [
      {
        level: Boolean,
        visible: Boolean,
        role: String,
        name: String,
      },
    ],
    kpi: [
      {
        option: Number,
        role: String,
        text: String,
      },
    ],

    featuredImg: {
      type: String,
    },
    video: {
      type: String,
    },
    youtubeUrls: [
      {
        url: String,
      },
    ],
    test: [
      {
        name: {
          type: String,
        },
        role: String,
        text: String,
      },
    ],

    traction: [
      {
        date: Date,
        text: String,
      },
    ],
    qus: [
      {
        qus: String,
        ans: String,
      },
    ],

    CampaignVisibility: {
      type: String,
      // required: true,
      enum: ["private", "public"],
    },
    goal: Number,
    MaximumInvestmentAmount: Number,
    MinimumInvestmentAmount: Number,
    deal_stage: {
      type: Number,
      // type: String,
      // required: true,
      // enum: ["pre-seed", "seed", "BridgeToSeriesA", "SeriesA", "BridgeToSeriesB", "SeriesB", "others"],
    },
    ClosingDate: Date,
    currentlyFunding: {
      type: Boolean,
      // required: true,
      default: false,
    },

    ExemptionType: {
      type: String,
      // enum: ["regA", "regB"]
    },
    equity: {
      PreMoneyEvaluation: Number,
    },

    TermLength: Number,
    ConversionDiscount: Number,
    Intrest: Number,
    ValuationCap: Number,
    WarrantCoverage: Number,

    safeNote: {
      valuationCap: Number,
      conversionDiscount: Number,
    },
    debt: {
      interest: Number,
      termLength: Number,
    },

    return: Number,
    PaymentFrequency: {
      type: Number,
      // type: String,
      // enum: ["monthly", "bimonthly", "quarterly"]
    },
    MaximumReturn: Number,
    ReturnType: {
      type: Number,
      // type: String,
      // enum: ["profit", "revenue"]
    },
    PaybackStartDate: {
      type: String,
      enum: ["Exact Date", "Number Of Month Finance Close"],
    },

    FundingSource: {
      type: Number,
      // type: String,
      // enum: ["self", "friemd", "bank", "investor", "grant", "other"]
    },
    FundingAmount: Number,
    FundingDate: Date,
    FundingType: Number,

    dealHighligths: [{ type: String }],
    ElevatorPitch: String,
    investor: [
      {
        InvestorType: {
          type: Number,
          // type: String,
          // enum: ["individual", "institutional"]
        },
        InvestorName: {
          type: String,
        },
      },
    ],
    ExecutiveSummaryToogle: Boolean,
    TermSheetToogle: Boolean,
    AdditionalToogle: Boolean,

    docs: {
      executiveSummary: {
        Doctype: {
          type: String,
          enum: ["public", "confidential"],
        },
        fileUrl: String,
      },
      termSheet: {
        Doctype: {
          type: String,
          enum: ["public", "confidential"],
        },
        fileUrl: String,
      },
      additionalDoc: {
        Doctype: String,
        fileUrl: String,
      },
    },

    RisksDisclosures: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("business", BusinessSchema);
