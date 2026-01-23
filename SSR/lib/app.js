//Add homepage and movie routes, serve static files

import express from "express";
import { engine } from "express-handlebars";
import path from "path";

// Meny-array
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


export default function initApp(api) {
  const app = express();

  app.engine("handlebars", engine());
  app.set("view engine", "handlebars");
  app.set("views", path.join(process.cwd(), "SSR", "templates"));

  //Get index.html to be the "home page"
  app.get("/", (req, res) => {
    res.sendFile("index.html", {
      root: path.join(process.cwd(), "public")
    });
  });

  //Path to all-movies handlebar
  app.get("/movies", async (req, res) => {
    const movies = await api.loadMovies();
    res.render("all-movies", { movies, menu: MENU });
  });

  /*Route to a movie
  app.get("/movies/:movieId", async (req, res) => {
    const movie = await api.loadMovie(req.params.movieId);
    res.render("movie", { movie, menu: MENU });
  });
*/

app.get("/movies", async (req, res) => {
  const payload = await api.loadMovies();
  const arr = payload?.data ?? payload;          // {data:[...]} eller [...]
  const movies = (arr ?? []).map(m => ({
   
    id: m.id,
    ...(m.attributes ?? m),    // Strapi-objekt eller flattenat
  }));
  res.render("all-movies", { movies });
});

app.get("/movies/:movieId", async (req, res) => {


  const payload = await api.loadMovie(req.params.movieId);
  const m = payload?.data ?? payload;
  const movie = {
    id: m.id,
    ...(m.attributes ?? m),
  };
  res.render("movie", { movie });
});

  //Path to my static files, in public
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
