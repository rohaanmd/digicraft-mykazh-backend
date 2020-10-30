const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CharitySchema = new Schema({
createdBy: {
     type: Schema.Types.ObjectId,
     ref: "User",
     //  required: true,
},
title: String,
Picture:String,
VideoAppeal:{
     type:String,
     // required:true
},
PatientsAge:Date,
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
docs:{
     MedEsti:{
         fileUrl : String,
     },
     LetFrmPatie:{
         fileUrl : String,
     },
     MedRep: { 
         fileUrl : String,
     },
 
 },
 verification:{
     type: String,
     enum: ["approved","disapproved","NULL"],
     default:"NULL"
   },
 cardImage:String,
 


},{timestamps:true});

module.exports = mongoose.model("charity", CharitySchema);
