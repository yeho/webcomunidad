var express = require('express');
var router = express.Router();
var mysql = require("mysql");


var connection = mysql.createConnection({
    host: "127.0.0.1",
     port: "3306",
    user: "sitioweb",
    database: "web",
    password: "aaaa1111"
});

connection.connect((err) => {
    if (err) {
      console.log("YEHOError occurred", err);
    } else {
    /*  console.log("YEHOConnected to MySQL Server");
      connection.query('SELECT * FROM newsletter', (err,rows) => {
        if(err) throw err;

        console.log('YEHOData received from Db:');
        console.log(rows);
      });
*/
    }
});






/* GET newsletter*/
router.get('/', function(req, res, next) {
  res.render('newsletter', { });
});


/* POST guardado de correo */
router.post('/', function(req, res, next) {

 





  var name = req.body.fName;
    var email = req.body.Email;
    var data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: name
            }
        }]
    };
    var jsonData = JSON.stringify(data);



  res.render('newsletter', { });
});

module.exports = router;
