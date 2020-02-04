const mysql=require('mysql')

// const db=mysql.createConnection({
//     host:'db4free.net',
//     user:'idham14',
//     password:'Idham1231',
//     database:'day7idham',
//     port:'3306'
// })

const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'idham',
    database:'projectakhir',
    port:'3306'
})


module.exports=db