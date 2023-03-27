const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");
const blogController = require('../controller/blogController')

router.get("/create", blogController.blogs_create);

router.get("/", blogController.blogs_index);

router.post("/", blogController.blogs_store);

router.get("/:id", blogController.blog_get_by_id);

router.delete("/:id", blogController.blog_delete_by_id);

module.exports = router;
