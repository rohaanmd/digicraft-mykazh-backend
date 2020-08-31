const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const others = new Schema({
   GoalAmount:{
       type: Number,
    
   },
   purpose:{
       type: String,
       
   },
   fundFor:{
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

},{timestamp:true});
// Compile model from schema
module.exports  = mongoose.model('Others', others);