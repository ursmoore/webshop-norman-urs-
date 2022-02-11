const { Router } = require("express");
const router = new Router();
const Users = require("../models").user;
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  const getAllUsers = await Users.findAll();
  res.status(200).send({
    message: "here are the Users",
    getAllUsers: getAllUsers,
  });
});

module.exports = router;

//create one new user
//http POST :4000/users email=Lumpidumpi@gmail.com password=Fikkifukki name="Titti Witty"
router.post("/", async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      res.status(400).send("missing parameters");
    } else {
      const newUser = await Users.create({
        email: email,
        password: bcrypt.hashSync(password, 10),
        name: name,
      });
      res.send(newUser);
    }
  } catch (e) {
    next(e);
  }
});
