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
app.get('/kim', function(req, res) {
  res.sendfile("kim.html");
});


app.get('/form', function(req, res) {
  res.sendfile("form.html");
});

app.get('/id', function(req, res) {
  res.sendfile("id.html");
});

app.get('/table', function(req, res) {
  res.sendfile("table.html");
});


app.get('/ajaxPracticeForm', function(req, res) {
  res.sendfile("ajaxPracticeForm.html");
});


app.get('/studentInfoPractice', function(req, res) {
  console.log(req.query.no);
  connection.query(`SELECT NO, NAME FROM student where no=${req.query.no}`,
    function(error, results, fields) {
      if (error) throw error;
    res.send(results); ///cmd 콘req

    });
});
