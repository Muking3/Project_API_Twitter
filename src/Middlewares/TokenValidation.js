import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const passportOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_KEY
};

export const jwtStrategy = new Strategy(passportOptions, async(jwtPayload, done) => {
    const id = jwtPayload.id;
    const user = await prisma.user.findUnique({
        where: {
            id: id
        }
    });
    console.log(user);
    if (!user) {
        done(new Error('User not found'), null);
    };
    done(null, user.id);
});