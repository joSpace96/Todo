const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const MongoClient = require("mongodb").MongoClient;
MongoClient.connect(
  "mongodb+srv://admin:<1q2w3e4r>@cluster0.yvz01u3.mongodb.net/?retryWrites=true&w=majority",
  (err, client) => {
    app.listen(3000, () => {
      console.log("listening on 3000");
    });
  }
);

app.get("/", (res, req) => {
  req.sendFile(__dirname + "/index.html");
});

app.get("/write", (res, req) => {
  req.sendFile(__dirname + "/write.html");
});

app.post("/add", (res, req) => {
  console.log(res.body.date);
  console.log(res.body.title);

  req.send("전송완료");
});
