const router = require("express").Router();
let User = require("../models/user.model");

// router.route('/').get((req, res) => {
//   User.find()
//     .then(users => res.json(users))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

router.route("/register").post(async (req, res) => {
  console.log(req.body);
  // const newPassword = await bcrypt.hash(req.body.password, 10); // FOR ENCRYption purpose
  try {
    const newUser = new User({
      email: req.body.email,
      password: req.body.password,
    });

    newUser
      .save()
      .then(() => res.json("User added!"))
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (err) {
    res.json({ status: "error", error: "Duplicate email" });
  }
});

router.route("/add").post((req, res) => {
  const username = req.body.username;

  const newUser = new User({ username });

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
