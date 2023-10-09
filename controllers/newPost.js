module.exports = (req, res) => {
  if (req.session.userId) { // checking for a session id before allowing a user to create a blog post
    return res.render("create",{
      createPost: true
      });
  }
  res.redirect("/auth/login");
};
