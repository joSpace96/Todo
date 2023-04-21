const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, function () {
  console.log("listening on 3000");
});

app.get("/", function (res, req) {
  req.sendFile(__dirname + "/index.html");
});

app.get("/write", function (res, req) {
  req.sendFile(__dirname + "/write.html");
});

app.post("/add", function (res, req) {
  console.log(res.body);
  req.send("전송완료");
});
