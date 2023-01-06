const express = require("express");
const { PORT } = require("./config/serverConfig");

const app = express();

const serverUpAndStart = () => {
  app.listen(PORT, () => {
    console.log(`server is started at port ${PORT}`);
  });
};

serverUpAndStart();
