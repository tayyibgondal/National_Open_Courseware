const request = require("supertest");
const app = require("../../index");
const Book = require("../../models/Book");

describe("Integration Tests: Library Endpoints", () => {
  let bookId;

  // Test GET /library endpoint
  describe("GET /library", () => {
    it("should return status code 200 and an array of books", async () => {
      const response = await request(app).get("/library");
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  // Test POST /library/create endpoint
  describe("POST /library/create", () => {
    it("should create a new book and return status code 200", async () => {
      // Mock data for the new book
      const newBookData = {
        title: "HEHE Tips 101",
        summary: "Test Summary",
        author: "Test Author",
        userId: "658964aeacfe9dbdb12ad5f1",
      };

      // Send a POST request to create a new book
      const response = await request(app)
        .post("/library/create")
        .send(newBookData);

      // Check the status code and response body
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Book added!");

      // Store the created book's ID for later use in other tests
      bookId = response.body.book._id;
    });

    it("should return status code 500 if an error occurs", async () => {
      // Mock data with missing required fields to trigger an error
      const invalidBookData = {};

      // Send a POST request with invalid data
      const response = await request(app).post("/library/create");

      // Check if the response has status code 500
      expect(response.status).toBe(500);
    });
  });

  // Test PUT /library/edit/:bookId endpoint
  describe("PUT /library/edit/:bookId", () => {
    it("should update a book and return status code 200", async () => {
      const updatedBookData = {
        title: "HEHE Tips 101",
        summary: "Updated Book Summary",
        author: "Updated Book Author",
      };

      // Send a PUT request to update the book
      const response = await request(app)
        .put(`/library/edit/${bookId}`)
        .send(updatedBookData);

      // Check the status code and response body
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Book updated!");

      // Check if the book is correctly updated in the database
      const updatedBook = await Book.findById(bookId);
      expect(updatedBook.title).toBe(updatedBookData.title);
      expect(updatedBook.summary).toBe(updatedBookData.summary);
      expect(updatedBook.author).toBe(updatedBookData.author);
    });

    it("should return status code 500 if an error occurs", async () => {
      // Send a PUT request with invalid data to trigger an error
      const response = await request(app).put(`/library/edit/123`);

      // Check if the response has status code 500
      expect(response.status).toBe(500);
    });
  });

  // Test GET /library/search/:query endpoint
  describe("GET /library/search/:query", () => {
    it("should return status code 200 and search results if query matches", async () => {
      // Define the search query
      const query = "HEHE Tips";

      // Send a GET request to search for the book
      const response = await request(app).get(`/library/search/${query}`);

      // Check the status code and response body
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0); // Ensure search results are returned
    });

    it("should return status code 404 if no results found", async () => {
      // Define a query that won't match any book
      const query = "XAOIKSAJJAOSUIHRKSAN";

      // Send a GET request to search for a nonexistent book
      const response = await request(app).get(`/library/search/${query}`);

      // Check the status code and response body
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("No results found");
    });
  });

  // Test DELETE /library/delete/:bookId endpoint
  describe("DELETE /library/delete/:bookId", () => {
    it("should delete a book and return status code 200", async () => {
      // Send a DELETE request to delete the book
      const response = await request(app).delete(`/library/delete/${bookId}`);

      // Check the status code and response body
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Deleted successfully");

      // Check if the book is deleted from the database
      const deletedBook = await Book.findById(bookId);
      expect(deletedBook).toBeNull();
    });

    it("should return status code 500 if book not found", async () => {
      // Send a DELETE request with an invalid ID to trigger a 500 response
      const response = await request(app).delete(`/library/delete/invalidId`);

      // Check if the response has status code 500
      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Internal server error!");
    });
  });
});
