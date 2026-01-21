//Add homepage and movie routes, serve static files

import express from "express";
import { engine } from "express-handlebars";
import path from "path";




export default function initApp(api) {
  const app = express();

  app.engine("handlebars", engine());
  app.set("view engine", "handlebars");
  app.set("views", path.join(process.cwd(), "SSR", "templates"));


//Get index.html to be the "home page"
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: path.join(process.cwd(), "public") });
});

//Path to all-movies 
app.get("/movies", async (req, res) => {
  const movies = await api.loadMovies();
  res.render("all-movies", { movies });
});
  //Path to my static files, in public
  app.use(express.static("public"));
  app.use("/scripts", express.static("./scripts"));
  app.use("/src", express.static("./src"));





  return app;
}