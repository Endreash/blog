// const User = require("../models/User.js");
// const path = require("path");

// module.exports = async (req, res) => {
//   try {
//     await User.create(req.body);
//     res.redirect("/");
//   } catch (err) {
//     console.error(err);
//     res.status(500).send(err);
//   }
// };

const User = require("../models/User.js");
const path = require("path");
module.exports = (req, res) => {
  User.create(req.body, (error, user) => {
    if (error) {
      const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message) 
      // req.session.validationErrors = validationErrors
      req.flash('validationErrors',validationErrors)
      return res.redirect("/auth/register");
    }
    res.redirect("/");
  });
};