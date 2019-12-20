var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'fml'
});
 
connection.connect(function(error){
  if(error) throw error;
  console.log('database konek!');
});

module.exports = connection;


