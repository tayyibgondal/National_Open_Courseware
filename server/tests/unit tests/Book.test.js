const request = require("supertest");
const app = require("../../index");
const Book = require("../../models/Book");

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

// =================== Testing the PUT unit =======================
describe("PUT /library/edit/:bookId", () => {
  let bookId;

  beforeAll(async () => {
    // Create a book in the database and store its ID
    const newBook = new Book({
      title: "Test Book",
      summary: "Test Summary",
      author: "Test Author",
      userId: "658964aeacfe9dbdb12ad5f1",
    });
    const createdBook = await newBook.save();
    bookId = createdBook._id;
  });

  afterAll(async () => {
    // Clean up: Delete the created book after tests
    await Book.findByIdAndDelete(bookId);
  });

  it("should update a book and return status code 200", async () => {
    const updatedBookData = {
      title: "Updated Book Title",
      summary: "Updated Book Summary",
      author: "Updated Book Author",
    };

    // Send a PUT request to update the book
    const response = await request(app)
      .put("/library/edit/" + bookId)
      .field("title", updatedBookData.title)
      .field("summary", updatedBookData.summary)
      .field("author", updatedBookData.author);

    // Check the status code and response body
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Post updated!");
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

// =================== Testing the DELETE unit =======================
describe("DELETE /library/delete/:bookId", () => {
  let bookId;

  beforeAll(async () => {
    // Create a book in the database and store its ID
    const newBook = new Book({
      title: "Test Book",
      summary: "Test Summary",
      author: "Test Author",
    });
    const createdBook = await newBook.save();
    bookId = createdBook._id;
  });

  afterAll(async () => {
    // Clean up: Delete the created book after tests
    await Book.findByIdAndDelete(bookId);
  });

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

// =================== Testing the SEARCH unit =======================
describe("GET /library/search/:query", () => {
  let bookId;

  // Before all hook to create a book in the database
  beforeAll(async () => {
    const newBook = new Book({
      title: "Test Book",
      summary: "Test Summary",
      author: "Test Author",
      userId: "658964aeacfe9dbdb12ad5f1",
    });
    const createdBook = await newBook.save();
    bookId = createdBook._id;
  });

  // After all hook to delete the created book from the database
  afterAll(async () => {
    await Book.findByIdAndDelete(bookId);
  });

  // Test case to search for a book
  it("should return status code 200 and search results if query matches", async () => {
    // Define the search query
    const query = "Test Book";

    // Send a GET request to search for the book
    const response = await request(app).get(`/library/search/${query}`);

    // Check the status code and response body
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0); // Ensure search results are returned
  });

  // Test case to handle no search results found
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
