const Products = require("./models").product;

app.get("/", async (req, res) => {
  const getAllProducts = await Products.findAll();
  res
    .status(200)
    .send({ message: "here are the products", getAllProducts: getAllProducts });
});
