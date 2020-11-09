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
    country: {
      type: String,
      // required: true,
    },
    stateAndCity: String,
  },
    verification:{
        type: String,
        enum: ["approved","disapproved","NULL"]
        ,default:"NULL"
      },
      customContent:[{
        input: String,
       textarea: String,
      image:[{
        secure_url: String,
        public_id: String
        }]}],
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
      AmountRaised:{
        type:Number,
        default:0,
      },

},{timestamp:true});
// Compile model from schema
module.exports  = mongoose.model('Others', others);