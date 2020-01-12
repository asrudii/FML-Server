var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '35.239.176.240',
  user     : 'fmldb',
  password : 'asrudii08',
  database : 'dbfml'
});
 
connection.connect(function(error){
  if(error) throw error;
  console.log('database konek!');
});

module.exports = connection;


