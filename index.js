import express from "express"
import { tweet } from "./src/Routes/TweetRoute.js"

const app = express()
const port = process.env.PORT || 3000
app.use(express.json())

app.use("/twitter/post", tweet)

app.listen(port, () => {
    console.log(`API en marche sur le port ${port}`)
})
