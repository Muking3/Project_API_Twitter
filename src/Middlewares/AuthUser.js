import crypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const authenticateUser = async (email, password) => {
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    });
    if (!email || !password) {
        return null;
    }
    else if (user) {
        const token = jwt.sign(
            {
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                id: user.id
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