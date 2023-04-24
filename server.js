const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use("/public", express.static("public"));

// mongodb 연결
var db;
const MongoClient = require("mongodb").MongoClient;
MongoClient.connect(
  "mongodb+srv://admin:1q2w3e4r@cluster0.yvz01u3.mongodb.net/?retryWrites=true&w=majority",
  { useUnifiedTopology: true },
  (err, client) => {
    if (err) return console.log(err);
    db = client.db("todo");
    app.listen(3000, () => {
      console.log("listening on 3000");
    });
  }
);

app.get("/", (req, res) => {
  res.render("index.ejs", {});
});

app.get("/write", (req, res) => {
  res.render("write.ejs", {});
});

app.post("/add", (res, req) => {
  req.send("전송완료");
  // db에 있는 counter라는 컬렉션을 찾고 그 안에 있는 Posts를 찾고 Posts를 변수에 저장
  db.collection("counter").findOne({ name: "Posts" }, (err, result) => {
    console.log(result.totalPost);
    let totalPost = result.totalPost;
    // db에 있는 post라는 컬렉션에 id, title, date를 넣어줌
    db.collection("post").insertOne(
      {
        _id: totalPost + 1,
        title: res.body.title,
        date: res.body.date,
      },
      // 위에 코드가 완료가 되면 db에 있는 counter 안에 있는 Posts를 수정해줌
      (err, data) => {
        console.log("저장완료");
        db.collection("counter").updateOne(
          { name: "Posts" } /*수정할 데이터*/,
          { $inc: { totalPost: 1 } } /*$operator 필요 수정값*/,
          (err, result) => {
            if (err) {
              return console.log(err);
            }
          }
        );
      }
    );
  });
});

app.get("/list", (req, res) => {
  db.collection("post")
    .find()
    .toArray((err, result) => {
      console.log(result);
      res.render("list.ejs", { posts: result });
    });
});

app.delete("/delete", (req, res) => {
  // req.body는 _id
  console.log(req.body);
  req.body._id = parseInt(req.body._id);
  // req.body에 담겨온 게시물번호를 가진 글을  db에서 찾아서 삭제
  db.collection("post").deleteOne(req.body, (err, result) => {
    console.log("삭제완료");
    res.status(200).send({ message: "성공했습니다" });
  });
});

// : URL의 parameter
app.get("/detail/:id", (req, res) => {
  // req.params.id = 파라미터중 id값을 찾아서 가져옴

  db.collection("post").findOne(
    { _id: parseInt(req.params.id) },
    (err, result) => {
      if (result === null) {
        console.log("데이터가 없엉");
        res.send("데이터가 없음");
      } else {
        console.log(result);
        res.render("detail.ejs", { data: result });
      }
    }
  );
});
