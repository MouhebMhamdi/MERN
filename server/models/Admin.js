const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const Admin = mongoose.Schema({
    
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    Status:{
        type:Boolean,
        default:true
    },

    profilepic: {
        type: String,
        default: "https://www.cognite.com/hubfs/raw_assets/public/tc_custom/images/unknown_user.jpg"
    },
    password: {
        type: String,
        required: true
    
    },
    role:{
        type : String ,
        enum : ['ADMIN','USER'],
        required:true 
    }
},{ timestamps : true });

Admin.virtual('Password').set(function(Password){
    this.password = bcrypt.hashSync(Password,10)
})

Admin.methods = {
    authenticate : function(password){
        return bcrypt.compare(password,this.password)
    }
}

module.exports = mongoose.model('Admin', Admin);
