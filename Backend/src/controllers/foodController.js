import { partnerModel } from "../models/partner.model.js";
import uploadImage from "../services/imagekit.service.js";
import foodModel from "../models/food.model.js";
import {v4 as uuid} from "uuid";

export const addFood = async (req, res) => {  
    let { name, description } = req.body;
    let userId = req.pId;
    
    try {  
        let result = await uploadImage(req.file.buffer, uuid());

        let newFood = await foodModel.create({
            name, description, video: result.url, owner: userId
        })

        if (!newFood) {
            throw new Error({message: "Unable to add new food on to list."});
        }

        res.send({message: "Food listing added successfully."});
    } catch (e) {
        return res.send({message: "Something wrong while uploading file", error: e.message});
    }

}

export const getFood = async (req, res) => {
    let allData = await foodModel.find({}).populate("owner");
    res.status(200).send(allData);
}