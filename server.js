const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// mongodb 연결
var db;
const MongoClient = require("mongodb").MongoClient;
MongoClient.connect(
  "mongodb+srv://admin:1q2w3e4r@cluster0.yvz01u3.mongodb.net/?retryWrites=true&w=majority",
  { useUnifiedTopology: true },
  (err, client) => {
    if (err) return console.log(err);
    db = client.db("todo");

    db.collection("post").insertOne(
      { name: "Jo", age: 28, _id: 99 },
      (err, data) => {
        console.log("저장완료");
      }
    );

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
  db.collection("post").insertOne(
    {
      title: res.body.title,
      date: res.body.date,
    },
    (err, data) => {
      console.log("저장완료");
    }
  );
});
