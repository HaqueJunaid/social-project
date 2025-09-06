import jwt from "jsonwebtoken";

export function signUserJWT(payload) {
    console.log(payload);

    return jwt.sign({ _id: payload }, process.env.JWT_USER_SECRET, {
        expiresIn: "7d"    
    })
}

export function signPartnerJWT(payload) {
    console.log(payload);

    return jwt.sign({ _id: payload }, process.env.JWT_PARTNER_SECRET, {
        expiresIn: "7d"    
    })
}