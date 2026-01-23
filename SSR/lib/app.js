//app.js builds the Express application, configures the template engine, sets up the homepage, connects the movie routes, serves static files, and returns the finished app.
import express from "express";
import { engine } from "express-handlebars";
import path from "path";
import movieRoutes from "../routes/movies.js";

export default function initApp(api) {
  //Creates the Express app
  const app = express();

  // Handlebars setup - which engine to use, wheree the handlebars templates are located and how to render HTML pages
  app.engine("handlebars", engine());
  app.set("view engine", "handlebars");
  app.set("views", path.join(process.cwd(), "SSR", "templates"));

  // Homepage
  app.get("/", (req, res) => {
    res.sendFile("index.html", {
      root: path.join(process.cwd(), "public")
    });
  });

  // Movie routes
  app.use("/movies", movieRoutes(api));

  // Static files
  app.use(express.static("public"));
  app.use("/scripts", express.static("./scripts"));

  return app;
}