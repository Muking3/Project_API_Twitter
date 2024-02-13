import express from "express"
import { getAllUser, postUser, getUser, postAuth, getProfile } from "../Controllers/UserController.js";
import { validate } from "../Middlewar/UserValidation.js";
import "../Middlewar/UserValidation.js";
import passport from "passport";

export const user = express.Router();

user.get("", getAllUser);

user.get('/profile', passport.authenticate('jwt', { session: false }), getProfile);

user.get("/:id", getUser);

user.post("", validate, postUser);

user.post('/authenticate', postAuth)

