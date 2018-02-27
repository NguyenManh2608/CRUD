let express = require('express');
let mysql = require('mysql');
let bodyParser = require('body-parser');
let mdw = require('./middleware/mdtitle');
let app = express();

let port = process.env.PORT || 8000;
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

let con = mysql.createConnection({
    host      : 'localhost',
    user      : 'root',
    password  : '1',
    database  : 'CRUDBook'
});

app.get('/books/get', function(req, res) {
    con.query('SELECT id, title, author, publisher, price FROM Books WHERE isDelete = 0', function (err, result) {
        if(err) throw err;
        res.json(result);
    });
});

app.get('/book/get/:id', function (req, res) {
    con.query('SELECT id, title, author, publisher, price FROM Books WHERE id = ? limit 1',
        req.params.id,
        function (err, result) {
        if(err)  res.status(404).send({ message : " Not Found this file"});
        res.json(result);
    });
});


app.put('/book/:id',mdw.checkAuthortLength,mdw.checkIt,mdw.checkTitleLength ,function (req, res) {
    con.query('UPDATE Books SET ? WHERE id = '+ req.params.id, req.body, function (err) {
        if (err) throw err;
        res.status(200).send({ message : "Update  id = "+ req.params.id + " Success"});
    });
});

app.post('/book/post',mdw.checkAuthortLength,mdw.checkIt,mdw.checkTitleLength , function(req, res) {
    con.query('INSERT INTO Books SET ?', req.body, function(err) {
        if(err) throw err;
        res.status(201).send({ message : "Create a data success"})
    });
});

app.delete('/book/delete/:id',function (req,res) {
    con.query('UPDATE Books SET isDelete = 1 WHERE id ='+ req.params.id , function (err) {
        if(err) throw err;
        res.status(200).send({ message : "You've been deleted !!!"});
    });
});

app.listen(port, function () {
    console.log(" You access success on port " + port);
});