const {mysqldb} = require('./../connection/index')
const fs = require('fs')
const {uploader} = require('./../helper/uploader')

module.exports={
    postProject:(req,res)=>{
        console.log('masukbrok', req.body)
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
                data.gambarproject = ImagePath

                var sql = 'insert into projectusers set ?'
                mysqldb.query(sql, data, (err,result)=>{
                    if(err){
                        return res.status(500).send({message:'there is an error on the server ', error:err.message})
                    }
                    sql=`select * from projectusers`
                mysqldb.query(sql,data, (err, results)=>{
                    if(err){
                        return res.status(500).send({message:'ada error pada server', error:err.message})
                    }
                    sql=`select * from projectusers`
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

        // const data={
        //     namaproject:'a',
        //     gambarproject:'a',
        //     deskripsiproject:'a',
        //     targetwaktu:'123',
        //     targetuang:'123',
        //     categoryproject:'123'

        // }

        // var sql =  `insert into projectusers set ?`
        // mysqldb.query(sql,data, (err,result)=>{
        //     if (err) res.status(500).send({message:err})
        //     return res.status(200).send(result)
        // })

        // console.log('masuk post project')
    },
    deleteProject:(req,res)=>{
        const {id} = req.params
        console.log(id)

        var sql = `DELETE FROM projectusers WHERE id=${id};`

        mysqldb.query(sql, (err,result)=>{
            if(err) res.status(500).send({message:err})
            return res.status(200).send(result)
        })
    },
    editProject:(req,res)=>{

    },
    getProject:(req,res)=>{
        var sql = `select * from projectusers p where p.deleted=0;`

        mysqldb.query(sql,(err,result)=>{
            if(err) res.status(500).send({message:err})
            console.log(result)
            return res.status(200).send(result)
        })
    },
    getProjectUser:(req,res)=>{
        console.log(req.params)
        var sql = `select * from projectusers p where p.iduser=${req.params.id} and p.deleted=0;`
        mysqldb.query(sql,(err,result)=>{
            if(err) res.status(500).send({message:err})
            console.log(result)
            return res.status(200).send(result)
        })
    }
}