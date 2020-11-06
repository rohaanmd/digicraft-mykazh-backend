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
           url:{
            secure_url: String,
            public_id: String
          },
       }
   ],
   location: {
     type:String 
    },
    verification:{
        type: String,
        enum: ["approved","disapproved","NULL"]
        ,default:"NULL"
      },
    cardImage:{
        secure_url: String,
        public_id: String
      },
    story: String,
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        // required: true,
      },

},{timestamp:true});
// Compile model from schema
module.exports  = mongoose.model('Others', others);