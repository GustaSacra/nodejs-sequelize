const { Router } = require("express");
const userRoutes = require("./modules/user/user.route");

const routes = Router();

routes.get("/health", (req, res) => {
  return res.status(200).json({ message: "Server on" });
});

routes.use("/users", userRoutes);

module.exports = routes;
