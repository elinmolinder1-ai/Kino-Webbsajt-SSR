//import jest-functions, supertest and the function who creates the express app.
import { describe, expect, test } from '@jest/globals';
import request from 'supertest';
import initApp from '../SSR/lib/app.js';

// Mock API that replaces the real API during the test
// When the app calls api.loadMovie(id), this fake function runs instead
const mockApi = {
  loadMovie: async (id) => ({
    data: {
      id,
      attributes: {
        title: "The Godfather",
      }
    }
  })
};

// Test that checks if the movie page shows the correct title
describe("Movie page", () => {
  test("shows correct movie title", async () => {
    
    // Start the Express app using the fake API
    const app = initApp(mockApi);

    // Make a request to the movie page /movies/12 // Supertest acts like a browser and calls the route
    const response = await request(app)
      .get("/movies/12")  
      .expect(200); // We expect the page to load successfully

    // Check that the HTML contains the movie title
    expect(response.text).toContain("The Godfather");
  });
});
