const express = require("express");
const Blog = require("../models/blog");

const blogs_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("blogs/index", { blogs: result, title: "All blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
};

const blogs_store = (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
};

const blog_get_by_id = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
      .then((result) => {
        res.render("blogs/details", { blog: result, title: "Blog Details" });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const blog_delete_by_id = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
      .then((result) => {
        res.json({ redirect: "/blogs" });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const blogs_create = (req, res) => {
    res.render("blogs/create", { title: "Create a new blog" });
  }

module.exports = {
  blogs_index,
  blogs_store,
  blogs_create,
  blog_get_by_id,
  blog_delete_by_id
};
