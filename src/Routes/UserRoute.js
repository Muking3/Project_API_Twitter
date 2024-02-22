import express from "express";
import { getAllUser, postUser, getOneUser, postAuth, getProfile } from "../Controllers/UserController.js";
import { AccountVerify } from "../Middlewares/AccountValidation.js";
import passport from "passport";
import { upload } from "../Middlewares/ImgValidation.js";

export const user = express.Router();

user.post("", upload, AccountVerify, postUser);

user.post('/authenticate', postAuth);

user.use(passport.authenticate('jwt', { session: false }));

user.get("", getAllUser);

user.get('/profile', getProfile);

user.get("/:id", getOneUser);

