import initApp from "./SSR/lib/app.js";
import api from './SSR/lib/movies.js';

const app = initApp(api);

app.listen(5080, () => {
  console.log("Servern kör på http://localhost:5080");
});
