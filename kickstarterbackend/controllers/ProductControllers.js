const {mysqldb} = require('./../connection/index')
const fs = require('fs')
const {uploader} = require('./../helper/uploader')
const paginate = require('jw-paginate')

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
            if(err) {
                res.status(500).send({message:err}
            )}else{
                console.log(result)
                return res.status(200).send(result)
            }
        })
    },
    getProjectUser:(req,res)=>{
        // console.log(req.params)
        // var sql = `select * from projectusers p where p.iduser=${req.params.id} and p.deleted=0;`
        var sql=`select ps.*,sum(case when d.confirm=1 then d.jumlahdonasi else 0 end)/ps.targetuang*100 as percentdonate from projectusers ps left join donation d on ps.id=d.idproject where ps.iduser=${req.params.id} and ps.deleted=0 group by ps.id;`
        mysqldb.query(sql,(err,result)=>{
            if(err) {
                res.status(500).send({message:err}
            )}else{
                console.log(result)
                return res.status(200).send(result)
            }
        })
    },
    getFeatured:(req,res)=>{
        // var sql = `select p.*,u.username from projectusers p join users u on p.iduser=u.id where deleted=0 limit 1;`
        // var sql = `select ps.*,u.username,sum(case when d.confirm=1 then d.jumlahdonasi else 0 end)/ps.targetuang*100 as percentdonate from projectusers ps left join users u on ps.iduser=u.id left join donation d on d.idproject=ps.id where deleted=0 order by id limit 1;`
        // var sql = `select ps.*,u.username,sum(case when d.confirm=1 then d.jumlahdonasi else 0 end)/ps.targetuang*100 as percentdonate from projectusers ps join users u on ps.iduser=u.id left join donation d on d.idproject=ps.id where ps.id=${id} and deleted=0;`
        var sql = `select ps.*,u.username,sum(case when d.confirm=1 then d.jumlahdonasi else 0 end)/ps.targetuang*100 as percentdonate from projectusers ps join users u on ps.iduser=u.id left join donation d on d.idproject=ps.id where ps.deleted=0 group by ps.id order by rand() limit 1;`
        mysqldb.query(sql,(err,result)=>{
            if(err) res.status(500).send({message:err})
            res.status(200).send(result)
        })
    },
    getProjectDetail:(req,res)=>{
        console.log(req.params, 'apramsdetail')
        let {id} = req.params
        var sql = `select ps.*,u.username,sum(case when d.confirm=1 then d.jumlahdonasi else 0 end)/ps.targetuang*100 as percentdonate from projectusers ps join users u on ps.iduser=u.id left join donation d on d.idproject=ps.id where ps.id=${id} and ps.deleted=0;`
        mysqldb.query(sql,(err,result)=>{
            if(err) res.status(500).send({message:err})
            console.log(result, 'result')
            return res.status(200).send(result)
        })
    },
    getProjectRecommended:(req,res)=>{
        var sqlcount=`select count(*) as count from projectusers where deleted=0`

        let dataCount
        mysqldb.query(sqlcount, (err1,result1)=>{
        if(err1) res.status(500).send({message:error})
        dataCount = result1[0].count
        //trigger pindah page
        // console.log(dataCount)
        const page = parseInt(req.params.page) || 1
        const pageSize = 3;
        const pager = paginate(dataCount, page, pageSize)
        
        //untuk limit database
        let offset
        if(page === 1){
            offset=0
        }else{
            offset=pageSize*(page -1)
        }
        // console.log(req.params.page)
        var sql=`select ps.*,u.username,sum(case when d.confirm=1 then d.jumlahdonasi else 0 end)/ps.targetuang*100 as percentdonate from projectusers ps left join users u on ps.iduser=u.id left join donation d on d.idproject=ps.id where ps.deleted=0 group by ps.id limit ? offset ?;`
        mysqldb.query(sql,[pageSize,offset],(err2,result2)=>{
            if(err2) res.status(500).send({message:err2})
            const pageOfdata = result2
            return res.status(200).send({pageOfdata, pager})
        })
         })
    }
}