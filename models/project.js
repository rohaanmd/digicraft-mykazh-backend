const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
     compaigntitle:{
          type:String,
          required:true
     },
     compaigntagline:{
          type:String,
          required:true
     },
     compaigncardimage:{
          type:String,
          required:true
     },
     location:{
          type:String,
          required:true
     },
     catergory:{
          type:String,
          required:true
     },
     tags:{
          type:String,
          required:true
     },
     videourl:{
          type:String,
          required:true
     },
     videooverlayimg:String,
     story:{
          type:String,
          required:true
     },
     FAQ:[
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
                    required:true
               },
               retailprice:Number,
               title:{
                    type:String,
                    required:true
               },
               includeditems:{
                    itemname:{
                    type:String,
                    required:true
                    },
                    option:{
                         OptionName:String,
                         OptionSize:Number
                    }
               },
               Description:{
                    type:String,
                    required:true
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
     fundingType:{
          type:String,
          enum:['Fixible Funding',"Fixed Funding"]
     },
     campaigngoalAmountCurrency:{
          type:Number,
          required:true
     },
     countryoflegalresidence:{
          countryname:String,
          BankAccountCountry:String
     },
     customerBillingStatement:{
          type:String,
          required:true
     },
     legalFirstname:{
          type:String,
          required:true
     },
     legalLastname:{
          type:String,
          required:true
     },
     dateofbirth:{
          type:Date,
          required:true
     },
     phonenumber:{
          type:Number,
          required:true
     },
     country:{
          type:String,
          required:true
     },
     streetAddress:{
          type:String,
          required:true
     },
     supportEmailaddress:String,
     campaignTeam:{
          newTeammemberemail:String
     },
     draftcampaignlink:String,
     facebookshareimage:String,
     marketingimage:String,
     customshorturl:String,
     googleAnalytics:{
          trackingid:String
     },
     googleAdtracking:{
          conversionid:String,
          conversionlabel:String,
          remarketingid:String
     },
     facebookAdtracking:{
          Facebookpixelid:String
     },
     videosgallery:{
          youtubeorvimeourl:String
     },
     imagegallery:String







});

module.exports = mongoose.model("projects", ProjectSchema);
