import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    confirmpassword:{
        type : String,
        required : true
    },
    profileimage:{
        type : String
    },
    isAdmin:{
        type : Boolean,
        default : false
    },
     isDelete:{
        type : Boolean,
        default : false
    }
});

const userModel = mongoose.model('users',userSchema)

export default userModel ; 