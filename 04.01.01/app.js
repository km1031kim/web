//서버 띄우기 위한 소스
let express = require('express');
let http = require('http');
let app = express();
let server = http.createServer(app).listen(80);
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'test'
});
connection.connect();

//리퀘스트를 받고 리스폰을 주는 서버 주소 생성, 그리고 리스폰 줄


app.get('/for', function(req, res) {
  res.sendfile("for.html");
});








var bodyParser = require('body-parser'); //post 방식엔 바디로
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.post('/studentInfoPractice', function(req, res) {
  console.log(req.body.studentNo, req.body.Name, req.body.age);
  connection.query(`INSERT INTO student
(studentNo, name, age)
VALUES
('${req.body.studentNo}', '${req.body.Name}', ${req.body.age})`,
    function(error, results, fields) {
    res.send(results); ///cmd 콘req

    });
});
