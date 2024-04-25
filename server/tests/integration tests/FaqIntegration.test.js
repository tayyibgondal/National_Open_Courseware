const request = require("supertest");
const app = require("../../index");
const Faq = require("../../models/FAQ");

describe("Integration Tests: FAQ Endpoints", () => {
  let faqId;

  // Test GET /faqs endpoint
  describe("GET /faqs", () => {
    it("should return status code 200 and an array of FAQs", async () => {
      const response = await request(app).get("/faqs");
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  // Test POST /faqs/create endpoint
  describe("POST /faqs/create", () => {
    it("should create a new FAQ and return status code 201", async () => {
      const newFaqData = {
        question: "Test question",
        answer: "Test answer",
      };

      const response = await request(app).post("/faqs/create").send(newFaqData);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe("FAQ created");
      expect(response.body.faq).toBeDefined();

      const createdFaq = await Faq.findById(response.body.faq._id);
      expect(createdFaq).toBeTruthy();
      expect(createdFaq.question).toBe(newFaqData.question);
      expect(createdFaq.answer).toBe(newFaqData.answer);

      faqId = createdFaq._id;
    });

    it("should return status code 200 even if answer not posted", async () => {
      const invalidFaqData = {
        question: "Test question",
      };

      const response = await request(app)
        .post("/faqs/create")
        .send(invalidFaqData);

      expect(response.status).toBe(201);
    });
  });

  // Test GET /faqs/:faqId endpoint
  describe("GET /faqs/:faqId", () => {
    it("should get a single FAQ by ID and return status code 200", async () => {
      const response = await request(app).get(`/faqs/${faqId}`);

      expect(response.status).toBe(200);
      expect(response.body.question).toBe("Test question");
      expect(response.body.answer).toBe("Test answer");
    });

    it("should return status code 500 if invalid FAQ ID provided", async () => {
      const response = await request(app).get(`/faqs/234234`);

      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Internal Server Error");
    });
  });

  // Test GET /faqs/unanswered endpoint
  describe("GET /faqs/unanswered", () => {
    it("should get all unanswered FAQs and return status code 200", async () => {
      const response = await request(app).get("/faqs/unanswered");

      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThanOrEqual(0);
    });
  });

  // Test PUT /faqs/edit/:faqId endpoint
  describe("PUT /faqs/edit/:faqId", () => {
    it("should update an existing FAQ by ID and return status code 200", async () => {
      const updatedFaqData = {
        question: "Updated question",
        answer: "Updated answer",
      };

      const response = await request(app)
        .put(`/faqs/edit/${faqId}`)
        .send(updatedFaqData);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("FAQ updated");

      const updatedFaq = await Faq.findById(faqId);
      expect(updatedFaq.question).toBe(updatedFaqData.question);
      expect(updatedFaq.answer).toBe(updatedFaqData.answer);
    });

    it("should return status code 500 if FAQ not found due to invalid ID", async () => {
      const response = await request(app).put(`/faqs/edit/234234`);

      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Internal Server Error");
    });
  });

  // Test DELETE /faqs/delete/:faqId endpoint
  describe("DELETE /faqs/delete/:faqId", () => {
    it("should delete an FAQ by ID and return status code 200", async () => {
      const response = await request(app).delete(`/faqs/delete/${faqId}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("FAQ deleted");

      const deletedFaq = await Faq.findById(faqId);
      expect(deletedFaq).toBeNull();
    });

    it("should return status code 500 if FAQ not found", async () => {
      const response = await request(app).delete(`/faqs/delete/12324`);

      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Internal Server Error");
    });
  });
});
