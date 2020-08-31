const express = require('express')
const mysql = require('mysql')
const app = express();

//Create Connection
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'anuong'
});

//connect to database
conn.connect((err) => {
    if (err) throw err;
    console.log('Mysql Connected...');
});


app.get('/',(req,res)=>{
    let sql = "select * from  sanpham"
    let query = con.query(sql,(err,result)=>{
        if(err){
            console.log('that bai')
        }
        else{
            res.
            console.log('thanh cong')
        }
    })
})
app.listen(3000);