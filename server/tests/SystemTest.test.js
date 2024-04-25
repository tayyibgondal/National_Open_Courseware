/*
Scenario: Interaction with Web App Features

Description:
1. The user creates a course, edits it, and then deletes it.
2. The user creates a book, searches for it, and then deletes it.
3. The user searches for a career path.
4. The user creates a FAQ, edits it, and then deletes it.

System Test:
*/

const request = require("supertest");
const app = require("../index");

describe("System Test: Interaction with Web App Features", () => {
  // Course Interaction
  it("should allow the user to create, edit, and delete a course", async () => {
    // Create a course
    const courseData = {
      name: "Test Course",
      instructor: "Test Instructor",
      email: "test@example.com",
      university: "Test University",
      year: "2022",
      description: "Test Description",
      userId: "658964aeacfe9dbdb12ad5f1",
    };

    const createCourseResponse = await request(app)
      .post("/courses/create")
      .send(courseData);

    expect(createCourseResponse.status).toBe(200);
    const courseId = createCourseResponse.body.course._id;

    // Edit the course
    const updatedCourseData = {
      name: "Updated Test Course",
      instructor: "Updated Test Instructor",
      description: "Updated Test Description",
    };

    const editCourseResponse = await request(app)
      .put(`/courses/edit/${courseId}`)
      .send(updatedCourseData);

    expect(editCourseResponse.status).toBe(200);

    // Delete the course
    const deleteCourseResponse = await request(app).delete(
      `/courses/delete/${courseId}`
    );

    expect(deleteCourseResponse.status).toBe(200);
    expect(deleteCourseResponse.body.message).toBe("Deleted successfully");
  });

  // Book Interaction (similar logic as Course Interaction)
  it("should allow the user to create, search, and delete a book", async () => {
    // Create a book
    const bookData = {
      title: "Test Book 23203",
      summary: "Test Summary",
      author: "Test Author",
      userId: "658964aeacfe9dbdb12ad5f1",
    };

    const createBookResponse = await request(app)
      .post("/library/create")
      .send(bookData);

    expect(createBookResponse.status).toBe(200);
    const bookId = createBookResponse.body.book._id;

    // Search for the book
    const searchBookResponse = await request(app).get(
      `/library/search/${bookData.title}`
    );

    expect(searchBookResponse.status).toBe(200);
    expect(searchBookResponse.body.length).toBeGreaterThan(0);

    // Delete the book
    const deleteBookResponse = await request(app).delete(
      `/library/delete/${bookId}`
    );

    expect(deleteBookResponse.status).toBe(200);
    expect(deleteBookResponse.body.message).toBe("Deleted successfully");
  });

  // Career Path Search
  it("should allow the user to search for a career path", async () => {
    // Define the search query
    const query = "Test";

    // Send a GET request to search for the career path
    const searchCareerPathResponse = await request(app).get(
      `/careerpaths/search/${query}`
    );

    // Check the status code and response body
    expect(searchCareerPathResponse.status).toBe(200);
    expect(searchCareerPathResponse.body.length).toBeGreaterThan(0); // Ensure search results are returned
  });

  // FAQ Interaction (similar logic as Course Interaction)
  it("should allow the user to create, edit, and delete a FAQ", async () => {
    // Create a FAQ
    const faqData = {
      question: "Test FAQ Question",
      answer: "Test FAQ Answer",
    };

    const createFaqResponse = await request(app)
      .post("/faqs/create")
      .send(faqData);

    expect(createFaqResponse.status).toBe(201);
    const faqId = createFaqResponse.body.faq._id;

    // Edit the FAQ
    const updatedFaqData = {
      question: "Updated FAQ Question",
      answer: "Updated FAQ Answer",
    };

    const editFaqResponse = await request(app)
      .put(`/faqs/edit/${faqId}`)
      .send(updatedFaqData);

    expect(editFaqResponse.status).toBe(200);

    // Delete the FAQ
    const deleteFaqResponse = await request(app).delete(
      `/faqs/delete/${faqId}`
    );

    expect(deleteFaqResponse.status).toBe(200);
    expect(deleteFaqResponse.body.message).toBe("FAQ deleted");
  });
});
