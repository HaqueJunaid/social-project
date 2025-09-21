import {Schema, model} from "mongoose";
import bcrypt from "bcrypt";

const partnerSchema = new Schema({
    kitchenName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true,
        trim: true,
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
    },
    followers: [{
        type: Schema.Types.ObjectId,
        ref: "user",
        default: []
    }],
    following: [{
        type: Schema.Types.ObjectId,
        ref: "partner",
        default: []
    }],
})

partnerSchema.pre("save", async function() {
    if(this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
})

partnerSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

export const partnerModel = model("partner", partnerSchema);