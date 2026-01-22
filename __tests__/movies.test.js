
import { describe, expect, test } from '@jest/globals';
import request from 'supertest';
import initApp from '../src/app.js';

const mockApi = {
  loadMovie: async (id) => {
    return {
      "data": {
        "id": id,
        "attributes": {
          "title": "The Godfather",
          "imdbId": "tt0068646",
          "intro": "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.\n\n",
          "image": {
            "url": "https://m.media-amazon.com/images/M/MV5BNGEwYjgwOGQtYjg5ZS00Njc1LTk2ZGEtM2QwZWQ2NjdhZTE5XkEyXkFqcGc@._V1_.jpg"
          },
          "createdAt": "2026-01-15T13:27:00.409Z",
          "updatedAt": "2026-01-15T13:30:26.154Z",
          "publishedAt": "2026-01-15T13:27:05.498Z"
        }
      },
    };
  },
  loadMovies: async () => {
    return {
      "data": [
        {
          "id": 12,
          "attributes": {
            "title": "The Godfather",
            "imdbId": "tt0068646",
            "intro": "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.\n\n",
            "image": {
              "url": "https://m.media-amazon.com/images/M/MV5BNGEwYjgwOGQtYjg5ZS00Njc1LTk2ZGEtM2QwZWQ2NjdhZTE5XkEyXkFqcGc@._V1_.jpg"
            },
            "createdAt": "2026-01-15T13:27:00.409Z",
            "updatedAt": "2026-01-15T13:30:26.154Z",
            "publishedAt": "2026-01-15T13:27:05.498Z"
          }
        },
        {
          "id": 2,
          "attributes": {
            "title": "Encanto",
            "imdbId": "tt2953050",
            "intro": "A Colombian teenage girl has to face the frustration of being **the only member of her family** without magical powers.\n\n",
            "image": {
              "url": "https://m.media-amazon.com/images/M/MV5BOTY1YmU1ZTItMzNjZC00ZGU0LTk0MTEtZDgzN2QwOWVlNjZhXkEyXkFqcGc@._V1_.jpg"
            },
            "createdAt": "2023-01-23T06:46:24.765Z",
            "updatedAt": "2025-01-15T10:41:46.386Z",
            "publishedAt": "2023-01-23T06:46:29.324Z"
          }
        },
      ],
      "meta": {
        "pagination": {
          "page": 1,
          "pageSize": 25,
          "pageCount": 1,
          "total": 11
        }
      }
    }
  },
};

describe('Movie list page', () => {
  test('lists movies from API', async () => {
    const app = initApp(mockApi);

    const response = await request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200);

    expect(response.text).toContain('Encanto');
    expect(response.text).toContain('The Godfather');
  });
});









/* //Add testing setup: install Jest, Supertest and cross-env for integration tests



//__tests__/movies.test.js
import request from "supertest";
import { app, server } from "../server.js";

// 1. Verifies that a movie page shows the correct title.
describe("Integrationstest för filmsidor", () => {
  it("Visa rätt titel för en film", async () => {

    // 2. Fetch movies from API (JSON response
    // Gets an array with all movies, take first element in the array.
    const apiRes = await fetch("https://plankton-app-xhkom.ondigitalocean.app/api/movies");
    const json = await apiRes.json();
    const movies = json.data;
    const firstMovie = movies[0];

    // 3. Using supertest to call SSR-route (movies: movieID)
    const res = await request(app).get(`/movies/${firstMovie.id}`);

    // 4. Checks that the HTML response contains the movie title 
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain(firstMovie.attributes.title);
  });
});

// 5. Close server after test.
afterAll(() => {
  server.close();
});
 */