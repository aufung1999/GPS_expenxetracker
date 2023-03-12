const router = require("express").Router();
let User = require("../models/user");

const {
  createUser,
  userSignIn,
  signOut,
} = require('../controllers/user');

const { isAuth } = require('../middlewares/auth');

const {
  validateUserSignUp,
  userValidation,
  validateUserSignIn,
} = require('../middlewares/validation/user');

router.post('/register', validateUserSignUp, userValidation, createUser);
router.post('/sign-in', validateUserSignIn, userValidation, userSignIn);
router.post('/sign-out', isAuth, signOut);

module.exports = router;
