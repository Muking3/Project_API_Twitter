import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const User = {
    getAllUser: async () => {
        return await prisma.user.findMany({
            include: { posts: true }
        });
    },
    getOneUser: async (id) => {
        return await prisma.user.findUnique({
            where: {
                id: id
            }
        });
    },
    userExist: async (email) => {
        return await prisma.user.findUnique({
            where: {
                email: email
            }
        });
    },
    postUser: async (name, email, password, file, pseudo) => {
        return await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: password,
                pseudo: pseudo,
                url: `http://localhost:${process.env.PORT}/${file}`,
            },
        });
    }
}


