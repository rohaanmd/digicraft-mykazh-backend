const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname: { type:String,
    required: true
    },
    lastname: { type:String,
        },
    email: { type:String,
            required:true,
    },
    password: {
        type: String,
        required:true,
            
    },
    number: { 
        type: Number,   
},
picture: String,
});
module.exports = mongoose.model("User",UserSchema)