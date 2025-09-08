import { userModel } from "../models/user.model.js"
import { partnerModel } from "../models/partner.model.js"
import { signPartnerJWT, signUserJWT } from "../utils/generateToken.js";

// USER AUTH ENDPOINTS
export const userRegister = async (req, res) => {
    const {username, email, password} = req.body;

    let existingUser = await userModel.findOne({email});
    if (existingUser) {
        return res.status(409).json({message: "Email already exists"});
    }

    try {
        const newUser = new userModel({username, email, password});
        await newUser.save();
        
        let token = signUserJWT(newUser._id);

        res.cookie('sessionId', token, {
            maxAge: 7*24*60*60*1000, 
            httpOnly: true,
            secure: true
        });

        res.status(201).send({message: "User Created Successfully."});
    } catch (e) {
        return res.send({message: "Something went wrong", error: e.message});
    }

}
export const userLogin = async (req, res) => {
    const {email, password} = req.body;

    let isExists = await userModel.findOne({email});
    if (!isExists) {
        return res.status(401).send({message: "Invalid email or password"});
    }

    try {
        let isPasswordSame = await isExists.comparePassword(password);
        
        if (!isPasswordSame) {
            return res.status(401).send({message: "Something went wrong."});
        }

        let token = signUserJWT(isExists._id);

        res.cookie('sessionId', token, {
            maxAge: 7*24*60*60*1000, 
            httpOnly: true,
            secure: true
        });

        res.status(200).send({message: "Login Successfully"});
    } catch (e) {
        return res.status(401).send({message: "Something went wrong."});
    }
}
export const userLogout = async (req, res) => {
    res.clearCookie("sessionId");
    res.send({message: "Logging out."});
}

// FOOD PARTNER AUTH ENDPOINTS
export const partnerRegister = async (req, res) => {
    const {kitchenName, email, phone, password} = req.body;

    let existingPartner = await partnerModel.findOne({email});
    if (existingPartner) {
        return res.status(409).json({message: "Email already exists"});
    }

    try {
        const newPartner = new partnerModel({kitchenName, phone, email, password});
        await newPartner.save();
        
        let token = signPartnerJWT(newPartner._id);

        res.cookie('sessionId', token, {
            maxAge: 7*24*60*60*1000, 
            httpOnly: true,
            secure: true
        });

        res.status(201).send({message: "Food Partner Created Successfully."});
    } catch (e) {
        return res.status(409).send({message: "Something went wrong"});
    }

}
export const partnerLogin = async (req, res) => {
    const {email, password} = req.body;

    let isExists = await partnerModel.findOne({email});
    if (!isExists) {
        return res.status(401).send({message: "Invalid email or password"});
    }

    try {
        let isPasswordSame = await isExists.comparePassword(password);
        
        if (!isPasswordSame) {
            return res.status(200).send({message: "Something went wrong.", error: e.message});
        }

        let token = signPartnerJWT(isExists._id);

        res.cookie('sessionId', token, {
            maxAge: 7*24*60*60*1000, 
            httpOnly: true,
            secure: true
        });

        res.status(200).send({message: "Login Successfully"});
    } catch (e) {
        res.status(401).send({message: "Something went wrong.", error: e.message});
    }
}
export const partnerLogout = async (req, res) => {
    res.clearCookie("sessionId");
    res.send({message: "Logging out."});
}