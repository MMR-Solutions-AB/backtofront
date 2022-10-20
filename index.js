const express = require("express");
const cors = require("cors");
const app = express();
const validator = require("validator");

const port = 3000;
/* Brandvägg */
app.use(
  cors({
    origin: "*",
  })
);
/* Parse vår data */
app.use(express.json());

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const user = users.find((user) => {
    return user.id == req.params.id;
  });
  /* Om user inte finns vill vi skicka medelande tillbaka user not found */
  if (!user) {
    return res.status(404).send({ message: "user not found" });
  }
  res.json(user);
});

app.post("/users", (req, res) => {
  const postData = req.body;
  /* Vi kollar att email är en emial */
  const check = validator.default.isEmail(postData.email);
  /* Om de inte är emial skickar vi tillbaka email not valid */
  if (!check) {
    return res.status(400).send({ message: "email not valid" });
  }

  console.log(req.body);

  res.send({ message: "Success" });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const users = [
  {
    name: "Rickard",
    status: true,
    id: 1,
  },
  {
    name: "Filip",
    status: false,
    id: 2,
  },
  {
    name: "Mendes",
    status: false,
    id: 3,
  },
  {
    name: "Jakob",
    status: false,
    id: 4,
  },
];
