require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

const sequelize = require("./db");
const User = require("./models/User");

app.use(cors());
app.use(express.json());

const userRouter = require("./routes/user");
app.use("/api/users", userRouter);

sequelize
  .sync({ force: false })
  .then(() => console.log("Tables synced"))
  .catch((err) => console.error("Error syncing tables:", err));

app.get("/", (req, res) => {
  res.send("Hello from HiddenPro Backend!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
