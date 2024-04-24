const request = require("supertest");
const app = require("../index");
const CareerPath = require("../models/CareerPath");

describe("GET /careerpaths", () => {
  it("should return status code 200 and an array of career paths", async () => {
    const response = await request(app).get("/careerpaths");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe("POST /careerpaths/create", () => {
  it("should create a new career path and return status code 200", async () => {
    // Mock data for the new career path
    const newCareerPathData = {
      title: "Test Career Path",
      description: "Test Career Path Description",
    };

    // Send a POST request to create a new career path
    const response = await request(app)
      .post("/careerpaths/create")
      .field("title", newCareerPathData.title)
      .field("description", newCareerPathData.description);

    // Check the status code and response body
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("CareerPath added!");

    // Check if the new career path is correctly created in the database
    const createdCareerPath = await CareerPath.findOne({
      title: newCareerPathData.title,
    });
    expect(createdCareerPath).toBeTruthy();
    expect(createdCareerPath.title).toBe(newCareerPathData.title);
    expect(createdCareerPath.description).toBe(newCareerPathData.description);
  });

  it("should return status code 500 if an error occurs", async () => {
    // Mock data with missing required fields to trigger an error
    const invalidCareerPathData = {};

    // Send a POST request with invalid data
    const response = await request(app).post("/careerpaths/create");

    // Check if the response has status code 500
    expect(response.status).toBe(500);
  });
});
