const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const db = require("./models/db");

app.use(express.json());
// app.use(session({secret: "secret"}));

// app.use(passport.initialize());
// app.use(passport.session());

app.use("/", require("./routes/route"));

app.listen(port, () => {
  console.log(`connection is successful at ${port}`);
});
