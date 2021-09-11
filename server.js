const express = require("express");

const log = console.log;
const app = express();
const path = require("path");
const sendMail = require("./mail");
require("dotenv").config();

//Data parsing
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/email", (req, res) => {
  log("Data: ", req.body);
  const { email, subject, text } = req.body;
  log("Lol1", email);
  log("Lol2", subject);
  log("Lol3", text);
  sendMail(email, subject, text, function (err, data) {
    if (err) {
      res.status(500).json({ message: "Internal error!" });
    } else {
      res.json({ message: "Message recieved!!!" });
    }
  });
  //   res.json({ message: "Message recieved!!!" });
});

app.get("/", (req, res) => {
  //   res.send("Welcome!");
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

const PORT = 8080;
app.listen(PORT, () => {
  log("Server is running on port - ", PORT);
});
