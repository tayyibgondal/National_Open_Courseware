const request = require("supertest");
const app = require("../../../index");
const Book = require("../../../models/Book");

// =====================================================
// =================== POST ============================
// =====================================================
describe("Title Equivalence Classes", () => {
  // Valid Title
  it("should create a new book with valid title and return status code 200", async () => {
    // Mock data for the new book with valid title
    const newBookData = {
      title: "The Great Gatsby",
      summary: "Test Summary",
      author: "Test Author",
      userId: "658964aeacfe9dbdb12ad5f1",
    };
    // Send a POST request to create a new book with valid title
    const response = await request(app)
      .post("/library/create")
      .field("title", newBookData.title)
      .field("summary", newBookData.summary)
      .field("author", newBookData.author)
      .field("userId", newBookData.userId);
    // Check the status code and response body
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Book added!");
  });

  // Invalid Title
  it("should return status code 500 if title is invalid", async () => {
    // Mock data with invalid title
    const newBookData = {
      title: "The @#$%^&*", // Invalid title
      summary: "Test Summary",
      author: "Test Author",
      userId: "658964aeacfe9dbdb12ad5f1",
    };
    // Send a POST request with invalid title
    const response = await request(app)
      .post("/library/create")
      .field("title", newBookData.title)
      .field("summary", newBookData.summary)
      .field("author", newBookData.author)
      .field("userId", newBookData.userId);
    // Check if the response has status code 500
    expect(response.status).toBe(500);
  });

  // Empty Title
  it("should return status code 500 if title is empty", async () => {
    // Mock data with empty title
    const newBookData = {
      title: "", // Empty title
      summary: "Test Summary",
      author: "Test Author",
      userId: "658964aeacfe9dbdb12ad5f1",
    };
    // Send a POST request with empty title
    const response = await request(app)
      .post("/library/create")
      .field("title", newBookData.title)
      .field("summary", newBookData.summary)
      .field("author", newBookData.author)
      .field("userId", newBookData.userId);
    // Check if the response has status code 500
    expect(response.status).toBe(500);
  });
});

// =====================================================
// =====================================================
describe("Summary Equivalence Classes", () => {
  // Valid Summary
  it("should create a new book with valid summary and return status code 200", async () => {
    // Mock data for the new book with valid summary
    const newBookData = {
      title: "The Great Gatsby",
      summary: "A classic novel by F. Scott Fitzgerald.",
      author: "Test Author",
      userId: "658964aeacfe9dbdb12ad5f1",
    };
    // Send a POST request to create a new book with valid summary
    const response = await request(app)
      .post("/library/create")
      .field("title", newBookData.title)
      .field("summary", newBookData.summary)
      .field("author", newBookData.author)
      .field("userId", newBookData.userId);
    // Check the status code and response body
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Book added!");
  });

  // Invalid Summary
  it("should return status code 500 if summary is invalid", async () => {
    // Mock data with invalid summary
    const newBookData = {
      title: "The Great Gatsby",
      summary: "", // Empty summary
      author: "Test Author",
      userId: "658964aeacfe9dbdb12ad5f1",
    };
    // Send a POST request with empty summary
    const response = await request(app)
      .post("/library/create")
      .field("title", newBookData.title)
      .field("summary", newBookData.summary)
      .field("author", newBookData.author)
      .field("userId", newBookData.userId);
    // Check if the response has status code 500
    expect(response.status).toBe(500);
  });

  // Empty Summary
  it("should return status code 500 if summary is empty", async () => {
    // Mock data with empty summary
    const newBookData = {
      title: "The Great Gatsby",
      summary: "", // Empty summary
      author: "Test Author",
      userId: "658964aeacfe9dbdb12ad5f1",
    };
    // Send a POST request with empty summary
    const response = await request(app)
      .post("/library/create")
      .field("title", newBookData.title)
      .field("summary", newBookData.summary)
      .field("author", newBookData.author)
      .field("userId", newBookData.userId);
    // Check if the response has status code 500
    expect(response.status).toBe(500);
  });
});

// =====================================================
// =====================================================
// Valid Author
it("should create a new book with valid author and return status code 200", async () => {
  // Mock data for the new book with valid author
  const newBookData = {
    title: "The Great Gatsby",
    summary: "Test Summary",
    author: "F. Scott Fitzgerald",
    userId: "658964aeacfe9dbdb12ad5f1",
  };
  // Send a POST request to create a new book with valid author
  const response = await request(app)
    .post("/library/create")
    .field("title", newBookData.title)
    .field("summary", newBookData.summary)
    .field("author", newBookData.author)
    .field("userId", newBookData.userId);
  // Check the status code and response body
  expect(response.status).toBe(200);
  expect(response.body.message).toBe("Book added!");
});

// Invalid Author
it("should return status code 500 if author is invalid", async () => {
  // Mock data with invalid author
  const newBookData = {
    title: "The Great Gatsby",
    summary: "Test Summary",
    author: "", // Empty author
    userId: "658964aeacfe9dbdb12ad5f1",
  };
  // Send a POST request with empty author
  const response = await request(app)
    .post("/library/create")
    .field("title", newBookData.title)
    .field("summary", newBookData.summary)
    .field("author", newBookData.author)
    .field("userId", newBookData.userId);
  // Check if the response has status code 500
  expect(response.status).toBe(500);
});

// Empty Author
it("should return status code 500 if author is empty", async () => {
  // Mock data with empty author
  const newBookData = {
    title: "The Great Gatsby",
    summary: "Test Summary",
    author: "", // Empty author
    userId: "658964aeacfe9dbdb12ad5f1",
  };
  // Send a POST request with empty author
  const response = await request(app)
    .post("/library/create")
    .field("title", newBookData.title)
    .field("summary", newBookData.summary)
    .field("author", newBookData.author)
    .field("userId", newBookData.userId);
  // Check if the response has status code 500
  expect(response.status).toBe(500);
});

// =====================================================
// =====================================================
// Valid UserID
it("should create a new book with valid user ID and return status code 200", async () => {
  // Mock data for the new book with valid user ID
  const newBookData = {
    title: "The Great Gatsby",
    summary: "Test Summary",
    author: "F. Scott Fitzgerald",
    userId: "658964aeacfe9dbdb12ad5f1", // Valid user ID
  };
  // Send a POST request to create a new book with valid user ID
  const response = await request(app)
    .post("/library/create")
    .field("title", newBookData.title)
    .field("summary", newBookData.summary)
    .field("author", newBookData.author)
    .field("userId", newBookData.userId);
  // Check the status code and response body
  expect(response.status).toBe(200);
  expect(response.body.message).toBe("Book added!");
});

// Invalid UserID
it("should return status code 500 if user ID is invalid", async () => {
  // Mock data with invalid user ID
  const newBookData = {
    title: "The Great Gatsby",
    summary: "Test Summary",
    author: "F. Scott Fitzgerald",
    userId: "invalidUserID", // Invalid user ID
  };
  // Send a POST request with invalid user ID
  const response = await request(app)
    .post("/library/create")
    .field("title", newBookData.title)
    .field("summary", newBookData.summary)
    .field("author", newBookData.author)
    .field("userId", newBookData.userId);
  // Check if the response has status code 500
  expect(response.status).toBe(500);
});

// Empty UserID
it("should return status code 500 if user ID is empty", async () => {
  // Mock data with empty user ID
  const newBookData = {
    title: "The Great Gatsby",
    summary: "Test Summary",
    author: "F. Scott Fitzgerald",
    userId: "", // Empty user ID
  };
  // Send a POST request with empty user ID
  const response = await request(app)
    .post("/library/create")
    .field("title", newBookData.title)
    .field("summary", newBookData.summary)
    .field("author", newBookData.author)
    .field("userId", newBookData.userId);
  // Check if the response has status code 500
  expect(response.status).toBe(500);
});

// ================================================================
// ============================== PUT =============================
// ================================================================
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

  // ================================================================
  // Title Tests
  // ================================================================
  it("should update a book with valid title and return status code 200", async () => {
    // Test case for valid title
    // Construct updated book data with valid title
    const updatedBookData = {
      title: "Updated Book Title",
      summary: "Test Summary",
      author: "Test Author",
    };
    // Send a PUT request to update the book
    const response = await request(app)
      .put("/library/edit/" + bookId)
      .field("title", updatedBookData.title)
      .field("summary", updatedBookData.summary)
      .field("author", updatedBookData.author);
    // Check the status code and response body
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Book updated!");
    // Check if the book is correctly updated in the database
    const updatedBook = await Book.findById(bookId);
    expect(updatedBook.title).toBe(updatedBookData.title);
    expect(updatedBook.summary).toBe(updatedBookData.summary);
    expect(updatedBook.author).toBe(updatedBookData.author);
  });

  it("should return status code 500 if title is invalid", async () => {
    // Test case for invalid title
    // Construct updated book data with invalid title
    const updatedBookData = {
      title: "", // Empty title
      summary: "Test Summary",
      author: "Test Author",
    };
    // Send a PUT request with invalid data to trigger an error
    const response = await request(app)
      .put("/library/edit/" + bookId)
      .field("title", updatedBookData.title)
      .field("summary", updatedBookData.summary)
      .field("author", updatedBookData.author);
    // Check if the response has status code 500
    expect(response.status).toBe(500);
  });

  it("should return status code 500 if title is empty", async () => {
    // Test case for empty title
    // Construct updated book data with empty title
    const updatedBookData = {
      title: "", // Empty title
      summary: "Test Summary",
      author: "Test Author",
    };
    // Send a PUT request with empty title
    const response = await request(app)
      .put("/library/edit/" + bookId)
      .field("title", updatedBookData.title)
      .field("summary", updatedBookData.summary)
      .field("author", updatedBookData.author);
    // Check if the response has status code 500
    expect(response.status).toBe(500);
  });

  // ================================================================
  // Summary Tests
  // ================================================================
  // Valid Summary
  it("should update a book with valid summary and return status code 200", async () => {
    // Test case for valid summary
    const updatedBookData = {
      title: "Test Book",
      summary: "Updated Book Summary",
      author: "Test Author",
    };
    const response = await request(app)
      .put("/library/edit/" + bookId)
      .field("title", updatedBookData.title)
      .field("summary", updatedBookData.summary)
      .field("author", updatedBookData.author);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Book updated!");
    const updatedBook = await Book.findById(bookId);
    expect(updatedBook.summary).toBe(updatedBookData.summary);
  });

  // Invalid Summary
  it("should return status code 500 if summary is invalid", async () => {
    // Test case for invalid summary
    const updatedBookData = {
      title: "Test Book",
      summary: "", // Empty summary
      author: "Test Author",
    };
    const response = await request(app)
      .put("/library/edit/" + bookId)
      .field("title", updatedBookData.title)
      .field("summary", updatedBookData.summary)
      .field("author", updatedBookData.author);
    expect(response.status).toBe(500);
  });

  // Empty Summary
  it("should return status code 500 if summary is empty", async () => {
    // Test case for empty summary
    const updatedBookData = {
      title: "Test Book",
      summary: "", // Empty summary
      author: "Test Author",
    };
    const response = await request(app)
      .put("/library/edit/" + bookId)
      .field("title", updatedBookData.title)
      .field("summary", updatedBookData.summary)
      .field("author", updatedBookData.author);
    expect(response.status).toBe(500);
  });

  // ================================================================
  // Author Tests
  // ================================================================
  // Valid Author
  it("should update a book with valid author and return status code 200", async () => {
    // Test case for valid author
    const updatedBookData = {
      title: "Test Book",
      summary: "Test Summary",
      author: "Updated Author",
    };
    const response = await request(app)
      .put("/library/edit/" + bookId)
      .field("title", updatedBookData.title)
      .field("summary", updatedBookData.summary)
      .field("author", updatedBookData.author);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Book updated!");
    const updatedBook = await Book.findById(bookId);
    expect(updatedBook.author).toBe(updatedBookData.author);
  });

  // Invalid Author
  it("should return status code 500 if author is invalid", async () => {
    // Test case for invalid author
    const updatedBookData = {
      title: "Test Book",
      summary: "Test Summary",
      author: "", // Empty author
    };
    const response = await request(app)
      .put("/library/edit/" + bookId)
      .field("title", updatedBookData.title)
      .field("summary", updatedBookData.summary)
      .field("author", updatedBookData.author);
    expect(response.status).toBe(500);
  });

  // Empty Author
  it("should return status code 500 if author is empty", async () => {
    // Test case for empty author
    const updatedBookData = {
      title: "Test Book",
      summary: "Test Summary",
      author: "", // Empty author
    };
    const response = await request(app)
      .put("/library/edit/" + bookId)
      .field("title", updatedBookData.title)
      .field("summary", updatedBookData.summary)
      .field("author", updatedBookData.author);
    expect(response.status).toBe(500);
  });

  // ================================================================
  // BookID Tests
  // ================================================================
  // Valid BookID
  it("should update a book with valid book ID and return status code 200", async () => {
    // Test case for valid book ID
    const updatedBookData = {
      title: "Test Book",
      summary: "Test Summary",
      author: "Test Author",
    };
    const response = await request(app)
      .put("/library/edit/" + bookId)
      .field("title", updatedBookData.title)
      .field("summary", updatedBookData.summary)
      .field("author", updatedBookData.author);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Book updated!");
  });

  // Invalid BookID
  it("should return status code 500 if book ID is invalid", async () => {
    // Test case for invalid book ID
    const response = await request(app).put(`/library/edit/123`);
    expect(response.status).toBe(500);
  });

  // Empty BookID
  it("should return status code 500 if book ID is empty", async () => {
    // Test case for empty book ID
    const response = await request(app).put(`/library/edit/`);
    expect(response.status).toBe(500);
  });
});

// ==============================================================
// =================== SEARCH  ==================================
// ==============================================================
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

  // ==============================================================
  // Title Tests
  // ==============================================================
  describe("Search by Title", () => {
    // Exact match query
    it("should return status code 200 and search results if query matches title exactly", async () => {
      const query = "Test Book";
      const response = await request(app).get(`/library/search/${query}`);
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0); // Ensure search results are returned
    });

    // Partial match query
    it("should return status code 200 and search results if query matches title partially", async () => {
      const query = "Test";
      const response = await request(app).get(`/library/search/${query}`);
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0); // Ensure search results are returned
    });

    // Nonexistent query
    it("should return status code 404 if no results found for the query", async () => {
      const query = "Nonexistent Book";
      const response = await request(app).get(`/library/search/${query}`);
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("No results found");
    });
  });

  // ==============================================================
  // Summary Tests
  // ==============================================================
  describe("Search by Summary", () => {
    // Before all hook to create a book in the database
    beforeAll(async () => {
      const newBook = new Book({
        title: "Test Book",
        summary: "Test Summary",
        author: "Test Author",
        userId: "658964aeacfe9dbdb12ad5f1",
      });
      await newBook.save();
    });

    // Test case to search for a book by summary
    it("should return status code 200 and search results if query matches summary exactly", async () => {
      const query = "Test Summary";
      const response = await request(app).get(`/library/search/${query}`);
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0); // Ensure search results are returned
    });

    // Test case to handle no search results found
    it("should return status code 404 if no results found for the query", async () => {
      const query = "Nonexistent Summary";
      const response = await request(app).get(`/library/search/${query}`);
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("No results found");
    });
  });

  // ==============================================================
  // Author Tests
  // ==============================================================
  describe("Search by Author", () => {
    // Before all hook to create a book in the database
    beforeAll(async () => {
      const newBook = new Book({
        title: "Test Book",
        summary: "Test Summary",
        author: "Test Author",
        userId: "658964aeacfe9dbdb12ad5f1",
      });
      await newBook.save();
    });

    // Test case to search for a book by author
    it("should return status code 200 and search results if query matches author exactly", async () => {
      const query = "Test Author";
      const response = await request(app).get(`/library/search/${query}`);
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0); // Ensure search results are returned
    });

    // Test case to handle no search results found
    it("should return status code 404 if no results found for the query", async () => {
      const query = "Nonexistent Author";
      const response = await request(app).get(`/library/search/${query}`);
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("No results found");
    });
  });

  // ==============================================================
  // User ID Tests
  // ==============================================================
  describe("Search by User ID", () => {
    // Before all hook to create a book in the database
    beforeAll(async () => {
      const newBook = new Book({
        title: "Test Book",
        summary: "Test Summary",
        author: "Test Author",
        userId: "658964aeacfe9dbdb12ad5f1",
      });
      await newBook.save();
    });

    // Test case to search for a book by user ID
    it("should return status code 200 and search results if query matches user ID exactly", async () => {
      const query = "658964aeacfe9dbdb12ad5f1";
      const response = await request(app).get(`/library/search/${query}`);
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0); // Ensure search results are returned
    });

    // Test case to handle no search results found
    it("should return status code 404 if no results found for the query", async () => {
      const query = "Nonexistent UserID";
      const response = await request(app).get(`/library/search/${query}`);
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("No results found");
    });
  });
});

// ==================================================
// Testing with empty fields
// ==================================================
// Title Tests
describe("Search by Title", () => {
  it("should return status code 404 if query is empty", async () => {
    const query = "";
    const response = await request(app).get(`/library/search/${query}`);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("No results found");
  });
});

// Author Tests
describe("Search by Author", () => {
  it("should return status code 404 if query is empty", async () => {
    const query = "";
    const response = await request(app).get(`/library/search/${query}`);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("No results found");
  });
});

// Summary Tests
describe("Search by Summary", () => {
  it("should return status code 404 if query is empty", async () => {
    const query = "";
    const response = await request(app).get(`/library/search/${query}`);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("No results found");
  });
});

// User ID Tests
describe("Search by User ID", () => {
  it("should return status code 404 if query is empty", async () => {
    const query = "";
    const response = await request(app).get(`/library/search/${query}`);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("No results found");
  });
});
