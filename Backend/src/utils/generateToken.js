import jwt from "jsonwebtoken";

export async function signUserJWT(payload) {

    return await jwt.sign({ _id: payload }, process.env.JWT_USER_SECRET, {
        expiresIn: "7d"    
    })
}

export async function signPartnerJWT(payload) {
    
    return await jwt.sign({ _id: payload }, process.env.JWT_PARTNER_SECRET, {
        expiresIn: "7d"    
    })
}