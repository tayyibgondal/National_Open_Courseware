const request = require("supertest");
const bcrypt = require("bcrypt");
const app = require("../../index");
const User = require("../../models/User");

// Mocking the User model for testing purposes
jest.mock("../../../models/User");

// Mocking the bcrypt and jwt modules
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("POST /login", () => {
  it("should return status code 200 with valid credentials", async () => {
    const credentials = {
      username: "tayyib",
      password: "testing123",
    };

    const userDoc = {
      _id: "2o345234502934502348534",
      password: "testing123",
      isAdmin: false,
    };
    User.findOne.mockResolvedValue(userDoc);
    bcrypt.compareSync.mockReturnValue(true);

    const response = await request(app).post("/login").send(credentials);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("id", userDoc._id);
    expect(response.body).toHaveProperty("isAdmin", userDoc.isAdmin);
  });

  it("should return status code 401 with invalid credentials", async () => {
    const credentials = {
      username: "invalidUser",
      password: "invalidPassword",
    };

    User.findOne.mockResolvedValue(null);
    bcrypt.compareSync.mockReturnValue(false);

    const response = await request(app).post("/login").send(credentials);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid credentials");
  });

  it("should return status code 401 with missing username", async () => {
    const credentials = {
      password: "validPassword",
    };

    const response = await request(app).post("/login").send(credentials);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Missing username");
  });

  it("should return status code 401 with missing password", async () => {
    const credentials = {
      username: "validUser",
    };

    const response = await request(app).post("/login").send(credentials);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Missing password");
  });

  it("should return status code 500 with internal server error", async () => {
    const credentials = {
      username: "validUser",
      password: "validPassword",
    };

    User.findOne.mockRejectedValue(new Error("Internal server error"));

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

    User.create.mockResolvedValue({
      _id: "userId",
      username: username,
      password: hashedPassword,
      isAdmin: false,
    });
    bcrypt.hashSync.mockReturnValue(hashedPassword);

    const response = await request(app)
      .post("/register")
      .send({ username: username, password: password });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("User has been created!");
  });

  it("should return status code 400 with a message for duplicate username", async () => {
    const username = "existingUser";
    const password = "testPassword";

    User.create.mockRejectedValue(new Error("Duplicate username"));

    const response = await request(app)
      .post("/register")
      .send({ username: username, password: password });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Username already exists");
  });

  it("should return status code 400 with a message for weak password", async () => {
    const username = "testUser";
    const password = "1234"; // Password does not meet strength requirements

    const response = await request(app)
      .post("/register")
      .send({ username: username, password: password });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Password must be at least 8 characters long"
    );
  });

  it("should return status code 400 with a message for missing credentials", async () => {
    const response = await request(app).post("/register").send({});

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Missing username and password");
  });

  it("should return status code 500 with a message for internal server error", async () => {
    const username = "testUser";
    const password = "testPassword";

    User.create.mockRejectedValue(new Error("Internal server error"));

    const response = await request(app)
      .post("/register")
      .send({ username: username, password: password });

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Internal server error");
  });
});

describe("POST /logout", () => {
  it("should return status code 200 and clear token if logout is successful", async () => {
    const response = await request(app).post("/logout").send();

    expect(response.status).toBe(200);
    expect(response.body).toBe("OK");
    expect(response.header["set-cookie"]).toEqual(["token="]);
  });
});
