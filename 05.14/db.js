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
  connection.query
});

app.get('/prc', function(req, res) {
  connection.query(`INSERT INTO item VALUES (item${i},) `,
    function(error, results, fields) {
      console.log(results);
      let itemName = "구매불가";

      for(let i = 0; i < results.length; i++){
        if(results[i].itemPrice <= price){
          itemName = results[i].itemName;
        }
      }

      res.send(itemName)


    });
});



//
//
//
// app.post('/priceCheck', function(req, res) {
//
//   price = Number(req.body.price); get일때 ajax받아오기.
//   let name;
//   connection.query(SELECT itemPrice FROM item where itemPrice=price,
//     function(error, results, fields) {
//   console.log(results);
//
//     });
//
//
// });



app.post('/priceCheck', function(req, res) {
  let price = Number(req.body.price);
  console.log(price);
  connection.query(`SELECT * FROM item`,
    function(error, results, fields) {
      console.log(results);
      let itemName = "구매불가";

      for(let i = 0; i < results.length; i++){
        if(results[i].itemPrice <= price){
          itemName = results[i].itemName;
        }
      }

      res.send(itemName)


    });
});
