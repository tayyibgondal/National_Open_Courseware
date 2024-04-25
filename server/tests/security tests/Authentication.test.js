const request = require("supertest");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = require("../../index");

// Mocking the User model for testing purposes
jest.mock("../../models/User");
const User = require("../../models/User");

// Mocking the bcrypt and jwt modules
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("Authentication Endpoints", () => {
  describe("POST /login", () => {
    it("should return status code 500 if login credentials are invalid", async () => {
      const credentials = {
        username: "invalidUser",
        password: "invalidPassword",
      };

      const response = await request(app).post("/login").send(credentials);

      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Internal server error");
    });
  });

  describe("POST /register", () => {
    it("should return status code 200 and a success message if registration is successful", async () => {
      const username = "testUser";
      const password = "testPassword";
      const hashedPassword = "hashedTestPassword";

      // Mocking bcrypt.hashSync to return a hashed password
      bcrypt.hashSync.mockReturnValue(hashedPassword);

      const response = await request(app)
        .post("/register")
        .send({ username: username, password: password });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("User has been created!");
    });
  });
});
