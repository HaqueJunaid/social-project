import { Schema, model } from "mongoose";

const foodSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        lowercase: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    video: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.ObjectId,
        ref: "partner",
        required: true
    }
})

const foodModel = model("food", foodSchema);
export default foodModel;