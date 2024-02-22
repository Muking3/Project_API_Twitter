import express from "express";
import { deleteTweet, getAllTweet, getOneTweet, postTweet, likeTweet, repostTweet } from "../Controllers/TweetController.js";
import { upload } from "../Middlewares/ImgValidation.js";
import passport from "passport";
export const tweet = express.Router();

tweet.use(passport.authenticate('jwt', { session: false }));

tweet.get("", getAllTweet);

tweet.get("/:id", getOneTweet);

tweet.post("", upload, postTweet);

tweet.patch("", likeTweet);

tweet.patch("", repostTweet);

tweet.delete("", deleteTweet);

