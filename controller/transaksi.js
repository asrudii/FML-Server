const express = require('express');
const router = express.Router();
const connection = require('../models/connection');

// Lihat
router.get('/transaksi', function(req, res){

    connection.query('SELECT * FROM transaksi', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            res.json(rows);
            res.end();
        }
    });


});


// Register
router.post('/transaksi', function(req, res) {
   
    var sql ="INSERT INTO transaksi (id_transaksi, id_user, id_makanan, id_minuman, jml_makanan, jml_minuman, tgl_pesan, total_harga  ) VALUES ? ";
    const tgl_transaksi =  new Date();
    const data = [
        [   
            req.body.id_transaksi,
            req.body.id_user,
            req.body.id_makanan,
            req.body.id_minuman,
            req.body.jml_makanan,
            req.body.jml_minuman,
            tgl_transaksi,
            req.body.total_harga
        ]
    ];    

    connection.query(sql,[data], function (error, rows, fields){
        if(error){
            res.send('data berhasil masuk');
            console.log(tgl_transaksi);
        } else{
            res.send('data gagal masuk')
        }
        res.end();
    });

});

// edit
router.put('/transaksi/:id', function(req, res) {

    const tgl_transaksi =  new Date();

    var id = req.params.id;
    var userid = req.body.id_user;
    var makanaid = req.body.id_makanan;
    var minumanid = req.body.id_minuman;
    var jmlmakanan = req.body.jml_makanan;
    var jmlminuman = req.body.jml_minuman;
    var ttlharga = req.body.total_harga;

    var sql = "UPDATE transaksi SET id_user='"+ userid +"', id_makanan='"+ makanaid +"', id_minuman='"+ minumanid +"', jml_makanan='"+ jmlmakanan +"', jml_minuman='"+ jmlminuman +"', tgl_pesan='"+ tgl_transaksi +"', total_harga='"+ ttlharga +"' WHERE id_transaksi='"+ id +"' ";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " data diupdate");
      res.send('data update');
      res.end();
    });            

});


// hapus
router.delete('/transaksi/:id', function(req, res) {

    var id = req.params.id;

    var sql = "DELETE FROM transaksi WHERE id_transaksi = '"+ id +"'";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Number of records deleted: " + result.affectedRows);
        res.send('data dihapus');
        res.end();
    });

});



module.exports = router;