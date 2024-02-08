import express from "express"
import { tweet } from "./src/Routes/TweetRoute.js"
import path from "path"
import { fileURLToPath } from 'url'

const app = express()
const port = process.env.PORT || 3000
app.use(express.json())

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/twitter/post", tweet)
app.use(express.static(path.join(__dirname, "images")))

app.listen(port, () => {
    console.log(`API en marche sur le port ${port}`)
})
