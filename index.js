// const express = require("express"); // "type": "commonjs"
import express from "express"; // "type": "module"
import { MongoClient } from "mongodb";
import * as dotenv from 'dotenv'  
import moviesRouter from "./routes/movies.routes.js" 
import userRouter from "./routes/user.routes.js" 
import cors from "cors"
import { auth } from "./middleware/auth.js";


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

const mobiles=[{
  model: "OnePlus 9 5G",
  img: "https://m.media-amazon.com/images/I/61fy+u9uqPL._SX679_.jpg",
  company: "Oneplus",
  },
  {
  model: "Iphone 13 mini",
  img: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-mini-blue-select-2021?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1645572315986",
  company: "Apple",
  },
  {
  model: "Samsung s21 ultra",
  img: "https://m.media-amazon.com/images/I/81kfA-GtWwL._SY606_.jpg",
  company: "Samsung",
  },
  {
  model: "Xiomi mi 11",
  img: "https://m.media-amazon.com/images/I/51K4vNxMAhS._AC_SX522_.jpg",
  company: "Xiomi",
  }
  ]
//mobiles.get
app.get("/mobiles",auth,async (request, response)=>{ 
  const mobiles = await client.db("gopi").collection("mobiles").find({}).toArray();
  response.send(mobiles);
});
//mobiles.post
app.post("/mobiles",async (request, response)=>{
  const data = request.body;
  console.log(data)
  const mobiles = await client.db("gopi").collection("mobiles").insertMany(data);
  response.send(mobiles);
});
 
app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));


export {client};