const express = require('express');
const router = express.Router();
const connection = require('../models/connection');

// Lihat
router.get('/minuman', function(req, res){

    connection.query('SELECT * FROM minuman', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            res.json(rows);
            res.end();
        }
    });


});


// Register
router.post('/minuman', function(req, res) {

    var sql ="INSERT INTO minuman (id_minuman, id_penjual, nama_minuman, harga_minuman) VALUES ? ";

    const data = [
        [   
            req.body.id_minuman,
            req.body.id_penjual,
            req.body.nama_minuman,
            req.body.harga_minuman
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
router.put('/minuman/:id', function(req, res) {

    var id = req.params.id;
    var penjual = req.body.id_penjual;
    var nama = req.body.nama_minuman;
    var harga = req.body.harga_minuman;

    var sql = "UPDATE minuman SET id_penjual='"+ penjual +"', nama_minuman='"+ nama +"', harga_minuman='"+ harga +"' WHERE id_minuman='"+ id +"' ";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " data diupdate");
      res.send('data update');
      res.end();
    });            

});


// hapus
router.delete('/minuman/:id', function(req, res) {

    var id = req.params.id;

    var sql = "DELETE FROM minuman WHERE id_minuman = '"+ id +"'";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Number of records deleted: " + result.affectedRows);
        res.send('data dihapus');
        res.end();
    });

});



module.exports = router;