import { Users } from "../Models/model.js";
import crypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const authenticateUser = async (email, password) => {
    const user = Users.find(user => user.email == email)
    if (!email || !password) {
        return null;
    }
    else if (user) {
        const token = jwt.sign(
            {
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                _id: user._id
            },
            `${process.env.JWT_KEY}`
        )
        let result = await crypt.compare(password, user.password);
        if (result) {
            return token;
        }
        return null;
    }
    return null;
}