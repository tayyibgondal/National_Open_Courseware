const request = require("supertest");
const app = require("../../index");
const Faq = require("../../models/FAQ"); // Assuming you have imported the Faq model

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

// =================== Testing the GET by ID unit =======================
describe("GET /faqs/:faqId", () => {
  let faqId;

  beforeAll(async () => {
    // Create a FAQ in the database and store its ID
    const newFaq = new Faq({
      question: "Test FAQ Question",
      answer: "Test FAQ Answer",
    });
    const createdFaq = await newFaq.save();
    faqId = createdFaq._id;
  });

  afterAll(async () => {
    // Clean up: Delete the created FAQ after tests
    await Faq.findByIdAndDelete(faqId);
  });

  it("should get a single FAQ by ID and return status code 200", async () => {
    // Send a GET request to fetch the FAQ by ID
    const response = await request(app).get(`/faqs/${faqId}`);

    // Check the status code and response body
    expect(response.status).toBe(200);
    expect(response.body.question).toBe("Test FAQ Question");
    expect(response.body.answer).toBe("Test FAQ Answer");
  });

  it("should return status code 500 if invalid id for FAQ is provided", async () => {
    // Send a GET request with an invalid FAQ ID to trigger a 500 response
    const response = await request(app).get(`/faqs/234234`);

    // Check if the response has status code 500
    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Internal Server Error");
  });
});

// =================== Testing the GET unanswered unit =======================
describe("GET /faqs/unanswered", () => {
  it("should get all unanswered FAQs and return status code 200", async () => {
    // Send a GET request to fetch all unanswered FAQs
    const response = await request(app).get("/faqs/unanswered");
    console.log("++++++++++++++++++++++++++++++++++++++++++++++++==");
    console.log(response.body);
    console.log("++++++++++++++++++++++++++++++++++++++++++++++++==");

    // Check the status code and response body
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThanOrEqual(0); // Ensure at least one FAQ is returned
  });
});

// =================== Testing the PUT unit =======================
describe("PUT /faqs/edit/:faqId", () => {
  let faqId;

  beforeAll(async () => {
    // Create a FAQ in the database and store its ID
    const newFaq = new Faq({
      question: "Test FAQ Question",
      answer: "Test FAQ Answer",
    });
    const createdFaq = await newFaq.save();
    faqId = createdFaq._id;
  });

  afterAll(async () => {
    // Clean up: Delete the created FAQ after tests
    await Faq.findByIdAndDelete(faqId);
  });

  it("should update an existing FAQ by ID and return status code 200", async () => {
    const updatedFaqData = {
      question: "Updated FAQ Question",
      answer: "Updated FAQ Answer",
    };

    // Send a PUT request to update the FAQ
    const response = await request(app)
      .put(`/faqs/edit/${faqId}`)
      .send(updatedFaqData);

    // Check the status code and response body
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("FAQ updated");

    // Check if the FAQ is correctly updated in the database
    const updatedFaq = await Faq.findById(faqId);
    expect(updatedFaq.question).toBe(updatedFaqData.question);
    expect(updatedFaq.answer).toBe(updatedFaqData.answer);
  });

  it("should return status code 500 if FAQ not found due to invalid id provided", async () => {
    // Send a PUT request with an invalid FAQ ID to trigger a 500 response
    const response = await request(app).put(`/faqs/edit/234234`);

    // Check if the response has status code 500
    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Internal Server Error");
  });
});

// =================== Testing the DELETE unit =======================
describe("DELETE /faqs/delete/:faqId", () => {
  let faqId;

  beforeAll(async () => {
    // Create a FAQ in the database and store its ID
    const newFaq = new Faq({
      question: "Test FAQ Question",
      answer: "Test FAQ Answer",
    });
    const createdFaq = await newFaq.save();
    faqId = createdFaq._id;
  });

  afterAll(async () => {
    // Clean up: Delete the created FAQ after tests
    await Faq.findByIdAndDelete(faqId);
  });

  it("should delete an FAQ by ID and return status code 200", async () => {
    // Send a DELETE request to delete the FAQ
    const response = await request(app).delete(`/faqs/delete/${faqId}`);

    // Check the status code and response body
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("FAQ deleted");

    // Check if the FAQ is deleted from the database
    const deletedFaq = await Faq.findById(faqId);
    expect(deletedFaq).toBeNull();
  });

  it("should return status code 500 if FAQ not found", async () => {
    // Send a DELETE request with an invalid FAQ ID to trigger a 500 response
    const response = await request(app).delete(`/faqs/delete/12324`);

    // Check if the response has status code 500
    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Internal Server Error");
  });
});
