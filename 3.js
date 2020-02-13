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
        if(err) {
            console.log({'messages':'error occur in inserting data: code '+err.code});
            res.send('error occur in inserting: code '+err.code)
        }
        else { console.log(result);
        res.send(result)};
    });
});

app.post('/music', function(req,res){
    var title=req.body.title;
    var link=req.body.link;
    var singer=req.body.singer;
    console.log(title,link,singer);
    var sql = 'INSERT INTO musicList (title,link,singer) VALUES (?,?,?)';
    db.query(sql, [title,link,singer], (err, result)=>{
        if(err) {
            // console.log({'messages':'error occur in inserting data: code '+err.code});
            res.send('error occur in inserting: code '+err.code)
        }
    });
    var sql = 'SELECT * FROM musicList WHERE title = ?';
    db.query(sql,title,(err,result)=>{
        if(err) {
            // console.log({'messages':'error occur in inserting data: code '+err.code});
            res.send('error occur in inserting: code '+err.code)
        };
        res.send(result)
    });
});

app.post('/music/:id', function(req,res){
    var title=req.body.title;
    var link=req.body.link;
    var singer=req.body.singer;
    var id = req.params.id
    console.log(title,link,id);
    var sql ='UPDATE musicList SET title=?, link=?, singer=? WHERE id = ?';
    var sql2 = 'SELECT * FROM musicList WHERE id = ?';
    db.query(sql2,id,(err,result)=>{
        if(err) throw err
        else {
            for (let k in result) {
                if (result[k]["id"] === id) {
                    console.log('ada');
                    res.send({"jaja":"ADA"});
                    // db.query(sql, [title,link,singer,id], (err, result2)=>{
                    //     if(err) throw err
                    //     else {
                    //         db.query(sql2,id,(err,result2)=>{
                    //             if(err) throw err;
                    //             res.send(result2)
                    //         });         
                    //     }
                    // });
                }
            }
        }
        // res.send(result)
    })
});

app.delete('/music/:id',function(req,res){
    var id =req.params.id
    var sql = 'DELETE from musicList WHERE id = ?';
    db.query(sql, id, (err, result)=>{
    if(err) throw err
    // console.log(result)
    else {
        for (let k in result) {
            if (result[k]["id"] === id) {
                console.log('ada');
                res.send({'messages':'Data terhapus'})
            }            
            else {
                res.send('gaada')
            }
        }
    };
});

app.listen(3000, function(){
    console.log('Running di port 3000!');
});

// Object.keys(result).forEach(function(key){
//     var row=result[key];
//     console.log(row.id);
//     res.send(row.id)
// })