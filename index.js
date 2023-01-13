// const express = require("express"); // "type": "commonjs"
import express from "express"; // "type": "module"
import { MongoClient } from "mongodb";
import * as dotenv from 'dotenv'  
import moviesRouter from "./routes/movies.routes.js" 
import userRouter from "./routes/user.routes.js" 
import cors from "cors"


dotenv.config() 

console.log(process.env.MONGO_URL)

const app = express(); 
const PORT = process.env.PORT;//auto assign port

//Connnection
// const MONGO_URL="mongodb://127.0.0.1";
const MONGO_URL=process.env.MONGO_URL; 

const client=new MongoClient(MONGO_URL);
await client.connect();//toplevel await
console.log("Mongo is connected") 

//middleware-express.json is to convert- JSON-> JS
app.use(express.json());
app.use(cors());

app.get("/", function (request, response) {
  response.send("Hello 🙋‍♂️, 🌏 🎊✨🤩");
});

app.use("/movie", moviesRouter)
app.use("/user", userRouter)
 
app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));


export {client};