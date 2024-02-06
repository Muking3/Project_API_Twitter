import { v4 as uuidv4 } from 'uuid';
import { tweets, users } from '../Models/model.js';

export const getAllTweet = (req, res) => {
    if (req.query.userId) {
        const newTweets = tweets.filter((tweet) => req.query.userId == tweet.userId)
        return res.status(200).json(newTweets)
    }
    res.status(200).json(tweets)
}

export const getTweet = (req, res) => {
    console.log(req.params.id);
    const newTweets = tweets.filter((tweet) => req.params.id == tweet.id)
    res.status(200).json(newTweets)
}

export const postTweet = (req, res) => {
    const tweetBody = req.body.body.trim()
    if (tweetBody.length !== 0) {
        const newTweet = {
            userId: 3,
            id: uuidv4(),
            title: "Twitter_API",
            body: tweetBody,
            url: "https://via.placeholder.com/600/d32776",
            thumbnailUrl: "https://via.placeholder.com/150/d32776",
            like: 0,
            repost: 0
        }
        tweets.push(newTweet)
        return res.send("yes post")
    }
    res.send("no post")
}

export const patchTweet = (req, res) => {
    const newTweets = tweets.find((tweet) => req.body.id == tweet.id)
    const userid = users.find((user) => req.body.userId == user.userId)
    const index = users.indexOf(userid)
    if (!userid) {
        newTweets.like += 1
        users.push({ userId: req.body.userId })
        return res.send("yes patch +1")
    }
    newTweets.like -= 1
    users.splice(index, 1)
    return res.send("yes patch -1")
}

export const putTweet = (req, res) => {
    const newTweets = tweets.find((tweet) => req.params.id == tweet.id)
    const index = tweets.indexOf(newTweets)
    const tweetBody = req.body.body.trim()
    if (tweetBody.length !== 0) {
        const newTweet = {
            userId: newTweets.userId,
            id: parseInt(req.params.id),
            body: tweetBody,
        }
        tweets[index] = newTweet
        return res.send("yes put")
    }
    res.send("no post")
}

export const deleteTweet = (req, res) => {
    if (req.body.text.length !== 0) {
        return res.send("yes delete")
    }
    res.send("no delete")
}
