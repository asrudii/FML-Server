const express = require('express');
const router = express.Router();
const connection = require('../models/connection');


router.get('/penjual', function(req, res){


    connection.query('SELECT * FROM penjual', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            res.json(rows);
            res.end();
        }
    });


});


// Register
router.post('/penjual', function(req, res) {

    var sql ="INSERT INTO penjual (id_penjual, nama_penjual, alamat, telp) VALUES ? ";

    const data = [
        [   
            req.body.id_penjual,
            req.body.nama_penjual,
            req.body.alamat, 
            req.body.telp
        ]
    ];    

    connection.query(sql,[data], function (error, rows, fields){
        if(error){
            res.send('daftar tidak berhasil')   
        } else{
            res.send('data berhasil ditambahkan')
        }
        res.end();
    });

});

router.put('/penjual/:id', function(req, res) {

    var id = req.params.id;
    var nama = req.body.nama_penjual;
    var alamat = req.body.alamat;
    var telp = req.body.telp;

    var sql = "UPDATE penjual SET nama_penjual='"+ nama +"', alamat='"+ alamat +"', telp='"+ telp +"' WHERE id_penjual='"+ id +"' ";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
      res.send('data update');
      res.end();
    });            

});

router.delete('/penjual/:id', function(req, res) {

    var id = req.params.id;

    var sql = "DELETE FROM penjual WHERE id_penjual = '"+ id +"'";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Number of records deleted: " + result.affectedRows);
        res.send('data dihapus');
        res.end();
    });

});



module.exports = router;