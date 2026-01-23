//mappers.js convert Strapi’s API data into clean, easy‑to‑use objects for your Handlebars templates.
export function mapMovie(m) {
  const movie = m?.data ?? m;

  return {
    id: movie.id,
    ...(movie.attributes ?? movie)
  };
}

export function mapMovies(arr) {
  const list = arr?.data ?? arr ?? [];

  return list.map(m => mapMovie(m));
}
