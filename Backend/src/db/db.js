import mongoose from "mongoose";

function connectToDb() {
    mongoose.connect(process.env.MONGO_URL)
        .then(() => console.log("Connected to DB"))
        .catch(e => console.log("Problem while connecting to DB"));
}

export default connectToDb