import express from "express";
import { deleteTweet, getAllTweet, getTweet, postTweet, patchTweet } from "../Controllers/TweetController.js";
import { upload } from "../Middlewares/ImgValidation.js";
import passport from "passport";
export const tweet = express.Router();

tweet.use(passport.authenticate('jwt', { session: false }));

tweet.get("", getAllTweet);

tweet.get("/:id", getTweet);

tweet.post("", upload, postTweet);

tweet.patch("", patchTweet);

tweet.delete("", deleteTweet);

