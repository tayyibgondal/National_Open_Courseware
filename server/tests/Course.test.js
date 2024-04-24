const request = require("supertest");
const app = require("../index");
const Course = require("../models/Course");

describe("GET /courses", () => {
  it("should return status code 200 and an array of courses", async () => {
    const response = await request(app).get("/courses");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should populate uploader field with username", async () => {
    const response = await request(app).get("/courses");
    expect(response.status).toBe(200);
    expect(
      response.body.every(
        (course) => course.uploader && course.uploader.username
      )
    ).toBe(true);
  });
});

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
