import { partnerModel } from "../models/partner.model.js";

export const addFood = async (req, res) => {  
    console.log(req.file);

    res.send({message: "Hello Dude"});
}