//서버 띄우기 위한 소스
let express = require('express');
let http = require('http');
let app = express();
let server = http.createServer(app).listen(80);
// 서버 띄우기 위한 소스

var bodyParser = require('body-parser'); //post 방식엔 바디로
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());



app.get('/prc', function(req, res) {
  res.sendfile("Prc.html");
});



app.get('/getItem', function(req, res) {
  res.sendfile("Prc.html");
});




app.post('/priceCheck', function(req, res) {
  itemList = [{
      name: "item1",
      price: 1000
    },
    {
      name: "item2",
      price: 5000
    },
    {
      name: "item3",
      price: 10000
    },
    {
      name: "item4",
      price: 30000
    },
    {
      name: "item5",
      price: 50000
    },
    {
      name: "item6",
      price: 100000
    },
    {
      name: "item7",
      price: 500000
    }
  ]

  //
  // let itemName = "구매불가";
  // const price = req.query.price;
  // for(let i = 0; i < itemList.length; i++){
  //   if(itemList[i].price <= price){
  //     itemName = itemList[i].name;
  //   }
  // }



  newPrice = Number(req.body.price);
  let itemName;
  console.log(newPrice);
  for (let i = 0; i < itemList.length; i++) {
    if (newPrice == itemList[i].price) {
      console.log(itemList[i].price);
      newPrice = itemList[i].price;
      itemName = itemList[i].name;
      break;
    } else if (i == 0 && newPrice < itemList[i].price){
      itemName = "구입불가";

      break;
    } else if (i != 0 && newPrice < itemList[i].price && newPrice > itemList[i-1].price){
      itemName = itemList[i-1].name;
      break;
    }


  }

  res.send(itemName);



});
