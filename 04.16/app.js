//서버 띄우기 위한 소스
let express = require('express');
let http = require('http');
let app = express();
let server = http.createServer(app).listen(80);
// 서버 띄우기 위한 소스


app.get('/prc', function(req, res) {
  res.sendfile("Prc.html");
});


var bodyParser = require('body-parser'); //post 방식엔 바디로
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());



app.get('/getNews', function(req, res) {
  connection.query(`SELECT * FROM news`,
   function(error, results, fields) {
     if(error) console.log(error);
      res.send(results); ///cmd 콘req

    });
});


app.get('/radio', function(req, res) {
  res.sendfile("radio.html");
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
