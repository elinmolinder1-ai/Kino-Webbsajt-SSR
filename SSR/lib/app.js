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


  // Viktigt: denna först
   app.get("/movies", async (req, res) => {

    const movies = await api.loadMovies();
    res.render("all-movies", { movies, menu: MENU, footer: FOOTER });
  });

  // Sedan den dynamiska
  app.get("/movies/:movieId", async (req, res) => {
    const movie = await api.loadMovie(req.params.movieId);
    res.render("movie", { movie, menu: MENU, footer: FOOTER });
  });

  // Route that renders the member-page view
  app.get("/member", (req, res) => {
    res.sendFile("member-page.html", {
      root: path.join(process.cwd(), "public")
    });
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
