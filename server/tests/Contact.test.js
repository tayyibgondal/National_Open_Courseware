const request = require("supertest");
const app = require("../index"); // Replace with the path to your Express app file

jest.mock("nodemailer");

describe("Contact and Donation Routes", () => {
  it("should send a contact confirmation email", async () => {
    const mockContactData = {
      name: "Test User",
      email: "test@example.com",
    };

    const response = await request(app).post("/contact").send(mockContactData);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Please check your email!");
  });

  it("should send a donation confirmation email", async () => {
    const mockDonationData = {
      name: "Test Donor",
      email: "donor@example.com",
    };

    const response = await request(app)
      .post("/contact/donate")
      .send(mockDonationData);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Please check your email!");
  });
});
