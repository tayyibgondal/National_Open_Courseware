const request = require("supertest");
const app = require("../../index");
const Course = require("../../models/Course");

// =================== Testing the GET ALL unit =======================
describe("GET /courses", () => {
  it("should return status code 200 and an array of courses", async () => {
    const response = await request(app).get("/courses");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // it("should populate uploader field with username", async () => {
  //   const response = await request(app).get("/courses");
  //   expect(response.status).toBe(200);
  //   expect(
  //     response.body.every(
  //       (course) => course.uploader && course.uploader.username
  //     )
  //   ).toBe(true);
  // });
});

// =================== Testing the POST unit =======================
describe("POST /courses/create", () => {
  it("should create a new course and return status code 200", async () => {
    // Mock data for the new course
    const newCourseData = {
      name: "Test Course",
      instructor: "Test Instructor",
      email: "test@example.com",
      university: "Test University",
      year: "2022",
      description: "Test Description",
      userId: "658964aeacfe9dbdb12ad5f1",
    };

    // Send a POST request to create a new course
    const response = await request(app)
      .post("/courses/create")
      .field("name", newCourseData.name)
      .field("instructor", newCourseData.instructor)
      .field("email", newCourseData.email)
      .field("university", newCourseData.university)
      .field("year", newCourseData.year)
      .field("description", newCourseData.description)
      .field("userId", newCourseData.userId);

    // Check the status code and response body
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Course added!");

    // Check if the new course is correctly created in the database
    const createdCourse = await Course.findOne({ name: newCourseData.name });
    expect(createdCourse).toBeTruthy();
    expect(createdCourse.name).toBe(newCourseData.name);
    expect(createdCourse.instructor).toBe(newCourseData.instructor);
    expect(createdCourse.email).toBe(newCourseData.email);
    expect(createdCourse.university).toBe(newCourseData.university);
    expect(createdCourse.year).toBe(newCourseData.year);
    expect(createdCourse.description).toBe(newCourseData.description);
  });

  it("should return status code 500 if an error occurs", async () => {
    // Mock data with missing required fields to trigger an error
    const invalidCourseData = {};

    // Send a POST request with invalid data
    const response = await request(app).post("/courses/create");

    // Check if the response has status code 500
    expect(response.status).toBe(500);
  });
});

// =================== Testing the PUT unit =======================
describe("PUT /courses/edit/:courseId", () => {
  let courseId;

  beforeAll(async () => {
    // Create a course in the database and store its ID
    const newCourse = new Course({
      name: "Test Course",
      instructor: "Test Instructor",
      email: "test@example.com",
      university: "Test University",
      year: "2022",
      description: "Test Description",
      uploader: "658964aeacfe9dbdb12ad5f1",
    });
    const createdCourse = await newCourse.save();
    courseId = createdCourse._id;
  });

  afterAll(async () => {
    // Clean up: Delete the created course after tests
    await Course.findByIdAndDelete(courseId);
  });

  it("should update a book and return status code 200", async () => {
    const updatedCourseData = {
      name: "Updated Web Engineering",
      instructor: "Updated Dr. Fahad Satti",
      email: "updated.fahad.satti@seecs.edu.pk",
      university: "Updated NUST-H12",
      year: "2024",
      description: "Updated description",
    };

    // Send a PUT request to update the course
    const response = await request(app)
      .put("/courses/edit/" + courseId)
      .field("name", updatedCourseData.name)
      .field("instructor", updatedCourseData.instructor)
      .field("email", updatedCourseData.email)
      .field("university", updatedCourseData.university)
      .field("year", updatedCourseData.year)
      .field("description", updatedCourseData.description);

    // Check the status code and response body
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Course updated!");

    // Check if the book is correctly updated in the database
    const updatedCourse = await Course.findById(courseId);
    expect(updatedCourse.name).toBe(updatedCourseData.name);
    expect(updatedCourse.instructor).toBe(updatedCourseData.instructor);
    expect(updatedCourse.email).toBe(updatedCourseData.email);
    expect(updatedCourse.university).toBe(updatedCourseData.university);
    expect(updatedCourse.year).toBe(updatedCourseData.year);
    expect(updatedCourse.description).toBe(updatedCourseData.description);
  });

  it("should return status code 500 if an error occurs", async () => {
    // Send a PUT request with invalid data to trigger an error
    const response = await request(app).put(`/courses/edit/123`);

    // Check if the response has status code 500
    expect(response.status).toBe(500);
  });
});

// =================== Testing the DELETE unit =======================
describe("DELETE /courses/delete/:courseId", () => {
  let courseId;

  beforeAll(async () => {
    // Create a course in the database and store its ID
    const newCourse = new Course({
      name: "Test Course",
      instructor: "Test Instructor",
      email: "test@example.com",
      university: "Test University",
      year: "2022",
      description: "Test Description",
    });
    const createdCourse = await newCourse.save();
    courseId = createdCourse._id;
  });

  afterAll(async () => {
    // Clean up: Delete the created course after tests
    await Course.findByIdAndDelete(courseId);
  });

  it("should delete a course and return status code 200", async () => {
    // Send a DELETE request to delete the course
    const response = await request(app).delete(`/courses/delete/${courseId}`);

    // Check the status code and response body
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Deleted successfully");

    // Check if the course is deleted from the database
    const deletedCourse = await Course.findById(courseId);
    expect(deletedCourse).toBeNull();
  });

  it("should return status code 500 if course not found", async () => {
    // Send a DELETE request with an invalid ID to trigger a 500 response
    const response = await request(app).delete(`/courses/delete/invalidId`);

    // Check if the response has status code 500
    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Internal server error!");
  });
});

// =================== Testing the SEARCH unit =======================
describe("GET /courses/search/:query", () => {
  let courseId;

  // Before all hook to create a course in the database
  beforeAll(async () => {
    const newCourse = new Course({
      name: "Test Course",
      instructor: "Test Instructor",
      email: "test@example.com",
      university: "Test University",
      year: "2022",
      description: "Test Description",
      uploader: "658964aeacfe9dbdb12ad5f1",
    });
    const createdCourse = await newCourse.save();
    courseId = createdCourse._id;
  });

  // After all hook to delete the created course from the database
  afterAll(async () => {
    await Course.findByIdAndDelete(courseId);
  });

  // Test case to search for a course
  it("should return status code 200 and search results if query matches", async () => {
    // Define the search query
    const query = "Test Course";

    // Send a GET request to search for the course
    const response = await request(app).get(`/courses/search/${query}`);

    // Check the status code and response body
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0); // Ensure search results are returned
  });

  // Test case to handle no search results found
  it("should return status code 404 if no results found", async () => {
    // Define a query that won't match any course
    const query = "XAOIKSAJJAOSUIHRKSAN";

    // Send a GET request to search for a nonexistent course
    const response = await request(app).get(`/courses/search/${query}`);

    // Check the status code and response body
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("No results found");
  });
});
