import mongoose from "mongoose";
import validator from "validator"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [3, " Name should not be less than 3 characters"]
    },
   
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "please Provide a valid email"]
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: [5, "username should not be less than 3 characters"]
    },
    phone: {
        type: String,
        required: true,
    },
    gender:{
        type:String,
        required: [true, "Gender is required"],
        enum: ["male", "female"]
    },
    password: {
        type: String,
        required: true,
        minLength: [6 , "Password should be at least 6 characters"],
        select: false
    },

})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.comparePassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}


const userModel = (mongoose.models.User) || (mongoose.model("User", userSchema))
export default userModel