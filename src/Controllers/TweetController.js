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
}

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
        return res.send("dislike");
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
        return res.send("disrepost");
    };
    await prisma.repost.create({
        data: {
            postId: req.body.postId,
            authorId: req.user
        }
    });
    return res.send("repost");
};

export const deleteTweet = async (req, res) => {
    try {
        await Tweet.deleteTweet(req.params.id)
        res.status(200).send(true);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Une erreur est survenue lors de la récupération des données." });
    }
};