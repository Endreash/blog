// const BlogPost = require("../models/BlogPost.js");
// const path = require("path");
// module.exports = (req, res) => {
//   let image = req.files.image;
//   image.mv(
//     path.resolve(__dirname, "..", "public/img", image.name),
//     async (error) => {
//       await BlogPost.create({
//         ...req.body,
//         image: "/img/" + image.name,
//         userid: req.session.userId, //is populated with the logged in user id in loginUser.js when a user logs in.
//       });
//       console.log(req.body)
//       res.redirect("/");
//     }
//   );
// };

const BlogPost = require("../models/BlogPost.js");
const path = require("path");

module.exports = async (req, res) => {
  try {
    await BlogPost.create(
      {...req.body,
      userid: req.session.userId}
      );
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};
