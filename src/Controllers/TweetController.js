import { PrismaClient } from '@prisma/client';
import { Tweet } from '../Models/Tweetmodels.js';

const prisma = new PrismaClient();

export const getAllTweet = async (req, res) => {
    try {
        const TweetUser = await Tweet.getAllTweet(req.query.authorId)
        res.status(200).json(TweetUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Une erreur est survenue lors de la récupération des données." });
    }
    // if (req.query.authorId) {
    //     const TweetUser = await prisma.post.findMany({
    //         where: {
    //             authorId: req.query.authorId
    //         },
    //         include: { like: true }
    //     });
    //     return res.status(200).json(TweetUser);
    // }
    // const TweetUser = await prisma.post.findMany({
    //     orderBy: {
    //         createdAt: 'desc',
    //     },
    //     include: { like: true }
    // });
    // res.status(200).json(TweetUser);
}

// export const getOneTweet = async (req, res) => {
//     const tweet = await prisma.post.findUnique({
//         where: {
//             id: req.params.id
//         },
//         include: { like: true }
//     });
//     res.status(200).json(tweet);
// }

export const getOneTweet = async (req, res) => {
    try {
        const tweet = await Tweet.getOneTweet(req.params.id)
        console.log(tweet);
        res.status(200).json(tweet);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Une erreur est survenue lors de la récupération des données." });
    }
}

// export const postTweet = async (req, res) => {
//     const tweetBody = req.body.content.trim();
//     if (tweetBody.length > 255)
//         return res.send("nombre de text superiere a 255");
//     await prisma.post.create({
//         data: {
//             content: tweetBody,
//             url: `http://localhost:${process.env.PORT}/${req.file.filename}`,
//             authorId: req.user,
//         },
//     });
//     res.send("yes post");
// }

export const postTweet = async (req, res) => {
    const tweetBody = req.body.content.trim();
    if (tweetBody.length > 100)
        return res.status(400).send("La requête est incorrecte ou mal formée.");
    try {
        Tweet.postTweet(tweetBody, req.file.filename, req.user)
        res.status(200).send(true);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Une erreur est survenue lors de la récupération des données." });
    }
}

export const likeTweet = async (req, res) => {
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
        return res.send("DISlike");
    };
    await prisma.like.create({
        data: {
            postId: req.body.postId,
            authorId: req.user
        }
    });
    return res.send("like");
};

export const repostTweet = async (req, res) => {
    const reposts = await prisma.repost.findMany({
        where: {
            postId: req.body.postId,
            authorId: req.user,
        },
    });
    if (reposts.length) {
        await prisma.repost.deleteMany({
            where: {
                postId: reposts[0].postId,
                authorId: reposts[0].authorId
            }
        });
        return res.send("DISrepost");
    };
    await prisma.repost.create({
        data: {
            postId: req.body.postId,
            authorId: req.user
        }
    });
    return res.send("repost");
};

export const deleteTweet = (req, res) => {

    // const newTweets = tweets.find((tweet) => req.body.id == tweet.id);
    // const index = tweets.indexOf(newTweets);
    // tweets.splice(index, 1);
    return res.send("yes delete");
};