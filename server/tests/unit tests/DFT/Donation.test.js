const request = require("supertest");
const app = require("../../../index"); // Assuming your Express app instance is exported from 'index.js' or 'app.js'
const Donation = require("../../../models/Donation"); // Assuming you have imported the Donation model

describe("POST /donate", () => {
  it("should create a new donation record and return status code 200", async () => {
    // Mock data for the new donation record
    const newDonationData = {
      firstName: "Cup",
      lastName: "Naqvi",
      email: "coolboi@gmail.com",
      number: "+92-1234587679",
      amount: 2000,
      currency: "INR",
    };

    // Send a POST request to create a new donation record
    const response = await request(app).post("/donate").send(newDonationData);

    // Check the status code and response body
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Donation data saved!");

    // Check if the new donation record is correctly created in the database
    const createdDonation = await Donation.findOne({
      email: newDonationData.email,
    });
    expect(createdDonation).toBeTruthy();
    expect(createdDonation.firstName).toBe(newDonationData.firstName);
    expect(createdDonation.lastName).toBe(newDonationData.lastName);
    expect(createdDonation.email).toBe(newDonationData.email);
    expect(createdDonation.number).toBe(newDonationData.number);
    expect(createdDonation.amount).toBe(newDonationData.amount);
    expect(createdDonation.currency).toBe(newDonationData.currency);
  });

  it("should return status code 500 if an error occurs", async () => {
    // Mock data with missing required fields to trigger an error
    const invalidDonationData = {};

    // Send a POST request with invalid data
    const response = await request(app).post("/donate");

    // Check if the response has status code 500
    expect(response.status).toBe(500);
  });
});
