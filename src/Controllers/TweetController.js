import { v4 as uuidv4 } from 'uuid';
import { tweets, users } from '../Models/model.js';

export const getAllTweet = (req, res) => {
    if (req.query.userId) {
        const newTweets = tweets.filter((tweet) => req.query.userId == tweet.userId);
        return res.status(200).json(newTweets);
    }
    res.status(200).json(tweets);
}

export const getTweet = (req, res) => {
    const newTweets = tweets.filter((tweet) => req.params.id == tweet.id);
    res.status(200).json(newTweets);
}

export const postTweet = (req, res) => {
    const tweetBody = req.body.body.trim();
    if (tweetBody.length !== 0) {
        const newTweet = {
            userId: 3,
            id: uuidv4(),
            title: "Twitter_API",
            body: tweetBody,
            url: "http://localhost:8000/" + req.file.filename,
            like: 0,
            repost: 0
        };
        tweets.push(newTweet);
        return res.send("yes post");
    }
    res.send("no post");
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