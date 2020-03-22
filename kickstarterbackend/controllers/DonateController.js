const {mysqldb} = require('./../connection/index')
const fs = require('fs')
const {uploader} = require('./../helper/uploader')


module.exports={
    postDonate:(req,res)=>{
        var sql = `insert into donation set ?`
        try{
            const path = "/usersproject/images"
            const upload = uploader(path, 'PROJECTUSERS').fields([{name:'image'}])

            upload(req,res,err=>{
                // console.log(req.files,'asd')
                if(err){
                    return res.status(500).send({message:'upload gagal', error:err.message})
                }
                console.log(JSON.parse(req.body.data))
                
                const { image } =req.files
                const ImagePath = image ? path + '/' + image[0].filename : null
                const data = JSON.parse(req.body.data)
                data.buktidonasi = ImagePath

                var sql = 'insert into donation set ?'
                mysqldb.query(sql, data, (err,result)=>{
                    if(err){
                        return res.status(500).send({message:'there is an error on the server ', error:err.message})
                    }
                    sql=`select * from donation`
                mysqldb.query(sql,data, (err, results)=>{
                    if(err){
                        return res.status(500).send({message:'ada error pada server', error:err.message})
                    }
                    sql=`select * from donation`
                mysqldb.query(sql,(err1,results1)=>{
                    if(err1) res.status(500).send(err1)
                    res.status(200).send({dataProject:results1})
                })
                })
                })
            })

        }catch(error){
            console.log(error)
            res.send(error)
        }


        // mysqldb.query(sql,data,(err,result)=>{

        // })
    }
}