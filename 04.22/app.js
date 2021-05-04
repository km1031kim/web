//서버 띄우기 위한 소스
let express = require('express');
let http = require('http');
let app = express();
let server = http.createServer(app).listen(80);
// 서버 띄우기 위한 소스


app.get('/prc', function(req, res) {
  res.sendfile("radioArray2.html");
});



app.get('/prc2', function(req, res) {
  res.sendfile("radioArray3.html");
});




app.get('/prc3', function(req, res) {
  res.sendfile("radioArray3.html");
});
