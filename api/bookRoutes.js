const express = require("express");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const Book = require("./models/Book");
const uploadMiddleware = multer({ dest: "uploads" });
const fs = require("fs");

// Create a salt
const secretKey = "kshdi7a8aifh8o373q9fg";

// Create a router
const router = express.Router();

// ====================== BOOK ENDPOINTS =============================
// To get all books - 1 step
router.get("/", async (req, res) => {
  const books = await Book.find()
    .populate("uploader", ["username"])
    .sort({ createdAt: -1 })
    .limit(20);
  res.status(200).json(books);
});

// To get 1 book - 1 step
router.get("/:bookId", async (req, res) => {
  try {
    const { bookId } = req.params;
    const book = await Book.findById(bookId).populate("uploader", ["username"]);
    res.status(200).json(book);
  } catch (e) {
    res.status(500).json({ message: "Internal server error!" });
  }
});

// To create a book - 3 steps
router.post("/create", uploadMiddleware.single("file"), async (req, res) => {
  try {
    // req.file will give the file within server.
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);

    const { token } = req.cookies;
    jwt.verify(token, secretKey, {}, async (err, info) => {
      if (err) res.status(401).json({ message: "Unauthorized" });
      // If no error in token verification
      const { title, summary, author } = req.body;
      const book = await Book.create({
        title,
        summary,
        author,
        book: newPath,
        uploader: info.id,
      });
      res.status(200).json({ message: "Book added!" });
    });
  } catch (e) {
    console.log(e);
  }
});

// To update a book - 4 steps
router.put(
  "/edit/:bookId",
  uploadMiddleware.single("file"),
  async (req, res) => {
    const { bookId } = req.params;
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
        const { title, summary, author } = req.body;
        const bookOld = await Book.findById(bookId);
        // Use findByIdAndUpdate with the correct syntax
        const updatedBook = await Book.findByIdAndUpdate(
          bookId,
          {
            title,
            summary,
            author,
            book: newPath == null ? bookOld.book : newPath, // Keep the old cover if no new file is uploaded
          },
          { new: true } // This option returns the modified document, not the original
        );
        res.status(200).json({ message: "Post updated!" });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error!" });
    }
  }
);

// Search a book
router.get("/search/:query", async (req, res) => {
  const { query } = req.params;  try {
    const searchResults = await Book.find(
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
