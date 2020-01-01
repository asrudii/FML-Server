var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'udidesain.com',
  user     : 'rudi',
  password : 'asEp@rUdi08',
  database : 'db_fml'
});
 
connection.connect(function(error){
  if(error) throw error;
  console.log('database konek!');
});

module.exports = connection;


