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

app.get('/ajaP', function(req, res) {
  res.sendfile("ajaP.html");
});


app.get('/stuIP', function(req, res) {
  console.log(req.query.no);
  connection.query(`SELECT NO, NAME FROM student where no=${req.query.no}`,
    function(error, results, fiedls) {
      if (error) throw error;
      res.send(results);

    });
});
