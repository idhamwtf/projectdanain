const {mysqldb} = require('../connection')

module.exports={
    getusers:(req,res)=>{
        var sql=`select * from users`
        mysqldb.query(sql,(err,result)=>{
            if(err) res.status(500).send({status:'error',err})
            return res.status(200).send(result)
            
        })
    }
}