//서버 띄우기 위한 소스
let express = require('express');
let http = require('http');
let app = express();
let server = http.createServer(app).listen(80);
// 서버 띄우기 위한 소스

// npm install mysql
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'test'
});
connection.connect();

//리퀘스트를 받고 리스폰을 주는 서버 주소 생성, 그리고 리스폰 줄


app.get('/ajaxPracticeForm', function(req, res) {
  res.sendfile("ajaxPracticeForm.html");
});


var bodyParser = require('body-parser'); //post 방식엔 바디로
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//
//
// app.post('/postNews', function(req, res) {
//   console.log(req.body.title, req.body.content);
//   let title = req.body.title;
//   let content = req.body.content;
//
//   connection.query(`INSERT INTO news (title, content) VALUES('${title}', '${content}')`,
//     function(error, results, fields) {
//     res.send(results); ///cmd 콘req
//
//     });
// });

app.get('/getNews', function(req, res) {
  connection.query(`SELECT * FROM news`,
   function(error, results, fields) {
     if(error) console.log(error);
      res.send(results); ///cmd 콘req

    });
});


app.get('/gugu', function(req, res) {
  res.sendfile("gugudan.html");
});


app.get('/gugu', function(req, res) {
  res.sendfile("result.html");
});



app.get('/gugu2', function(req, res) {
  res.sendfile("result2.html");
});



app.get('/radio', function(req, res) {
  res.sendfile("radio3.html");
});



app.post('/postresult', function(req, res) {
  console.log(req.body.number, req.body.mulitply);
  let number = req.body.number;
  let mulitply = req.body.mulitply;

  for(let i = 0; i < mulitply+1; i++){
    result[i] = number * i
  }
    res.send(res);

});
