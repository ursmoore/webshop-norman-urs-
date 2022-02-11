const { Router } = require("express");
const { toJWT, toData } = require("../auth/jwt");
const Users = require("../models").user;
const bcrypt = require("bcrypt");
const authMiddleware = require("../auth/middleware");

const router = new Router();

//testroute for middleware
// http :4000/auth/test-auth Authorization:"Bearer <TOKEN>"
router.get("/test-auth", authMiddleware, (req, res) => {
  res.send({
    message: `Thanks ${req.user.name} for visiting the secret endpoint.`,
  });
});

// http POST :4000/auth/login email=Tikkitakka@gmail.com password=$2b$10$57l2TftV7N29Q8utzrbmTufeu8qUsu5lwXfJ3ucNZpiwE.ibWzcK2

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send("Please, type a valid email and password");
  } else {
    try {
      const authUser = await Users.findOne({
        where: {
          email: email,
        },
      });
      if (!authUser) {
        res
          .status(400)
          .send("User not found! Email and/or password incorrect!");
      } else {
        if (bcrypt.compareSync(password, authUser.password)) {
          res.status(200).send({ jwt: toJWT({ userId: authUser.id }) });
        } else {
          res.status(400).send("Email and/or password incorrect!");
        }
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }
});

module.exports = router;
