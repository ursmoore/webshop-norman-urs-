const { Router } = require("express");
const router = new Router();
const Products = require("../models").product;

// GET - /products: Returns a list of products with their categories
router.get("/", async (req, res) => {
  const getAllProducts = await Products.findAll();
  res
    .status(200)
    .send({ message: "here are the Products", getAllProducts: getAllProducts });
});

// GET - /products/:id Returns a specific product with it's category
router.get("/:id", async (req, res, next) => {
  try {
    const productId = parseInt(req.params.id);
    console.log("This is my productId", productId);
    const findProductById = await Products.findByPk(productId);
    if (!findProductById) {
      res.status(404).send("this product doesnt exist");
    } else {
      res
        .status(200)
        .send({ message: "Product found", findProductById: findProductById });
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
