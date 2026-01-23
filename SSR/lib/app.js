//Add homepage and movie routes, serve static files

import express from "express";
import { engine } from "express-handlebars";
import path from "path";

//Navigation menu items 
export const MENU = [
  { label: "Startsida", id: "movies", link: "/" },
  { label: "Alla filmer", id: "movies", link: "/movies" },
  { label: "Barnbio", id: "kids", link: "/kids" },
  { label: "Presentkort", id: "gift", link: "/gift" },
  { label: "Café & Bistro", id: "cafe", link: "/#cafe-bistro" },
  { label: "Event", id: "events", link: "/events" },
  { label: "Kundservice", id: "support", link: "/support" },
  { label: "Mina sidor", id: "profile", link: "/member-page" },
  { label: "Företag", id: "business", link: "/business" }
];

//Footer-links displayed at the bottom of the page
export const FOOTER = [
  { label: "Jobba hos oss", id: "work", link: "/" },
]

export default function initApp(api) {

  const app = express();

  // Configure Handlebars as the view engine
  app.engine("handlebars", engine());
  app.set("view engine", "handlebars");
  app.set("views", path.join(process.cwd(), "SSR", "templates"));

  // Serve index.html from /public as the homepage
  app.get("/", (req, res) => {
    res.sendFile("index.html", {
      root: path.join(process.cwd(), "public")
    });
  });

  //show all movies, makes code work with both strapi format and flattened arrays
app.get("/movies", async (req, res) => {
  const payload = await api.loadMovies();
  const arr = payload?.data ?? payload;         
  
  //flatten each movie object. If array exists, use that one, if not use empty array
  //Loop through each movie object and return a new object
  const movies = (arr ?? []).map(m => ({
    
    //keep the id and spread out all fields from m.attribute if it exists.
    id: m.id,
    ...(m.attributes ?? m), 
  }));

  res.render("all-movies", { movies, menu: MENU, footer: FOOTER });
});

app.get("/movies/:movieId", async (req, res) => {

  const payload = await api.loadMovie(req.params.movieId);
  const m = payload?.data ?? payload;
  const movie = {
    id: m.id,
    ...(m.attributes ?? m),
  };
  res.render("movie", { movie, menu: MENU });
});

  // Serve static files from /public and /scripts
  app.use(express.static("public"));
  app.use("/scripts", express.static("./scripts"));


  return app;
}






/* 
app.get("/movies/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const movie = await api.loadMovie(id);
    res.render("movie", { movie, menu: MENU });
  } catch (err) {
    console.error(err);
    res.status(404).send("Film ej hittad");
  }
}); */
