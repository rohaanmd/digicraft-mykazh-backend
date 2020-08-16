const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BusinessSchema = new Schema({
  title: {
      type: String,
      required: true
  },
about: {
    type: String,
    required: true
} ,
amountRequired: {
    type: Number,
      required: true
},
company:{
    type: String,
    required:true
},
imgUrl: {
    type: String,
      required:true
},
userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
}
})

module.exports = mongoose.model("business",BusinessSchema)