import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllTweet = async (req, res) => {
    if (req.query.authorId) {
        const TweetUser = await prisma.post.findMany({
            where: {
                authorId: req.query.authorId
            },
            include: { Like: true }
        });
        return res.status(200).json(TweetUser);
    }
    const TweetUser = await prisma.post.findMany();
    res.status(200).json(TweetUser);
}

export const getTweet = async (req, res) => {
    const tweet = await prisma.post.findUnique({
        where: {
            id: req.params.id
        },
        include: { Like: true }
    });
    res.status(200).json(tweet);
}

export const postTweet = async (req, res) => {
    const tweetBody = req.body.content.trim();
    if (tweetBody.length > 255)
        return res.send("nombre de text superiere a 255");
    await prisma.post.create({
        data: {
            content: tweetBody,
            url: `http://localhost:${process.env.PORT}/${req.file.filename}`,
            authorId: req.user,
        },
    });
    res.send("yes post");
}

export const patchTweet = async (req, res) => {
    const likes = await prisma.like.findMany({
        where: {
            postId: req.body.postId,
            authorId: req.user,
        },
    });
    if (likes.length) {
        await prisma.like.deleteMany({
            where: {
                postId: likes[0].postId,
                authorId: likes[0].authorId
            }
        });
        return res.send("DISLIKE");
    };
    await prisma.like.create({
        data: {
            postId: req.body.postId,
            authorId: req.user
        }
    });
    return res.send("LIKE");
};

export const deleteTweet = (req, res) => {

    // const newTweets = tweets.find((tweet) => req.body.id == tweet.id);
    // const index = tweets.indexOf(newTweets);
    // tweets.splice(index, 1);
    return res.send("yes delete");
};