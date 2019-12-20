const express = require('express');
const router = express.Router();
const connection = require('../models/connection');

// Lihat
router.get('/makanan', function(req, res){

    connection.query('SELECT * FROM makanan', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            res.json(rows);
            res.end();
        }
    });


});


// Register
router.post('/makanan', function(req, res) {

    var sql ="INSERT INTO makanan (id_makanan, id_penjual, nama_makanan, harga_makanan) VALUES ? ";

    const data = [
        [   
            req.body.id_makanan,
            req.body.id_penjual,
            req.body.nama_makanan,
            req.body.harga_makanan
        ]
    ];    

    connection.query(sql,[data], function (error, rows, fields){
        if(error){
            res.send('daftar tidak berhasil');
        } else{
            res.send('data berhasil ditambahkan')
        }
        res.end();
    });

});

// edit
router.put('/makanan/:id', function(req, res) {

    var id = req.params.id;
    var penjual = req.body.id_penjual;
    var nama = req.body.nama_makanan;
    var harga = req.body.harga_makanan;

    var sql = "UPDATE makanan SET id_penjual='"+ penjual +"', nama_makanan='"+ nama +"', harga_makanan='"+ harga +"' WHERE id_makanan='"+ id +"' ";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " data diupdate");
      res.send('data update');
      res.end();
    });            

});


// hapus
router.delete('/makanan/:id', function(req, res) {

    var id = req.params.id;

    var sql = "DELETE FROM makanan WHERE id_makanan = '"+ id +"'";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Number of records deleted: " + result.affectedRows);
        res.send('data dihapus');
        res.end();
    });

});



module.exports = router;