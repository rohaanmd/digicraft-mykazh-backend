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
   verification:{
    type: String,
    enum: ["approved","disapproved","NULL"]
    ,default:"NULL"
  },
   location: {
     type:String 
    },
    story: String,

    GoalAmount:Number,
    cardImage:String,

    ngoCreater:String,
    creatorbio:String,
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        // required: true,
      },


},{timestamp:true});
// Compile model from schema
module.exports  = mongoose.model('Ngo', ngo);