import { tweets } from "../Models/model"

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
    const tweetId = tweets[tweets.length - 1].id
    const tweetBody = req.body.body.trim()
    if (tweetBody.length !== 0) {
        const newTweet = {
            userId: 3,
            id: tweetId + 1,
            title: "Twitter_API",
            body: tweetBody,
            url: "https://via.placeholder.com/600/d32776",
            thumbnailUrl: "https://via.placeholder.com/150/d32776",
            like: 0,
            repost: 0
        }
        tweets.push(newTweet)
        return res.send("yes")
    }
    res.send("no")
}

export const putTweet = (req, res) => {
    const newTweets = tweets.filter((tweet) => req.params.id == tweet.id)
    res.status(200).json(newTweets)
}

export const deleteTweet = (req, res) => {
    if (req.body.text.length !== 0) {
        return res.send("ok")
    }
    res.send("no")
}
