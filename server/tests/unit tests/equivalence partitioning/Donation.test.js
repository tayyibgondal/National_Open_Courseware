const request = require("supertest");
const app = require("../../../index");
const Donation = require("../../../models/Donation"); // Assuming you have imported the Donation model

describe("POST /donate", () => {
  // ===================================================
  // Valid values for firstName
  // ===================================================
  it("should return status code 200 with valid firstName", async () => {
    const response = await request(app).post("/donate").send({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      number: "1234567890",
      amount: 50,
      currency: "USD",
    });
    expect(response.status).toBe(200);
  });

  // Invalid values for firstName
  it("should return status code 500 with invalid firstName", async () => {
    const response = await request(app).post("/donate").send({
      firstName: "", // Empty
      lastName: "Doe",
      email: "john@example.com",
      number: "1234567890",
      amount: 50,
      currency: "USD",
    });
    expect(response.status).toBe(500);
  });

  // Empty value for firstName
  it("should return status code 500 with empty firstName", async () => {
    const response = await request(app).post("/donate").send({
      lastName: "Doe",
      email: "john@example.com",
      number: "1234567890",
      amount: 50,
      currency: "USD",
    });
    expect(response.status).toBe(500);
  });

  // ===================================================
  // Last name
  // ===================================================
  // Valid values for lastName
  it("should return status code 200 with valid lastName", async () => {
    const response = await request(app).post("/donate").send({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      number: "1234567890",
      amount: 50,
      currency: "USD",
    });
    expect(response.status).toBe(200);
  });

  // Invalid values for lastName
  it("should return status code 500 with invalid lastName", async () => {
    const response = await request(app).post("/donate").send({
      firstName: "John",
      lastName: "", // Empty
      email: "john@example.com",
      number: "1234567890",
      amount: 50,
      currency: "USD",
    });
    expect(response.status).toBe(500);
  });

  // Empty value for lastName
  it("should return status code 500 with empty lastName", async () => {
    const response = await request(app).post("/donate").send({
      firstName: "John",
      email: "john@example.com",
      number: "1234567890",
      amount: 50,
      currency: "USD",
    });
    expect(response.status).toBe(500);
  });

  // ===================================================
  // Email
  // ===================================================
  // Valid values for email
  it("should return status code 200 with valid email", async () => {
    const response = await request(app).post("/donate").send({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      number: "1234567890",
      amount: 50,
      currency: "USD",
    });
    expect(response.status).toBe(200);
  });

  // Invalid values for email
  it("should return status code 500 with invalid email", async () => {
    const response = await request(app).post("/donate").send({
      firstName: "John",
      lastName: "Doe",
      email: "invalidemail", // Invalid email format
      number: "1234567890",
      amount: 50,
      currency: "USD",
    });
    expect(response.status).toBe(500);
  });

  // Empty value for email
  it("should return status code 500 with empty email", async () => {
    const response = await request(app).post("/donate").send({
      firstName: "John",
      lastName: "Doe",
      number: "1234567890",
      amount: 50,
      currency: "USD",
    });
    expect(response.status).toBe(500);
  });

  // ===================================================
  // Number
  // ===================================================
  // Valid values for number
  it("should return status code 200 with valid number", async () => {
    const response = await request(app).post("/donate").send({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      number: "1234567890",
      amount: 50,
      currency: "USD",
    });
    expect(response.status).toBe(200);
  });

  // Invalid values for number
  it("should return status code 500 with invalid number", async () => {
    const response = await request(app).post("/donate").send({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      number: "invalidnumber", // Invalid number format
      amount: 50,
      currency: "USD",
    });
    expect(response.status).toBe(500);
  });

  // Empty value for number
  it("should return status code 500 with empty number", async () => {
    const response = await request(app).post("/donate").send({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      amount: 50,
      currency: "USD",
    });
    expect(response.status).toBe(500);
  });

  // ===================================================
  // Values
  // ===================================================
  // Valid values for amount
  it("should return status code 200 with valid amount", async () => {
    const response = await request(app).post("/donate").send({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      number: "1234567890",
      amount: 50, // Valid amount
      currency: "USD",
    });
    expect(response.status).toBe(200);
  });

  // Invalid values for amount
  it("should return status code 500 with invalid amount", async () => {
    const response = await request(app).post("/donate").send({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      number: "1234567890",
      amount: -50, // Invalid amount (negative)
      currency: "USD",
    });
    expect(response.status).toBe(500);
  });

  // Empty value for amount
  it("should return status code 500 with empty amount", async () => {
    const response = await request(app).post("/donate").send({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      number: "1234567890",
      currency: "USD",
    });
    expect(response.status).toBe(500);
  });

  // ===================================================
  // Currency Tests
  // ===================================================
  // Valid values for currency
  it("should return status code 200 with valid currency", async () => {
    const response = await request(app).post("/donate").send({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      number: "1234567890",
      amount: 50,
      currency: "USD", // Valid currency
    });
    expect(response.status).toBe(200);
  });

  // Invalid values for currency
  it("should return status code 500 with invalid currency", async () => {
    const response = await request(app).post("/donate").send({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      number: "1234567890",
      amount: 50,
      currency: "InvalidCurrency", // Invalid currency
    });
    expect(response.status).toBe(500);
  });

  // Empty value for currency
  it("should return status code 500 with empty currency", async () => {
    const response = await request(app).post("/donate").send({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      number: "1234567890",
      amount: 50,
    });
    expect(response.status).toBe(500);
  });
});
