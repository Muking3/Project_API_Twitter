import { tweets, users } from '../Models/model.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllTweet = async (req, res) => {
    if (req.query.authorId) {
        const TweetUser = await prisma.post.findMany({
            where: {
                authorId: req.query.authorId
            }
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
        }
    });
    res.status(200).json(tweet);
}

export const postTweet = async (req, res) => {
    const tweetBody = req.body.content.trim();
    if (tweetBody.length > 255)
        return res.send("nombre de text superiere a 255");
    const post = await prisma.post.create({
        data: {
            content: tweetBody,
            url: `http://localhost:${process.env.PORT}/${req.file.filename}`,
            authorId: req.user,
        },
    });
    res.send("yes post");
}

export const patchTweet = (req, res) => {
    const newTweets = tweets.find((tweet) => req.body.id == tweet.id);
    const user = users.find(user => req.body.userId == user.userId && req.body.id == user.id);
    const index = users.indexOf(user);
    if (!user) {
        newTweets.like += 1
        users.push({
            userId: req.body.userId,
            id: req.body.id
        });
        return res.send("yes patch +1");
    }
    newTweets.like -= 1;
    users.splice(index, 1);
    return res.send("yes patch -1");
}

export const deleteTweet = (req, res) => {
    const newTweets = tweets.find((tweet) => req.body.id == tweet.id);
    const index = tweets.indexOf(newTweets);
    tweets.splice(index, 1);
    return res.send("yes delete");
}