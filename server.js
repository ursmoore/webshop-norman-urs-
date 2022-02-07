const express = require("express");
const app = express();
const PORT = 4000;

const productRouter = require("./routers/productRouter");
const categoriesRouter = require("./routers/categoriesRouter");
const userRouter = require("./routers/userRouter");

app.use("/products", productRouter);
app.use("/categories", categoriesRouter);
app.use("/users", userRouter);

app.listen(PORT, () => console.log(`SAY HELLO TO MY LITTLE PORT: ${PORT}`));
