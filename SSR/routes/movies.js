//routes/movies.js = routes for movies 

import express from "express";
import {mapMovie, mapMovies} from "../lib/mappers.js";
import {
  MENU,
  FOOTER_ABOUT,
  FOOTER_OTHER,
  FOOTER_CONTACT,
  FOOTER_SOCIAL,
  FOOTER_NEWS 
} from '../lib/constants.js';

export default function movieRoutes(api) {
  const router = express.Router();

  // All movies
  router.get("/", async (req, res) => {
    const payload = await api.loadMovies();
    const movies = mapMovies(payload);
    res.render("all-movies", {      
      movies,
      menu: MENU,
      footerAbout: FOOTER_ABOUT,
      footerOther: FOOTER_OTHER,
      footerContact: FOOTER_CONTACT,
      footerSocial: FOOTER_SOCIAL,
      footerNews: FOOTER_NEWS });
  });

  // Single movie
  router.get("/:movieId", async (req, res) => {
    const payload = await api.loadMovie(req.params.movieId);
    const movie = mapMovie(payload);
    res.render("movie", {
      movie,
      menu: MENU,
      footerAbout: FOOTER_ABOUT,
      footerOther: FOOTER_OTHER,
      footerContact: FOOTER_CONTACT,
      footerSocial: FOOTER_SOCIAL,
    footerNews: FOOTER_NEWS});
  });


  return router;
}
