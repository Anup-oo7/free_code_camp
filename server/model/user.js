import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type: String,
    },
    email:{
        type: String,
        trim: true,
        lowercase: true
    },
    password:{
        type: String,
    },

    verified:{
        type:Boolean,
        default:false,
        required: true

    }
})

const user = mongoose.model('signup_user_details',userSchema)

export default user;