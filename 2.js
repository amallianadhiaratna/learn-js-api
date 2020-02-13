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

function spotify(id,title,link,singer) {
    this.id = id;
    this.title = title;
    this.link = link;
    this.singer = singer;
}

app.get('/music', function(req, res){
    console.log('/music:', req.body);
    var sql='SELECT * FROM musicList';
    db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
    res.send(
    );
});
