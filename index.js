const express = require('express');
const app = express(); 
const bodyParser = require('body-parser');
const user = require('./controller/user_controll');
const penjual = require('./controller/penjual');
const makanan = require('./controller/makanan');
const minuman = require('./controller/minuman');
const transaksi = require('./controller/transaksi');



var mysqlAdmin = require('node-mysql-admin');
app.use(mysqlAdmin(app));


// body-parser 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// router api
app.use('/api',user);
app.use('/api',penjual);
app.use('/api',makanan);
app.use('/api',minuman);
app.use('/api',transaksi);

// say helooo
app.get('/', (req, res) => { 
    res.send('Hello gays');
  });

app.listen(process.env.PORT || 2000, () => console.log("server berjalan pada http://localhost:2000"))