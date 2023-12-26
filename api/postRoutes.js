const express = require("express");
const Post = require("./models/Post");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs");

// Create a salt
const secretKey = "kshdi7a8aifh8o373q9fg";

// Create a router
const router = express.Router();

// ====================== POST ENDPOINTS =============================
router.post("/create", uploadMiddleware.single("file"), async (req, res) => {
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

router.get("/", async (req, res) => {
  const posts = await Post.find()
    .populate("author", ["username"])
    .sort({ createdAt: -1 })
    .limit(20);
  res.status(200).json(posts);
});

router.get("/:postId", async (req, res) => {
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

router.put("/edit/:postId", uploadMiddleware.single("file"), async (req, res) => {
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

router.delete("/delete/:postId", async (req, res) => {
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

router.get("/search/:query", async (req, res) => {
  const { query } = req.params;
  try {
    const searchResults = await Post.find(
      { $text: { $search: query } },
      { score: { $meta: "textScore" } }
    )
      .sort({ score: { $meta: "textScore" } })
      .limit(5)
      .exec();

    if (searchResults.length === 0) {
      // If no results found, respond with 404 status
      res.status(404).json({ message: "No results found" });
    } else {
      // If results found, respond with the search results
      res.status(200).json(searchResults);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


module.exports = router;