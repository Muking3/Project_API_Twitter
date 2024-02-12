import Joi from "joi";
import { Users } from "../Models/model.js";
import crypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ExtractJwt, Strategy } from 'passport-jwt';

const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(8).max(30).required()
});

export const validate = (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).send(error.details);
    }
    next();
};

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
        let result = await crypt.compare(password, user.password)
            if (result) {
                return token;
            }
            else {
                return null;
            }
    }
    else {
        return null;
    }
}


const passportOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_KEY
};

export const jwtStrategy = new Strategy(passportOptions, (jwt_payload, done) => {
    const _id = jwt_payload._id;
    const Auth = Users.find(user => user._id == _id);
    if (!Auth) {
        done(new Error('User not found'), null);
    } else {
        delete Auth.password;
        done(null, Auth);
    }
});