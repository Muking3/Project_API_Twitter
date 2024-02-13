import { ExtractJwt, Strategy } from "passport-jwt";
import { Users } from "../Models/model.";

const passportOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_KEY
};

export const jwtStrategy = new Strategy(passportOptions, (jwtPayload, done) => {
    const _id = jwtPayload._id;
    const user = Users.find(user => user._id == _id);
    if (!user) {
        done(new Error('User not found'), null);
    };
    done(null, user._id);
});