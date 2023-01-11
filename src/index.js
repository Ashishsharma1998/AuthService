const bodyParser = require("body-parser");
const express = require("express");

const { PORT } = require("./config/serverConfig");
const apiRoutes = require("./routes/index");

// const userRepositroy = require("./repository/user-repository");

// const userService = require("./services/user-service");
const sequelize = require("sequelize");
// const db = require("./models/index");

const { User, Role } = require("./models/index");
const app = express();

const serverUpAndStart = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/api", apiRoutes);

  app.listen(PORT, async () => {
    console.log(`server is started at port ${PORT}`);
    if (process.env.DB_SYNC) {
      db.sequelize.sync({ alter: true });
    }

    // const repo = new userRepositroy();
    // const response = await repo.getById(1);
    // console.log(response);

    // const obj = new userService();
    // const token = obj.createToken({ email: "ashish@gmail.com", id: "1" });
    // console.log(token);

    // const user = await User.findByPk(1);
    // const role = await Role.findByPk(1);
    // console.log(user, role);
    // // user.addRole(role);
    // console.log(await user.hasRole(role));

    // const response = await user.getRoles();
    // const response = await role.getUsers();
    // console.log(response);
  });
};

serverUpAndStart();
