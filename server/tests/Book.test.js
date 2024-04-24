const request = require("supertest");
const app = require("../index");
const Book = require("../models/Book");

describe("GET /library", () => {
  it("should return status code 200 and an array of books", async () => {
    const response = await request(app).get("/library");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should populate uploader field with username", async () => {
    const response = await request(app).get("/library");
    expect(response.status).toBe(200);
    expect(
      response.body.every((book) => book.uploader && book.uploader.username)
    ).toBe(true);
  });
});

describe("POST /library/create", () => {
  it("should create a new book and return status code 200", async () => {
    // Mock data for the new book
    const newBookData = {
      title: "Test Book",
      summary: "Test Summary",
      author: "Test Author",
      userId: "658964aeacfe9dbdb12ad5f1",
    };

    // Send a POST request to create a new book
    const response = await request(app)
      .post("/library/create")
      .field("title", newBookData.title)
      .field("summary", newBookData.summary)
      .field("author", newBookData.author)
      .field("userId", newBookData.userId);

    // Check the status code and response body
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Book added!");

    // Check if the new book is correctly created in the database
    const createdBook = await Book.findOne({ title: newBookData.title });
    expect(createdBook).toBeTruthy();
    expect(createdBook.title).toBe(newBookData.title);
    expect(createdBook.summary).toBe(newBookData.summary);
    expect(createdBook.author).toBe(newBookData.author);
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
