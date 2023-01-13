import { ObjectId } from "mongodb";
import { client } from "../index.js ";

export async function updateMovieById(id, data) {
    return await client.db("gopi").collection("gopi").updateOne({ _id:ObjectId(id) }, { $set: data });
}
export async function deleteMovieById(id) {
    return await client.db("gopi").collection("gopi").deleteOne({ _id:ObjectId(id) });
}
export async function createMovies(data) {
    return await client.db("gopi").collection("gopi").insertMany(data);
}
export async function getMoviesById(id) {
    return await client.db("gopi").collection("gopi").findOne({ _id:ObjectId(id) });
}
export async function getMovies(request) {
    return await client.db("gopi").collection("gopi").find(request.query).toArray();
}
