const cors = require("cors");
const express = require("express");
const app = express();
const PORT = 4000;

const productRouter = require("./routers/productRouter");
const categoriesRouter = require("./routers/categoriesRouter");
const userRouter = require("./routers/userRouter");

app.use(cors());
app.use(express.json());
app.use("/products", productRouter);
app.use("/categories", categoriesRouter);
app.use("/users", userRouter);

app.get("/hello", async (req, res, next) => {
  res.send("hello route");
});

app.listen(PORT, () => console.log(`SAY HELLO TO MY LITTLE PORT: ${PORT}`));
