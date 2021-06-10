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


app.get('/', function(req, res) {
  res.sendfile("main.html");
});

app.get('/insertForm', function(req, res) {
  res.sendfile("insertPage.html");
});

app.post('/insertDB', function(req, res) {
  let stdNo = req.body.stdNo;
  let stdName = req.body.stdName;
  let jsScore = Number(req.body.jsScore);
  let pyScore = Number(req.body.pyScore);
  let javaScore = Number(req.body.javaScore);
  console.log(stdName);


  if(jsScore < 0 || jsScore > 100){
    res.send("javascript점수는 0 ~ 100 사이로 입력해주세요")
  }

  else if(pyScore < 0 || pyScore > 100){
    res.send("python 점수는 0 ~ 100 사이로 입력해주세요")
  }

  else if(javaScore < 0 || javaScore > 100){
    res.send("java점수는 post 0 ~ 100 사이로 입력해주세요")
  }
else {
  connection.query(`SELECT * FROM student WHERE studentNo='${stdNo}'`,
    function(error, results, fields) {
      console.log(results);
      let len = results.length;
      if (len == 0) {
        connection.query(
          `INSERT INTO student (studentNo, studentName, javascript, python, java) VALUES
        ('${stdNo}', '${stdName}', ${jsScore}, ${pyScore}, ${javaScore}) `,
          function(error, results, fields) {
            //  console.log(results);
            console.log(results);
            res.send(results)
          });
      } else {
        res.send("이미 존재하는 학번입니다.")
      }

    })
  }
});


app.get('/List', function(req, res) {
  res.sendfile("listPage.html");
});

app.get('/ListPrint', function(req, res) {
  connection.query(`SELECT * FROM student order by no`,
    function(error, results, fields) {
      console.log(results);
      res.send(results)
    });
});


app.get('/update', function(req, res) {
  res.sendfile("updatePage.html");
});



app.post('/selectData', function(req, res) {
  let number = req.body.No;
  connection.query(`SELECT * FROM student WHERE no=${number}`,
    function(error, results, fields) {
      console.log(results);
      res.send(results)
    })
});



app.put('/update_action', function(req, res) {
  let no = Number(req.body.no);
  let stdName = req.body.stdName;
  let jsScore = Number(req.body.jsScore);
  let pyScore = Number(req.body.pyScore);
  let javaScore = Number(req.body.javaScore);
  console.log(no);
  console.log(stdName);
  console.log(jsScore);
  console.log(pyScore);
  console.log(javaScore);


    if(jsScore < 0 || jsScore > 100){
      res.send("javascript점수는 0 ~ 100 사이로 입력해주세요")
    }

    else if(pyScore < 0 || pyScore > 100){
      res.send("python 점수는 0 ~ 100 사이로 입력해주세요")
    }

    else if(javaScore < 0 || javaScore > 100){
      res.send("java점수는 post 0 ~ 100 사이로 입력해주세요")
    }

else {
  connection.query(
    `UPDATE student SET studentName='${stdName}',
    javascript=${jsScore},
    python=${pyScore},
    java=${javaScore}
    WHERE no=${no}`,
    function(error, results, fields) {
      console.log(results);
      res.send(results)

    });
  }
});


app.delete('/delete', function(req, res) {
  let no = Number(req.body.no);
  connection.query(`DELETE FROM student WHERE no=${no}`,
    function(error, results, fields) {
      res.send(no + "")
    })
});



app.post('/stdSearch', function(req, res) {
  console.log(req.body.target);
  let target = req.body.target;
  sendList = [];

  if (target=="total"){
//    console.log("total");
    connection.query('SELECT *, rank() over(order by javascript+python+java DESC) AS rank FROM student',
    function(error, results, fields) {

      for(let i = 0; i < results.length; i++){
        if(results[i].rank == 1){
          console.log(results[i]);
          sendList.push(results[i])
        }
      } res.send(sendList)
    })

  } else if (target=="jsFirst"){

    connection.query('SELECT *, rank() over(order by javascript DESC) AS rank FROM student',
    function(error, results, fields) {

      for(let i = 0; i < results.length; i++){
        if(results[i].rank == 1){
          console.log(results[i]);
          sendList.push(results[i])
        }
      } res.send(sendList)
    })


  } else if (target=="pyFirst"){
    ;
    connection.query('SELECT *, rank() over(order by python DESC) AS rank FROM student',
    function(error, results, fields) {
        for(let i = 0; i < results.length; i++){
        if(results[i].rank == 1){
          console.log(results[i]);
          sendList.push(results[i])
        }
      } res.send(sendList)
    })

  } else if (target=="javaFirst"){
    console.log("total");
    connection.query('SELECT *, rank() over(order by java DESC) AS rank FROM student',
    function(error, results, fields) {
        for(let i = 0; i < results.length; i++){
        if(results[i].rank == 1){
          console.log(results[i]);
          sendList.push(results[i])
        }
      } res.send(sendList)
    })
  }


});
