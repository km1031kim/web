//서버 띄우기 위한 소스
let express = require('express');
let http = require('http');
let app = express();
let server = http.createServer(app).listen(80);
// 서버 띄우기 위한 소스
var mysql = require('mysql');

var bodyParser = require('body-parser'); //post 방식엔 바디로
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());


var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'test'
});
connection.connect();


app.get('/prc', function(req, res) {
  res.sendfile("Prc.html");
});

app.get('/insertForm', function(req, res) {
  res.sendfile("insertForm.html");
});



app.get('/priceCheck', function(req, res) {

  let price = Number(req.query.price);
  console.log(price);

  connection.query(`SELECT * FROM item order by itemPrice`,
    function(error, results, fields) {
      console.log(results);
      let itemName = "구매불가";

      for (let i = 0; i < results.length; i++) {
        if (results[i].itemPrice <= price) {
          itemName = results[i].itemName;
        }
      }
      res.send(itemName)
    });
});


app.post('/insertDB', function(req, res) {
  let itemName = req.body.itemName;
  let itemPrice = Number(req.body.itemPrice);

  connection.query(
    `SELECT * FROM item WHERE itemName="${itemName}" OR itemPrice=${itemPrice}
        order by itemPrice`,
    function(error, results, fields) {
      console.log(results);

  let len = results.length
  console.log(len);
  if (len == 0) {
    connection.query(`INSERT INTO item
        (itemName, itemPrice)
        VALUES
        ('${itemName}', '${itemPrice}')`,
      function(error, results, fields) {
        res.send("입력완료");
      });
  }
  if (len == 1){

    if (results[0].itemName == itemName && results[0].itemPrice == itemPrice){
      res.send("동일한 이름과 가격을 가진 아이템이 존재합니다")
    }
    else if(results[0].itemName == itemName){
      res.send("동일한 이름을 가진 아이템이 존재합니다")
    }

    else if(results[0].itemPrice == itemPrice){
      res.send("동일한 가격을 가진 아이템이 존재합니다.")
    }

  if (len >= 2){
    res.send("동일한 이름, 가격이 각각 존재합니  ")
  }

  });
});
