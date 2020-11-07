const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CharitySchema = new Schema({
createdBy: {
     type: Schema.Types.ObjectId,
     ref: "User",
     //  required: true,
},
title: String,
Picture:{
     secure_url: String,
     public_id: String
   },
VideoAppeal:{
     secure_url: String,
     public_id: String
   },
PatientsAge:Number,
GoalAmount:{
     type:Number,
     // required:true
},
PatientsName:{
     type:String,
     // required:true
},
PatientsGender:{
     type:String,
     enum:["male","Female","Transgender"],
     // required:true
},
MedicalCon:{
     type:String,
     // required:true
},
Story:String,
CustSrtLink:{
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
AmountRaised:{
     type:Number,
     default:0,
   },
   update:[{type:String}],
docs:{
     MedEsti:{
         fileUrl : {
          secure_url: String,
          public_id: String
        },
     },
     LetFrmPatie:{
         fileUrl : {
          secure_url: String,
          public_id: String
        },
     },
     MedRep: { 
         fileUrl : {
          secure_url: String,
          public_id: String
        },
     },
 
 },
 verification:{
     type: String,
     enum: ["approved","disapproved","NULL"],
     default:"NULL"
   },
 cardImage:{
     secure_url: String,
     public_id: String
   },
 


},{timestamps:true});

module.exports = mongoose.model("charity", CharitySchema);
