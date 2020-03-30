const {mysqldb} = require('./../connection/index')
const fs = require('fs')
const {uploader} = require('./../helper/uploader')
const paginate = require('jw-paginate')

module.exports={
    getCategory:(req,res)=>{
        var sql = `select * from category`
        mysqldb.query(sql,(err,result)=>{
            if (err) res.status(500).send({message:err})
            return res.status(200).send(result)
        })
    },
    postProject:(req,res)=>{
        // console.log('masukbrok', req.body)
        try{
            const path = "/usersproject/images"
            const upload = uploader(path, 'PROJECTUSERS').fields([{name:'image'}])

            upload(req,res,err=>{
                if(err){
                    return res.status(500).send({message:'upload gagal', error:err.message})
                }
                // console.log(JSON.parse(req.body.data))
                
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
    },
    deleteProject:(req,res)=>{
        var sql = `DELETE FROM projectusers WHERE id=${id};`

        mysqldb.query(sql, (err,result)=>{
            if(err) res.status(500).send({message:err})
            return res.status(200).send(result)
        })
    },
    editProject:(req,res)=>{
        // console.log('masukbrok', req.body)
        // console.log('params', req.params.id)
        try{
            const path = "/usersproject/images"
            const upload = uploader(path, 'PROJECTUSERS').fields([{name:'image'}])

            upload(req,res,err=>{
                if(err){
                    return res.status(500).send({message:'upload gagal', error:err.message})
                }
                // console.log(JSON.parse(req.body.data))
                
                const { image } =req.files
                const ImagePath = image ? path + '/' + image[0].filename : null
                const data = JSON.parse(req.body.data)
                data.gambarproject = ImagePath

                var sql = `update projectusers set ? where id=${req.params.id}`
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
    },
    getProject:(req,res)=>{
        var sql = `select p.*,c.category from projectusers p left join category c where p.categoryproject=c.id where p.deleted=0;`

        mysqldb.query(sql,(err,result)=>{
            if(err) {
                res.status(500).send({message:err}
            )}else{
                return res.status(200).send(result)
            }
        })
    },
    getProjectUser:(req,res)=>{
        // console.log(req.params)
        // var sql = `select * from projectusers p where p.iduser=${req.params.id} and p.deleted=0;`
        var sql=`select ps.*,c.category,sum(case when d.confirm=1 then d.jumlahdonasi else 0 end)/ps.targetuang*100 as percentdonate from projectusers ps left join donation d on ps.id=d.idproject left join category c on c.id=ps.categoryproject where ps.iduser=${req.params.id} and ps.deleted=0 group by ps.id;`
        mysqldb.query(sql,(err,result)=>{
            if(err) {
                res.status(500).send({message:err}
            )}else{
                // console.log(result)
                return res.status(200).send(result)
            }
        })
    },
    getFeatured:(req,res)=>{
        var sql = `select ps.*,c.category,u.username,sum(case when d.confirm=1 then d.jumlahdonasi else 0 end)/ps.targetuang*100 as percentdonate from projectusers ps join users u on ps.iduser=u.id left join donation d on d.idproject=ps.id left join category c on c.id=ps.categoryproject where ps.deleted=0 group by ps.id order by rand() limit 1;`
        mysqldb.query(sql,(err,result)=>{
            if(err) res.status(500).send({message:err})
            res.status(200).send(result)
        })
    },
    getNewestProject:(req,res)=>{
        var sql = `select ps.*,c.category,u.username,sum(case when d.confirm=1 then d.jumlahdonasi else 0 end)/ps.targetuang*100 as percentdonate from projectusers ps join users u on ps.iduser=u.id left join donation d on d.idproject=ps.id left join category c on c.id=ps.categoryproject where ps.deleted=0 group by ps.id order by ps.id desc limit 4;`
        mysqldb.query(sql,(err,result)=>{
            if(err) res.status(500).send({message:err})
            res.status(200).send(result)
        })
    },
    getProjectDetail:(req,res)=>{
        // console.log(req.params, 'paramsdetail')
        let {id} = req.params
        var sql = `select ps.*,c.category,u.username,sum(case when d.confirm=1 then d.jumlahdonasi else 0 end)/ps.targetuang*100 as percentdonate from projectusers ps join users u on ps.iduser=u.id left join donation d on d.idproject=ps.id left join category c on c.id=ps.categoryproject where ps.id=${id} and ps.deleted=0;`
        mysqldb.query(sql,(err,result)=>{
            if(err) res.status(500).send({message:err})
            // console.log(result, 'result')
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
        const pager = paginate(15, page, pageSize)
        
        //untuk limit database
        let offset
        if(page === 1){
            offset=0
        }else{
            offset=pageSize*(page -1)
        }
        // console.log(req.params.page)
        var sql=`select ps.*,u.username,sum(case when d.confirm=1 then d.jumlahdonasi else 0 end)/ps.targetuang*100 as percentdonate from projectusers ps left join users u on ps.iduser=u.id left join donation d on d.idproject=ps.id where ps.deleted=0 group by ps.id order by rand() limit ? offset ?;`
        mysqldb.query(sql,[pageSize,offset],(err2,result2)=>{
            if(err2) res.status(500).send({message:err2})
            const pageOfdata = result2
            return res.status(200).send({pageOfdata, pager})
        })
        })
    },
    getProjectSearch:(req,res)=>{
        var sqlcount=`select count(*) as count from projectusers where deleted=0`

        let dataCount
        mysqldb.query(sqlcount, (err1,result1)=>{
        if(err1) res.status(500).send({message:error})
        dataCount = result1[0].count
        //trigger pindah page
        // console.log(dataCount)
        const page = parseInt(req.params.page) || 1
        const pageSize = 5;
        const pager = paginate(dataCount, page, pageSize)
        
        //untuk limit database
        let offset
        if(page === 1){
            offset=0
        }else{
            offset=pageSize*(page -1)
        }
        // console.log(req.params.page)
        const {data} = req.body.data
        var sql=`SELECT ps.*,c.category,u.username,sum(case when d.confirm=1 then d.jumlahdonasi else 0 end)/ps.targetuang*100 as percentdonate FROM projectusers ps left join donation d on d.idproject=ps.id left join users u on u.id=ps.iduser left join category c on c.id=ps.categoryproject WHERE ps.deleted=0 AND ps.namaproject LIKE '%${data}%' or ps.deleted=0 AND c.category LIKE '%${data}%' group by ps.id limit ? offset ?;`
        // console.log(pageSize)
        // console.log(offset)
        mysqldb.query(sql,[pageSize,offset],(err2,result2)=>{
            if(err2) res.status(500).send({message:err2})
            // console.log(result2)
            const pageOfdata = result2
            return res.status(200).send({pageOfdata, pager})
        })
         })
    },
    getHistoryDonate:(req,res)=>{
        var id = req.params.id
        var sqlcount=`select count(*) as count from donation where iddonatur=${id}`

        let dataCount
        mysqldb.query(sqlcount, (err1,result1)=>{
        if(err1) res.status(500).send({message:error})
        dataCount = result1[0].count
        //trigger pindah page
        // console.log(dataCount)
        const page = parseInt(req.params.page) || 1
        const pageSize = 10;
        const pager = paginate(dataCount, page, pageSize)
        
        //untuk limit database
        let offset
        if(page === 1){
            offset=0
        }else{
            offset=pageSize*(page -1)
        }


        // console.log(req.params.page)
        var sql=`select d.*,pu.* from donation d join users udonatur on d.iddonatur=udonatur.id join projectusers pu on pu.id=d.idproject where iddonatur=${id} limit ? offset ?;`
        mysqldb.query(sql,[pageSize,offset],(err2,result2)=>{
            if(err2) res.status(500).send({message:err2})
            const pageOfdata = result2
            return res.status(200).send({pageOfdata, pager})
        })
        })
    },
    getHistorySupporterProject:(req,res)=>{
        var id = req.params.id
        var sqlcount=`select count(*) as count from donation d join projectusers pu on d.idproject=pu.id where pu.iduser=${id} and d.confirm=1;`

        let dataCount
        mysqldb.query(sqlcount, (err1,result1)=>{
        if(err1) res.status(500).send({message:error})
        dataCount = result1[0].count
        //trigger pindah page
        // console.log(dataCount)
        const page = parseInt(req.params.page) || 1
        const pageSize = 20;
        const pager = paginate(dataCount, page, pageSize)
        
        //untuk limit database
        let offset
        if(page === 1){
            offset=0
        }else{
            offset=pageSize*(page -1)
        }

        // console.log(req.params.page)
        var sql=`select d.*,pu.iduser,pu.namaproject,u.username from donation d join projectusers pu on d.idproject=pu.id left join users u on u.id=d.iddonatur where pu.iduser=${id} and d.confirm=1 limit ? offset ?;`
        mysqldb.query(sql,[pageSize,offset],(err2,result2)=>{
            if(err2) res.status(500).send({message:err2})
            const pageOfdata = result2
            return res.status(200).send({pageOfdata, pager})
        })
        })
        
    },
    getProjectCategory:(req,res)=>{
        // console.log(req.params.category)
        var category = req.params.category
        var sqlcount=`select count(*) as count from projectusers pu left join category c on c.id=pu.categoryproject where c.category='${category}';`

        let dataCount
        mysqldb.query(sqlcount, (err1,result1)=>{
        if(err1) res.status(500).send({message:error})
        dataCount = result1[0].count
        //trigger pindah page
        // console.log(dataCount)
        const page = parseInt(req.params.page) || 1
        const pageSize = 8;
        const pager = paginate(dataCount, page, pageSize)
        
        //untuk limit database
        let offset
        if(page === 1){
            offset=0
        }else{
            offset=pageSize*(page -1)
        }
        console.log(pageSize,offset)

        // console.log(req.params.page)
        var sql=`select pu.*,c.category,u.username from projectusers pu left join category c on c.id=pu.categoryproject left join users u on u.id = pu.iduser where c.category='${category}' and pu.deleted=0 limit ? offset ?;`
        mysqldb.query(sql,[pageSize,offset],(err2,result2)=>{
            if(err2) res.status(500).send({message:err2})
            const pageOfdata = result2
            return res.status(200).send({pageOfdata, pager})
        })
        })

    }
}