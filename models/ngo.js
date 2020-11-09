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
           url:{
            secure_url: String,
            public_id: String
          },
       }
   ],
   verification:{
    type: String,
    enum: ["approved","disapproved","NULL"]
    ,default:"NULL"
  },
  location: {
    country: {
      type: String,
      // required: true,
    },
    stateAndCity: String,
  },
  customContent:[{
    input: String,
   textarea: String,
  image:[{
    secure_url: String,
    public_id: String
    }]}],
    story: String,
    update:[{type:String}],
    docs:
         [
          {
            secure_url: String,
            public_id: String
            }
         ]
     ,
    GoalAmount:Number,
    cardImage:{
        secure_url: String,
        public_id: String
      },
      
      walletId:[{type:String}],
    ngoCreater:String,
    creatorbio:String,
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
module.exports  = mongoose.model('Ngo', ngo);