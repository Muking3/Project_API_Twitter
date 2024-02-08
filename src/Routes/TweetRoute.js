import express from "express"
import { deleteTweet, getAllTweet, getTweet, postTweet, patchTweet } from "../Controllers/TweetController.js"
import { upload } from "../Controllers/multer.js"
export const tweet = express.Router()

tweet.get("", getAllTweet)

tweet.get("/:id", getTweet)

tweet.post("", upload, postTweet)

tweet.patch("", patchTweet)

tweet.delete("", deleteTweet)
