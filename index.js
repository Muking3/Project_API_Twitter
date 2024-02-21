import 'dotenv/config'
import express from "express";
import { tweet } from "./src/Routes/TweetRoute.js";
import path from "path";
import { fileURLToPath } from 'url';
import { user } from "./src/Routes/UserRoute.js";
import passport from "passport";
import { jwtStrategy } from './src/Middlewares/TokenValidation.js';
import cors from "cors"
const app = express();
const port = process.env.PORT;
const corsOptions = {
    origin: 'http://localhost:5174/Project_clone_Twitter/',
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));
// app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "images")));
app.use("/twitter/post", tweet);
app.use("/twitter/user", user);
app.use('*', (req, res) => res.sendStatus(404));
passport.use(jwtStrategy);

app.listen(port, () => {
    console.log(`API en marche sur le port ${port}`)
});
