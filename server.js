//kita ada 3 library
const express = require('express');
const mysql = require('mysql');
const BodyParser = require("body-parser")
// defini exprees untuk function menjadi app
const app = express();

//untuk ngpost form dari data
app.use(BodyParser.urlencoded({extended: true}))
//pemanggilan data ke html ejs menggunakan template engine
app.set ("view engine", "ejs")
app.set("views", "views")

// kode mysql
const db = mysql.createConnection({
   host: "localhost",
   database:"school",
   user:"root",
   password:"",

})

// pemanggilan mysql atau connetion ke data base 
db.connect((err) =>{
    if (err) throw err //funtion jika error, klao tidak err eksekusi
    console.log("database connected....")

    //untuk get data
    app.get("/", (req, res) =>{ //app sebagai nama funtion yang dipanggil
        const sql = "SELECT * FROM user"
        db.query(sql, (err, result) => {       
            const users = JSON.parse(JSON.stringify(result))
            // console.log("hasil database ->", users) //console.log sebgai pemanggilan ke terminal dari sisi server side   
    
            res.render("index", { users: users, title: "DAFTAR MURID" }); //sebagai pemabnggilan databse ke browser
        })
    })

    //untuk insert data
    app.post("/tambah", (req, res)=>{
        const insertSql = `INSERT INTO user (nama, kelas) VALUES ('${req.body.nama}','${req.body.kelas}');`
        db.query(insertSql, (err, result) =>{
          if (err) throw err
          res.redirect("/");
        })
         
      })

})

app.listen(8000, () => {
    console.log ("server redy...")
})