import 'dotenv/config'
import express from "express";
import { tweet } from "./src/Routes/TweetRoute.js";
import path from "path";
import { fileURLToPath } from 'url';
import { user } from "./src/Routes/UserRoute.js";
import passport, { Passport } from "passport";
import session from "express-session";
import passportLocal from "passport-local";
import { jwtStrategy } from './src/Middlewar/UserValidation.js';

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(passport.initialize());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "images")));
app.use("/twitter/post", tweet);
app.use("/twitter/user", user);
app.use('*', (req, res) => res.sendStatus(404));
passport.use(jwtStrategy);

app.listen(port, () => {
    console.log(`API en marche sur le port ${port}`);
});
