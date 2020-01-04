const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const connection = require('../models/connection');


router.get('/user', function(req, res){
    
    connection.query('SELECT * FROM user', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            res.json(rows);
            res.end();
        }
    });


});



// Registerrr
router.post('/register', function(req, res) {

    var sql ="INSERT INTO user ( user_name, email, password, image, telp) VALUES ? ";

    
    const gambar = '-'
    const data = [
        [   
            req.body.username,
            req.body.email, 
            req.body.password,
            gambar,
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


// datausers
router.get('/userlogin', function(req, res){
    var decoded = jwt.verify(req.header['authorization'], 'asepGanteng');
    var _id = decoded._id;
    connection.query('SELECT * FROM user WHERE id_user = ?',[_id], function (error, results, fields) {
        if (error) throw error;
        res.json(results);
        res.end();
    });
});

// login
router.post('/login', function(req, res) {
    var email= req.body.email;
    var password = req.body.password;
    connection.query('SELECT * FROM user WHERE email = ?',[email], function (error, results, fields) {
        if (error) {
          // console.log("error ocurred",error);
          res.json({
            "code":400,
            "failed":"error ocurred"
          })
        }else{
          // console.log('The solution is: ', result),aas////s'''
          if(results.length >0){
            if(results[0].password == password){
                const payload = {
                    _id: results[0].id_user,
                    username: results[0].user_name,
                    email: results[0].email,
                    telp: results[0].telp,
                }
                let token = jwt.sign(payload, 'asepGanteng', {
                    expiresIn: 1440
                })
                res.send(token)
            }
            else{
              res.json({
                "code":204,
                "success":"password anda salah"
              });
            }
          }
          else{
            res.json({
              "code":204,
              "success":"Email tidak ada"
                });
          }
        }
    });
});

router.put('/user/:id', function(req, res) {

    var id = req.params.id;
    var nama = req.body.username;
    var mail = req.body.email;
    var pwd = req.body.password;
    var lahir = req.body.birth;
    var alamat = req.body.address;    
    var ktp = req.body.id_card;
    var gambar = req.body.image;

    var sql = "UPDATE user SET user_name='"+ nama +"', email='"+ mail +"', password='"+ pwd +"', birth='"+ lahir +"', address='"+ alamat +"', id_card='"+ ktp +"', image='"+gambar+"' WHERE id_user='"+ id +"' ";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
      res.send('data update');
      res.end();
    });            

});



module.exports = router;