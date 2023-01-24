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
  log("Email - " + email + " Subject - " + subject + " Text - " + text);
  sendMail(email, subject, text, function (err, data) {
    if (err) {
      res.status(500).json({ message: "Internal error!" });
    } else {
      res.json({ message: "Message recieved!!!" });
    }
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

const PORTE = 8080;
const PORT = process.env.PORT;
app.listen(PORT || PORTE, () => {
  log("Server is running on port - ", PORT);
});
