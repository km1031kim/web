a = [{
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


var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'test'
});
connection.connect();


for(let i = 0; i < a.length; i++){
  connection.query(`INSERT INTO item VALUES ("${a[i].name}",${a[i].price})`)
};
