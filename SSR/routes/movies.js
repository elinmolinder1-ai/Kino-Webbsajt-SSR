//routes/movies.js = definierar de faktiska routes för filmer

import express from "express";
import {mapMovie, mapMovies} from "../lib/mappers.js";
import {MENU, FOOTER } from '../lib/constants.js';

export default function movieRoutes(api) {
  const router = express.Router();

  // All movies
  router.get("/", async (req, res) => {
    const payload = await api.loadMovies();
    const movies = mapMovies(payload);
    res.render("all-movies", { movies, menu: MENU, footer: FOOTER });
  });

  // Single movie
  router.get("/:movieId", async (req, res) => {
    const payload = await api.loadMovie(req.params.movieId);
    const movie = mapMovie(payload);
    res.render("movie", { movie, menu: MENU });
  });

  return router;
}
