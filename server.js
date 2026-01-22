import initApp from "./SSR/lib/app.js";
import api from './SSR/lib/movies.js';

export const app = initApp(api);

export const server = app.listen(5080, () => {
  console.log("Servern kör på http://localhost:5080");
});
