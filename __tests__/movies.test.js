import { describe, expect, test } from '@jest/globals';
import request from 'supertest';
import initApp from '../SSR/lib/app.js';

// Mock API som Express kommer använda
const mockApi = {
  loadMovie: async (id) => ({
    data: {
      id,
      attributes: {
        title: "The Godfather",
        intro: "Some intro text",
        image: { url: "https://example.com/poster.jpg" }
      }
    }
  })
};

describe("Movie page", () => {
  test("shows correct movie title", async () => {
    const app = initApp(mockApi);

    const response = await request(app)
      .get("/movies/12")   // <-- riktig route
      .expect(200);

    expect(response.text).toContain("The Godfather");
  });
});
