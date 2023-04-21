const express = require("express");
const app = express();

app.listen(3000, () => {
  console.log("Server listening on");
});

app.get("/pet", (req, res) => {
  res.send("<h1>댕댕이와 냐옹이</h1>");
});

app.get("/beauty", (req, res) => {
  res.send("<h1>뷰티용품을 쇼핑할수 있는 페이지 입니다용</h1>");
});

app.get("/beauty", (req, res) => {
  res.send("<h1>뷰티용품을 쇼핑할수 있는 페이지 입니다용</h1>");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/write", (req, res) => {
  res.sendFile(__dirname + "/write.html");
});
