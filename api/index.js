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

// Create a salt
const salt = bcrypt.genSaltSync(10);
const secretKey = "kshdi7a8aifh8o373q9fg";

const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
// Use cookie-parser middleware
app.use(cookieParser());
// Middleware for allowing clients to access static resources
app.use("/uploads", express.static(__dirname + "/uploads"));

// app.get("/", (req, res) => {
//   res.json("WORKING...");
// });

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

// ====================== POST ENDPOINTS =============================
app.post("/create", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;
  jwt.verify(token, secretKey, {}, async (err, info) => {
    if (err) res.status(401).json({ message: "Unauthorized" });
    // If no error in token verification
    const { title, summary, content } = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.id,
    });
    res.status(200).json({ message: "Post created!" });
  });
});

app.get("/posts", async (req, res) => {
  const posts = await Post.find()
    .populate("author", ["username"])
    .sort({ createdAt: -1 })
    .limit(20);
  res.status(200).json(posts);
});

app.get("/post/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const postDoc = await Post.findById(postId).populate("author", [
      "username",
    ]);
    res.status(200).json(postDoc);
  } catch (e) {
    res.status(500).json({ message: "Internal server error!" });
  }
});

app.put("/edit/:postId", uploadMiddleware.single("file"), async (req, res) => {
  const { postId } = req.params;

  // If user has sent file, update its extension in the saved folder
  let newPath = null;
  try {
    if (req.file) {
      const { originalname, path } = req.file;
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      newPath = path + "." + ext;
      fs.renameSync(path, newPath);
    }

    // We need user id; also, we need to verify the user
    const { token } = req.cookies;
    jwt.verify(token, secretKey, {}, async (err, info) => {
      if (err) res.status(401).json({ message: "Unauthorized" });

      // If no error in token verification, proceed towards update
      const { title, summary, content } = req.body;

      // Check if the current user is the author of the post or not
      const postDocOld = await Post.findById(postId);
      console.log("This is old doc: ", postDocOld);
      if (postDocOld.author._id != info.id) {
        res.status(401).json({ message: "Not authorized to update the post!" });
      }

      // Use findByIdAndUpdate with the correct syntax
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        {
          title,
          summary,
          content,
          cover: newPath==null ? postDocOld.cover: newPath, // Keep the old cover if no new file is uploaded
        },
        { new: true } // This option returns the modified document, not the original
      );
      console.log("This is updated document: ", updatedPost);
        console.log("returning successfully...")
      res.status(200).json({ message: "Post updated!" });
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error!" });
  }
});

app.delete("/delete/:postId", async (req, res) => {
  try {
    // Extract the post id
    const { postId } = req.params;
    // Delete the post
    const deletedDoc = await Post.findByIdAndDelete(postId);
    res.status(200).json({message: "Successfully deleted"});
  } catch(e) {
    res.status(500).json({message: 'Could not delete!'})
  }
});

app.listen(4000, () => console.log("Server listening on port 4000..."));
