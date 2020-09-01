const mongoose = require("mongoose");
const { string } = require("@hapi/joi");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
     createdBy: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: false,
      },
     //  bigList:Number,
     campaigntitle:{
          type:String,
          // required:true
     },
     campaigntagline:{
          type:String,
          // required:true
     },
     campaigncardimage:{
          type:String,
          // required:true
     },
     location: {
          country: {
            type: String,
            // required: true,
          },
          stateAndCity: String,
        },
     selectCatergory:{
          type:String,
          // required:true
     },
     SubCatergory:{
          type:String,
          // required:true
     },
     campaignDuration:{
          type:Number
     },
     tags:{
          type:String,
          // required:true
     },
     
     story:{
          type:String,
          // required:true
     },
     faq:[
          {
               Question:String,
               Anwser:String
          }
     ],
     perk:[
          {
               visibility:{
                    type:String,
                    enum: ["Visible","Hidden"],
               },
               price:{
                    type:Number,
                    // required:true
               },
               retailprice:Number,
               title:{
                    type:String,
                    // required:true
               },
               includeditems:{
                    itemname:{
                    type:String,
                    // required:true
                    },
                    option:{
                         OptionName:String,
                         OptionSize:Number
                    }
               },
               Description:{
                    type:String,
                    // required:true
               },
               perk:String,
               Quantity:String,
               EstimateDeliverydate:Date,
               Shipping:{
                    Shippinglocation:String,
                    ShippingFee:String
               }


          }
     ],
     
     imagegallery:[{type:String}],
     facebookURL : String,
     twitterURL: String,
     linkedinURL: String,
     updates: [{type:String}],
     media: String,
     comments: String,
     phonenumber:{
          type:Number,
          // required:true
     },
     supportEmailaddress:String,
     campaignTeam:[
          {
          newTeammemberemail:String
          }
     ],
     // uploadImage:String,
     // videourl:{
     //      type:String,
     //      // required:true
     // },
     // videooverlayimg:String,
     // fundingType:{
     //      type:String,
     //      enum:['Fixible Funding',"Fixed Funding"]
     // },
     // campaigngoalAmountCurrency:{
     //      type:Number,
     //      // required:true
     // },
     // countryoflegalresidence:{
     //      countryname:String,
     //      BankAccountCountry:String
     // },
     // customerBillingStatement:{
     //      type:String,
     //      // required:true
     // },
     // legalFirstname:{
     //      type:String,
     //      // required:true
     // },
     // legalLastname:{
     //      type:String,
     //      // required:true
     // },
     // dateofbirth:{
     //      type:Date,
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
          // youtubeorvimeourl:String
     // },




});

module.exports = mongoose.model("projects", ProjectSchema);
