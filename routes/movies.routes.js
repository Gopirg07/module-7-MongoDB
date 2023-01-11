import express from "express"
import { client } from "../index.js ";

const router = express.Router(); 

  //GET ALL
router.get("/", async function (request, response) {
    if(request.query.rating){
      request.query.rating=+request.query.rating;
    }
  
    //Cursor - Pagination | Cursor-> Array | toArray()
    const movie=await client.db("gopi").collection("gopi").find(request.query).toArray();
    console.log(movie)  
    response.send(movie); 
    });
  
  //GET BY ID 
router.get("/:id", async function (request, response) {
       const {id}=request.params; 
  
      //db.gopi.findOne{id:99}
      const movie=await client.db("gopi").collection("gopi").findOne({id:id})
  
       console.log(movie);
       movie ? response.send(movie) : response.status(404).send({message:"Movie not found"});
    });
  //POST 

router.post("/",async function (request, response) {
      const data=request.body;
      console.log(data)
      const movie = await client.db("gopi").collection("gopi").insertMany(data)
      response.send(movie);
    });
  //DELETE

router.delete("/:id", async function (request, response) {
  const {id}=request.params; 
  
   //db.gopi.findOne{id:99}
   const movie=await client.db("gopi").collection("gopi").deleteOne({id:id})
  
    console.log(movie);
    movie.deletedCount>0 ? response.send({message:"Movie deleted successfully"}) : response.status(404).send({message:"Movie not found"});
  });
   
  //UPDATE

router.put("/:id", async function (request, response) {
    const {id}=request.params;    
    const data=request.body;   
  
    const movie=await client.db("gopi").collection("gopi").updateOne({id:id},{$set:data})
  
    console.log(movie);
    response.send(movie);
  });
   
export default router;
/*
// const express = require("express"); // "type": "commonjs"
import express from "express"; // "type": "module"
import { MongoClient } from "mongodb";
import * as dotenv from 'dotenv'  
import moviesRouter from "./routes/movies.routes.js" 

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

app.get("/", function (request, response) {
  response.send("Hello 🙋‍♂️, 🌏 🎊✨🤩");
});

app.use("/movies", moviesRouter)
 
app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));

export {client};*/