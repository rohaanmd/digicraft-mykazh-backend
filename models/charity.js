const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CharitySchema = new Schema({
Picture:String,
VideoAppeal:{
     type:String,
     required:true
},
PatientsAge:Date,
GoalAmount:{
     type:Number,
     required:true
},
PatientsName:{
     type:String,
     required:true
},
PatientsGender:{
     type:String,
     enum:["male","Female","Transgender"],
     required:true
},
MedicalCon:{
     type:String,
     required:true
},
Story:String,
CustSrtLink:{
     type:String,
     required:true
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
 


});

module.exports = mongoose.model("charity", CharitySchema);
