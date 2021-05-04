//서버 띄우기 위한 소스
let express = require('express');
let http = require('http');
let app = express();
let server = http.createServer(app).listen(80);

var bodyParser = require('body-parser'); //post 방식엔 바디로
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());


var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'test'
});
connection.connect();

/////위는 건들지 말기/////

app.get('/userInfo', function(req, res) {
  res.sendfile("newTable2.html");
});


app.post('/newtableContent', function(req, res) {
  console.log(req.body.header, req.body.story);
  connection.query(`INSERT INTO news
(title, content)
VALUES
('${req.body.header}', '${req.body.story}')`,
    function(error, results, fields) {
    if(error) {
      res.send("not ok");
    }
    else if(results.affectedRows==1) {
      res.send("ok")
    }


    });
  });
