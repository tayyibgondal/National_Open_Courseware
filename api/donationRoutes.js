const express = require("express");
const Donation = require("./models/Donation");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const donationRecord = await Donation.create(req.body);
    res.json({ message: "Donation data saved!", record: donationRecord });
    console.log(donationRecord);
  } catch (e) {
    res.status(500).json({ message: "Internal server error!" });
  }
});

module.exports = router;
