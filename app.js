import express from 'express'
import apirouter from './route/auth/index.js'
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
import postRouter from './route/post/index.js';

const app = express()
dotenv.config()
const port = process.env.PORT || 8080;


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/api", apirouter)
app.use("/api/posts", postRouter)


app.listen(port);
console.log('Server started at http://localhost:' + port);