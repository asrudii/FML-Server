var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'remotemysql.com',
  user     : 'kyVOxu6CyV',
  password : 'XAfQwpgYc0',
  database : 'kyVOxu6CyV'
});
 
connection.connect(function(error){
  if(error) throw error;
  console.log('database konek!');
});

module.exports = connection;


