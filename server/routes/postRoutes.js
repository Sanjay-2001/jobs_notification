const express = require("express");
const multer = require("multer");
const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.get("/", getPosts);
router.post("/", protect, upload.single("image"), createPost);
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);

module.exports = router;
