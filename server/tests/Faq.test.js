const request = require("supertest");
const app = require("../index");
const Faq = require("../models/FAQ"); // Assuming you have imported the Faq model

describe("GET /faqs", () => {
  it("should return status code 200 and an array of faqs", async () => {
    const response = await request(app).get("/faqs");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe("POST /faqs/create", () => {
  it("should create a new FAQ and return status code 201", async () => {
    // Mock data for the new FAQ
    const newFaqData = {
      question: "Test question",
      answer: "Test answer",
    };

    // Send a POST request to create a new FAQ
    const response = await request(app).post("/faqs/create").send(newFaqData);

    // Check the status code and response body
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("FAQ created");
    expect(response.body.faq).toBeDefined();

    // Check if the new FAQ is correctly created in the database
    const createdFaq = await Faq.findById(response.body.faq._id);
    expect(createdFaq).toBeTruthy();
    expect(createdFaq.question).toBe(newFaqData.question);
    expect(createdFaq.answer).toBe(newFaqData.answer);
  });

  it("should return status code 200 even if answer not posted (i.e., when user asks a question)", async () => {
    // Mock data with missing required fields to trigger an error
    const invalidFaqData = {
      // Missing 'answer' field
      question: "Test question",
    };

    // Send a POST request with invalid data
    const response = await request(app)
      .post("/faqs/create")
      .send(invalidFaqData);

    // Check if the response has status code 200
    expect(response.status).toBe(201);
  });
});
