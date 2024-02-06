import express from "express"
import { deleteTweet, getAllTweet, getTweet, postTweet, patchTweet, putTweet } from "../Controllers/TweetController.js"
export const tweet = express.Router()

tweet.get("", getAllTweet)

tweet.get("/:id", getTweet)

tweet.post("", postTweet)

tweet.put("/:id", putTweet)

tweet.patch("", patchTweet)

tweet.delete("/:id", deleteTweet)

