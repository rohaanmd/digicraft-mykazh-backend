const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ngo = new Schema({
   GoalAmount:{
       type: Number,
    
   },
   purpose:{
       type: String,
       
   },
   ngoName:{
       type: String
   },
   cause:{
       type: String
   },
   mediaLink:[
       {
           url:String,
       }
   ],
   location: {
     type:String 
    },
    story: String,
    ngoCreater:String,
    creatorbio:String


},{timestamp:true});
// Compile model from schema
module.exports  = mongoose.model('Ngo', ngo);