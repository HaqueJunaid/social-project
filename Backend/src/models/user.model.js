import {Schema, model} from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    }
})

userSchema.pre("save", async function() {
    if(this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
})

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

export const userModel = model("user", userSchema);