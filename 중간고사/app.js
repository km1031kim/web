//서버 띄우기 위한 소스
let express = require('express');
let http = require('http');
let app = express();
let server = http.createServer(app).listen(80);


// DB 접근
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'test'
});



app.get('/work1', function(req, res) {
  res.sendfile("work1.html");
});

app.get('/work2', function(req, res) {
  res.sendfile("work2.html");
});

app.get('/work3', function(req, res) {
  res.sendfile("work3.html");
});

app.get('/work4', function(req, res) {
  res.sendfile("work4.html");
});


//post 방식. bodyParser 사용
var bodyParser = require('body-parser'); //post 방식엔 바디로
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.post('/insertStudent', function(req, res) {
  console.log(req.body.studentNo, req.body.Name);
  connection.query(`INSERT INTO student
(studentNo, studentName)
VALUES
('${req.body.studentNo}', '${req.body.Name}')`,
    function(error, results, fields) {
    res.send(results);

    });
});
