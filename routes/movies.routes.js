import express from "express"
import { auth } from "../middleware/auth.js";
import { getMovies, getMoviesById, createMovies, deleteMovieById, updateMovieById } from "../services/movies.services.js";

const router = express.Router();  
//GET ALL
router.get("/", async function (request, response) {
  if (request.query.rating) {
    request.query.rating = +request.query.rating;
  }

  //Cursor - Pagination | Cursor-> Array | toArray()
  const movie = await getMovies(request);
  console.log(movie)
  response.send(movie);
});

//GET BY ID 
router.get("/:id", async function (request, response) {
  const { id } = request.params;

  //db.gopi.findOne{id:99}
  const movie = await getMoviesById(id)

  console.log(movie);
  movie ? response.send(movie) : response.status(404).send({ message: "Movie not found" });
});

//POST  
router.post("/", async function (request, response) {
  const data = request.body;
  console.log(data)
  const movie = await createMovies(data)
  response.send(movie);
});

//DELETE 
router.delete("/:id", async function (request, response) {
  const { id } = request.params;

  //db.gopi.findOne{id:99}
  const movie = await deleteMovieById(id)

  console.log(movie);
  movie.deletedCount > 0 ? response.send({ message: "Movie deleted successfully" }) : response.status(404).send({ message: "Movie not found" });
});

//UPDATE 
router.put("/:id", async function (request, response) {
  const { id } = request.params;
  const data = request.body;

  const movie = await updateMovieById(id, data)

  console.log(movie);
  response.send(movie);
});
   
export default router;

  