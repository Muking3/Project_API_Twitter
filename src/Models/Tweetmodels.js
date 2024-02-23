import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const Tweet = {
    getAllTweet: async (authorId) => {
        let TweetUser
        if (authorId) {
            return TweetUser = await prisma.post.findMany({
                where: {
                    authorId: authorId
                },
                include: { like: true }
            });
        }
        else {
            return TweetUser = await prisma.post.findMany({
                orderBy: {
                    createdAt: 'desc',
                },
                include: { like: true }
            });
        }
    },
    getOneTweet: async (id) => {
        return await prisma.post.findUnique({
            where: {
                id: id
            },
            include: { like: true }
        });
    },
    postTweet: async (text, file, user) => {
        return await prisma.post.create({
            data: {
                content: text,
                url: `http://localhost:${process.env.PORT}/${file}`,
                authorId: user,
            },
        });
    }
}


