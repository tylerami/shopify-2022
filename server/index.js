const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use(require("./routes/inventory.routes.js"));
app.use(require("./routes/location.routes.js"));

const db = require("./models");

const PORT = 3001;

db.sequelize.sync().then((req) => {
  app.listen(process.env.PORT || PORT, () => {
    //console.log(`Server running on port ${PORT}`);
  });
});
module.exports = app;
