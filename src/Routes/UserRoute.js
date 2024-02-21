import express from "express";
import { getAllUser, postUser, getUser, postAuth, getProfile } from "../Controllers/UserController.js";
import { AccountVerify } from "../Middlewares/AccountValidation.js";
import passport from "passport";

export const user = express.Router();

user.post("", AccountVerify, postUser);

user.post('/authenticate', postAuth);

user.get("", (req, res) => { 
    res.send('hello')
})

user.use(passport.authenticate('jwt', { session: false }));

user.get("", getAllUser);

user.get('/profile', getProfile);

user.get("/:id", getUser);



