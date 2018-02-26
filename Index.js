let express = require('express');

let mysql = require('mysql');

let app = express();

let bodyParser = require('body-parser');

let middleware = require('./middleware/middleware');

let port = process.env.PORT || 8000;

let con = mysql.createConnection({
    host      : 'localhost',
    user      : 'root',
    password  : '1',
    database  : 'CRUDBook'
});

app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());

app.get('/get/', function(req, res) {
    con.query('select * from Books',function (err, result) {
        if(err) throw err;
        res.json(result);
    });
});

app.get('/book/:id', function (req, res) {
    con.query('select * from Books WHERE id =' + req.params.id, function (err, result) {
        if(err) throw err;
        res.json(result);
    });
});

app.put('/:id',function (req, res) {
    con.query('Update Books SET ? WHERE id = ' +req.params.id, req.body, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});

app.post('/post', middleware, function(req, res) {
    con.query('insert into Books set ?', req.body, function(err) {
        if(err) throw err;
        res.send('Success...!');
    });
});

app.delete('/delete/:id',function (req,res) {
    con.query('Delete from Books Where id ='+ req.params.id , function (err) {
        if(err) throw err;
        res.send("Success....!");
    });
});

app.listen(port, function () {
    console.log(" You access success on port " + port);
});