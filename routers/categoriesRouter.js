const { Router } = require("express");
const router = new Router();
const Categories = require("../models").categories;

router.get("/", async (req, res) => {
  const getAllCategories = await Categories.findAll();
  res.status(200).send({
    message: "here are the Categories",
    getAllCategories: getAllCategories,
  });
});

module.exports = router;
