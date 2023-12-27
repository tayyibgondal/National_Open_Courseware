const express = require("express");
const cors = require("cors");
const db = require("./db/db");
const User = require("./models/User");
const Post = require("./models/Post");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs");
const postRoutes = require("./postRoutes");
const bookRoutes = require("./bookRoutes");
const courseRoutes = require("./courseRoutes");
const axios = require("axios");
const bodyParser = require("body-parser");

// Create a salt
const salt = bcrypt.genSaltSync(10);
const secretKey = "kshdi7a8aifh8o373q9fg";

const app = express();

// Middlewares
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Use cookie-parser middleware
app.use(cookieParser());
// Add body-parser middleware to parse JSON bodies
app.use(bodyParser.json());
// Middleware for allowing clients to access static resources
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/posts/", postRoutes);
app.use("/library/", bookRoutes);
app.use("/courses/", courseRoutes);

// ====================== AUTHENTICATION ENDPOINTS =============================
app.post("/login", async (req, res) => {
  try {
    // Extract username and password
    const { username, password } = req.body;
    // Find user
    const userDoc = await User.findOne({ username });
    // Test password
    const passwordTestResult = userDoc._id
      ? bcrypt.compareSync(password, userDoc.password)
      : false;

    // If user exists and passwords match
    if (userDoc._id && passwordTestResult) {
      jwt.sign({ username, id: userDoc._id }, secretKey, {}, (e, token) => {
        if (e) throw e;
        res
          .status(200)
          .cookie("token", token)
          .json({ username: username, id: userDoc._id });
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, salt);
  try {
    const user = await User.create({
      username: username,
      password: hashedPassword,
    });
    res.status(200).json({ message: "User has been created!" });
  } catch (e) {
    res.status(500).json({ message: "Could not register" });
  }
});

app.get("/verify_token", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secretKey, {}, (err, info) => {
    if (err) res.status(401).json({ message: "Unauthorized" });
    res.status(200).json(info);
  });
});

app.post("/logout", (req, res) => {
  // Set the cookie to an empty string
  res.cookie("token", "").json("OK");
});

// app.post("/chatpdf-request", async (req, res) => {
//   const apiUrl = "https://api.chatpdf.com/v1/chats/message";
//   const headers = {
//     "Content-Type": "application/json",
//     "x-api-key": "sec_w2zWAPuDvDlR8K1vx0mdIeXCjzMVC5fI",
//   };
//   const requestForApi = {
//     method: "POST",
//     headers,
//     body: JSON.stringify(req.body),
//   };
//   console.log(requestForApi);

//   try {
//     const apiResponse = await fetch(apiUrl, requestForApi);

//     if (apiResponse.ok) {
//       const apiData = await apiResponse.json();
//       res.json({ reply: apiData.content });
//     } else {
//       res
//         .status(apiResponse.status)
//         .json({ error: "Bad response from the AI bot, try again!" });
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

app.post("/chatpdf-request", async (req, res) => {
  console.log(req.body);
  const apiUrl = "https://api.chatpdf.com/v1/chats/message";

  const headers = {
    "Content-Type": "application/json",
    "x-api-key": "sec_w2zWAPuDvDlR8K1vx0mdIeXCjzMVC5fI",
  };

  try {
    const apiResponse = await axios.post(apiUrl, req.body, { headers });

    if (apiResponse.status === 200) {
      res.json({ content: apiResponse.data.content });
    } else {
      res
        .status(apiResponse.status)
        .json({ error: "Bad response from the AI bot, try again!" });
    }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(4000, () => console.log("Server listening on port 4000..."));
