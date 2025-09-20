import jwt from "jsonwebtoken";

export async function checkPartner(req, res, next) {

    let { sessionId } = req.cookies;

    try {

        if (!sessionId) {
            console.log("4");
            return res.send({ message: "Unauthorized", error: e.message });

        }

        let payload = jwt.verify(sessionId, process.env.JWT_PARTNER_SECRET);

        req.pId = payload._id;

        next();
    } catch (e) {
        return res.send({ message: "Unauthorized", error: e.message });
    }
}