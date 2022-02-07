const { Router } = require("express");
const router = new Router();
const Users = require("../models").user;

router.get("/", async (req, res) => {
  const getAllUsers = await Users.findAll();
  res.status(200).send({
    message: "here are the Users",
    getAllUsers: getAllUsers,
  });
});

module.exports = router;
