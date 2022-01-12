const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

const PORT = 3001;

db.sequelize.sync().then((req) => {
  if (process.env.NODE_ENV !== "test") {
    app.listen(process.env.PORT || PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
});

app.use(require("./routes/inventory.routes.js"));
app.use(require("./routes/location.routes.js"));

module.exports = app;
