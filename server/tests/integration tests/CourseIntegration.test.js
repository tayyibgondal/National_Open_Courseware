const request = require("supertest");
const app = require("../../index");
const Course = require("../../models/Course");

describe("Integration Tests: Courses Endpoints", () => {
  let courseId;

  // Test GET /courses endpoint
  describe("GET /courses", () => {
    it("should return status code 200 and an array of courses", async () => {
      const response = await request(app).get("/courses");
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  // Test POST /courses/create endpoint
  describe("POST /courses/create", () => {
    it("should create a new course and return status code 200", async () => {
      // Mock data for the new course
      const newCourseData = {
        name: "HEHE Tutorial",
        instructor: "Test Instructor",
        email: "test@example.com",
        university: "Test University",
        year: "2022",
        description: "Test Description",
        userId: "658964aeacfe9dbdb12ad5f1",
      };

      const response = await request(app)
        .post("/courses/create")
        .send(newCourseData);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Course added!");

      // Store the created course's ID for later use in other tests
      courseId = response.body.course._id;
    });
  });

  // Test PUT /courses/edit/:courseId endpoint
  describe("PUT /courses/edit/:courseId", () => {
    it("should update a course and return status code 200", async () => {
      const updatedCourseData = {
        name: "Updated Test Course",
        instructor: "Updated Test Instructor",
        email: "updated_test@example.com",
        university: "Updated Test University",
        year: "2023",
        description: "Updated Test Description",
      };

      const response = await request(app)
        .put(`/courses/edit/${courseId}`)
        .send(updatedCourseData);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Course updated!");
    });
  });

  // Test GET /courses/search/:query endpoint
  describe("GET /courses/search/:query", () => {
    it("should return status code 200 and search results if query matches", async () => {
      const query = "HEHE";
      const response = await request(app).get(`/courses/search/${query}`);
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it("should return status code 404 if no results found", async () => {
      const query = "XAOIKSAJJAOSUIHRKSAN";
      const response = await request(app).get(`/courses/search/${query}`);
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("No results found");
    });
  });

  // Test DELETE /courses/delete/:courseId endpoint
  describe("DELETE /courses/delete/:courseId", () => {
    it("should delete a course and return status code 200", async () => {
      const response = await request(app).delete(`/courses/delete/${courseId}`);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Deleted successfully");
    });
  });
});
