//서버 띄우기 위한 소스
let express = require('express');
let http = require('http');
let app = express();
let server = http.createServer(app).listen(80);
// 서버 띄우기 위한 소스
var mysql = require('mysql');
var url = require('url');
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

app.get('/list', function(req, res) {
  res.sendfile("listForm.html");
});

app.get('/ListPrint', function(req, res) {
  connection.query(`SELECT * FROM item`,
    function(error, results, fields) {
      console.log(results);
      res.send(results)


    })
});

app.delete('/delete', function(req, res) {
  let number = req.body.numbers
  connection.query(`DELETE FROM item WHERE NO=${number}`,
    function(error, results, fields) {
      res.send(number)

    })
});

app.get('/update', function(req, res) {
  res.sendfile("updateForm.html");
});

app.put('/update_action', function(req, res) {
  let name = req.body.itemName;
  let price = req.body.itemPrice;
  let number = req.body.number;
  console.log(name);
  console.log(price);
  console.log(number);


  connection.query(
    `SELECT * FROM item WHERE itemName="${name}" OR itemPrice=${price}
          order by itemPrice`,
    function(error, results, fields) {
      console.log(results);

      let len = results.length
      console.log(len);
      if (len == 0) {
        connection.query(`UPDATE item SET itemName='${name}', itemPrice=${price} WHERE NO=${number}`,
          function(error, results, fields) {
            console.log(results);
            res.send(results)
          });
      }
      if (len != 0) {


        if (results[0].itemName == name && results[0].itemPrice == price) {
          res.send("동일한 이름과 가격을 가진 아이템이 존재합니다")
        } else if (results[0].itemName == name) {
          res.send("동일한 이름을 가진 아이템이 존재합니다")
        } else if (results[0].itemPrice == price) {
          res.send("동일한 가격을 가진 아이템이 존재합니다.")
        }

        if (len >= 2) {
          res.send("동일한 이름, 가격이 각각 존재합니다 ")
        }
      }
    });

});



app.post('/selectData', function(req, res) {
  let number = req.body.No;
  connection.query(`SELECT * FROM item WHERE NO=${number}`,
    function(error, results, fields) {
      console.log(results);
      res.send(results)
    })
});






app.post('/priceCheck', function(req, res) {
  let name = req.body.itemName;
  let price = req.body.itemPrice;
  console.log(name);
  console.log(price);


  connection.query(`SELECT * FROM item WHERE itemName='${name}' or itemPrice=${price}`,
    function(error, results, fields) {
      console.log(results);
      let len = results.length
      if (len == 0) {
        connection.query(`INSERT INTO item (itemName, itemPrice) VALUE ('${name}', ${price})`,
          function(error, results, fields) {
            console.log(results);
            res.send("입력 성공")
          })
      } else {
        res.send("중복값이 있어")
      }


  });







});
