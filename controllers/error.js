exports.get404 = (req, res, next) => {
  res.status(404).redirect("/404");
};