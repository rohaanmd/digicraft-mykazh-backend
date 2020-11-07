const mongoose = require("mongoose");
const {
     string
} = require("@hapi/joi");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
     createdBy: {
          type: Schema.Types.ObjectId,
          ref: "User",
          // required: true,
     },
     companyName: String,
     companyOverview: String,
     companyLogo: {
          secure_url: String,
          public_id: String
     },
     //  bigList:Number,
     campaigntitle: {
          type: String,
          // required:true
     },
     verification: {
          type: String,
          enum: ["approved", "disapproved", "NULL"],
          default: "NULL"
     },
     campaigntagline: {
          type: String,
          // required:true
     },
     campaigncardimage: {
          secure_url: String,
          public_id: String
     },
     location: {
          country: {
            type: String,
            // required: true,
          },
          stateAndCity: String,
        },
     selectCatergory: {
          type: String,
          // required:true
     },
     SubCatergory: {
          type: String,
          // required:true
     },
     campaignDuration: {
          type: Number
     },
     tags: {
          type: String,
          // required:true
     },

     story: {
          type: String,
          // required:true
     },
     faq: [{
          Question: String,
          Answer: String
     }],
     perk: [{
          visibility: {
               type: String,
               enum: ["Visible", "Hidden"],
          },

          perkimage: {
               secure_url: String,
               public_id: String
          },
          price: {
               type: Number,
               // required:true
          },
          retailprice: Number,
          title: {
               type: String,
               // required:true
          },
          includeditems: {
               itemname: {
                    type: String,
               },
               option: {
                    OptionName: String,
                    OptionSize: Number
               }
          },
          claimed:{type:Number,default:0},
          Description: {
               type: String,
               // required:true
          },
          perk: String,
          Quantity: Number,
          EstimateDeliverydate: Date,
          Shipping: {
               Shippinglocation: String,
               ShippingFee: Number
          }
     }],
     imagegallery: [{
          url: {
               secure_url: String,
               public_id: String
          }
     }],
     facebookURL: String,
     twitterURL: String,
     linkedinURL: String,
     AmountRaised:{
          type:Number,
          default:0,
        },
     updates: [{
          text: String
     }],
     comments: String,
     campaignTeam: [{

          legalFirstname: {
               type: String,
               // required:true
          },
          legalLastname: {
               type: String,
               // required:true
          },
          dateofbirth: {
               type: Date,
               // required:true
          },
          phonenumber: {
               type: Number,
               // required:true
          },
          country: {
               type: String,
               // required:true
          },
          streetAddress: {
               type: String,
               // required:true
          },
          extraAddress: {
               type: String,
               // required:true
          },
          supportEmailaddress: String,
          newTeammemberemail: String,

     }],
     youtubeURL: {
          type: String,

     },


     // uploadImage:String,
     // videooverlayimg:String,
     // fundingType:{
     //      type:String,
     //      enum:['Fixible Funding',"Fixed Funding"]
     // },
     FundingAmount: {
          type: Number,
          default: 0
          // required:true
     },
     // countryoflegalresidence:{
     //      countryname:String,
     //      BankAccountCountry:String
     // },
     // customerBillingStatement:{
     //      type:String,
     //      // required:true
     // },


     // draftcampaignlink:String,
     // facebookshareimage:String,
     // marketingimage:String,
     // customshorturl:String,
     // googleAnalytics:{
     //      trackingid:String
     // },
     // googleAdtracking:{
     //      conversionid:String,
     //      conversionlabel:String,
     //      remarketingid:String
     // },
     // facebookAdtracking:{
     //      Facebookpixelid:String
     // },
     // videosgallery:{
     //      youtubeorvimeourl:String
     // }




});

module.exports = mongoose.model("projects", ProjectSchema);