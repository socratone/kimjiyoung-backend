const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1111',
  database: 'kimjiyoung'
});

db.connect(error => {
  if (error) return console.error('error connecting: ' + error.stack);
  console.log('connected as id ' + db.threadId);
});

module.exports = db;