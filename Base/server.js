//서버 띄우기 위한 소스
let express = require('express');
let http = require('http');
let app = express();
let server = http.createServer(app).listen(80);

app.get('/kim', function(req, res) {
  res.sendfile("kim.html");
});
