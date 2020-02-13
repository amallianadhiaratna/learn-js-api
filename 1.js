const express = require('express');
const app = express();
const mysql = require('mysql')
const db =mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'Vostra123!',
    database : 'practice'
})
app.use(express.json());
db.connect()

app.get('/music', function(req, res){
    console.log('/music:', req.body);
    var sql='SELECT * FROM musicList';
    db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send(result)
    });
});

app.post('/music', function(req,res){
    var title=req.body.title;
    var link=req.body.link;
    var singer=req.body.singer;
    console.log(title,link,singer);
    var sql = 'INSERT INTO musicList (title,link,singer) VALUES (?,?,?)';
    db.query(sql, [title,link,singer], (err, result)=>{
        if(err) throw new Error({
            messages:"use JSON format"
        });
    });
    var sql = 'SELECT * FROM musicList WHERE title = ?';
    db.query(sql,title,(err,result)=>{
        if(err) throw err;
        res.send(result)
    });
});

app.post('/music/:id', function(req,res){
    var title=req.body.title;
    var link=req.body.link;
    var singer=req.body.singer;
    var id = req.params.id
    console.log(title,link,id);
    var sql = 'UPDATE musicList SET title=?, link=?, singer=? WHERE id = ?';
    db.query(sql, [title,link,singer,id], (err, result)=>{
    if(err) throw new Error ({
        messages:"id not found"
        });
    res.send({"messages":"id not found"})
    });

    var sql = 'SELECT * FROM musicList WHERE id = ?';
    db.query(sql,id,(err,result)=>{
        if(err) throw err;
        res.send(result)
    }); 
});

app.delete('/music/:id',function(req,res){
    var sql = 'DELETE from musicList WHERE id = ?';
        db.query(sql, req.params.id, (err, result)=>{
        if(err) throw err;
        console.log(result);    
    res.send({'messages':'Data terhapus'})
    });
});

app.listen(3000, function(){
    console.log('Running di port 3000!');
});
