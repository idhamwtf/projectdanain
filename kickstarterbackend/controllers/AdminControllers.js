const {mysqldb} = require('./../connection/index')
const fs = require('fs')
const {uploader} = require('./../helper/uploader')
const paginate = require('jw-paginate')
const moment = require('moment')

module.exports={
    getBuktidonate:(req,res)=>{
        var sqlcount=`select count(*) as count from donation where confirm=0;`

        let dataCount
        mysqldb.query(sqlcount, (err1,result1)=>{
        if(err1) res.status(500).send({message:error})
        dataCount = result1[0].count
        //trigger pindah page
        console.log(dataCount)
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
        var sql=`select d.*,ps.namaproject,u.username from donation d  left join projectusers ps on d.idproject=ps.id left join users u on d.iddonatur=u.id where confirm=0 limit ? offset ?;`
        mysqldb.query(sql,[pageSize,offset],(err2,result2)=>{
            if(err2) res.status(500).send({message:err2})
            const pageOfdata = result2
            return res.status(200).send({pageOfdata, pager})
        })

         })
    },
    confirmDonate:(req,res)=>{
        var sql = `UPDATE donation SET confirm = 1 WHERE id = ${req.params.id};`
        
        mysqldb.query(sql,(err,result)=>{
            if(err) res.status(500).send({message:err})
            // console.log(result)
            return res.status(200).send(result)
        })
    },
    declineDonate:(req,res)=>{
        var sql = `UPDATE donation SET confirm = 2 WHERE id = ${req.params.id};`
        
        mysqldb.query(sql,(err,result)=>{
            if(err) res.status(500).send({message:err})
            // console.log(result)
            return res.status(200).send(result)
        })
    },
    getListProject:(req,res)=>{
        var sqlcount=`select count(*) as count from projectusers where deleted=0;`
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
        var sql=`select ps.*,c.category,u.username,sum(case when d.confirm=1 then d.jumlahdonasi else 0 end)/ps.targetuang*100 as percentdonate from projectusers ps left join users u on ps.iduser=u.id left join donation d on d.idproject=ps.id left join category c on c.id=ps.categoryproject where ps.deleted=0 group by ps.id limit ? offset ?;`
        mysqldb.query(sql,[pageSize,offset],(err2,result2)=>{
            if(err2) res.status(500).send({message:err2})
            const pageOfdata = result2
            return res.status(200).send({pageOfdata, pager})
        })

         })
    },
    deleteProjectAdmin:(req,res)=>{
        var sql = `UPDATE projectusers SET deleted = 1 WHERE id = ${req.params.id};`
        mysqldb.query(sql,(err,result)=>{
            if(err) res.status(500).send({message:err})
            // console.log(result)
            return res.status(200).send(result)
        })
    },
    getListUsers:(req,res)=>{
        var sqlcount=`select count(*) as count from users where deleted=0;`

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
        var sql=`select * from users where deleted=0 limit ? offset ?;`
        mysqldb.query(sql,[pageSize,offset],(err2,result2)=>{
            if(err2) res.status(500).send({message:err2})
            const pageOfdata = result2
            return res.status(200).send({pageOfdata, pager})
        })

         })
    },
    deleteUsersAdmin:(req,res)=>{
        var sql = `update users set deleted = 1 where id=${req.params.id}`
        mysqldb.query(sql,(err,result)=>{
            if(err) res.status(500).send({message:err})
            // console.log(result)
            return res.status(200).send(result)
        })
    },
    getHistoryDonate:(req,res)=>{
        var sqlcount=`select count(*) as count from donation where confirm!=0;`
        // console.log(sqlcount)

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
        // console.log(pageSize,offset)
        var sql=`select d.*,ps.namaproject,u.username from donation d  left join projectusers ps on d.idproject=ps.id left join users u on d.iddonatur=u.id where confirm!=0 limit ? offset ?;`
        mysqldb.query(sql,[pageSize,offset],(err2,result2)=>{
            if(err2) res.status(500).send({message:err2})
            // console.log(result2)
            const pageOfdata = result2
            return res.status(200).send({pageOfdata, pager})
        })

        })

    },
    getStatisticUsers:(req,res)=>{
        const tanggal = moment().format('D');
        const bulan = moment().format('M');
        const tahun = moment().format('Y');
        // console.log(tanggal,bulan,tahun)
        var sql = `SELECT COUNT(*) as COUNTUSERS from users where created between '${tahun}-${bulan}-${tanggal} 00:00:00' AND '${tahun}-${bulan}-${tanggal} 23:59:59';`

        mysqldb.query(sql,(err,result)=>{
            if(err) res.status(500).send({message:err,error:'error1'})
            var today = result
            var sql = `SELECT COUNT(*) as COUNTUSERS from users where created between '${tahun}-${bulan}-01 00:00:00' AND '${tahun}-${bulan}-31 23:59:59';`
            mysqldb.query(sql,(err2,result2)=>{
                if(err2) res.status(500).send({message:err2,error2:'error2'})
                var monthly = result2
                var sql = `SELECT COUNT(*) as COUNTUSERS from users where created between '${tahun}-01-01 00:00:00' AND '${tahun}-12-31 23:59:59';`
                mysqldb.query(sql,(err3,result3)=>{
                    if(err3) res.status(500).send({message:err,error3:'error3'})
                    var annual = result3
                    return res.status(200).send({today,monthly,annual})
                })
            })

        })
    },
    getStatisticProject:(req,res)=>{
        const tanggal = moment().format('D');
        const bulan = moment().format('M');
        const tahun = moment().format('Y');
        // console.log(tanggal,bulan,tahun)
        var sql = `SELECT COUNT(*) as COUNTPROJECTS from projectusers where datepost between '${tahun}-${bulan}-${tanggal} 00:00:00' AND '${tahun}-${bulan}-${tanggal} 23:59:59';`

        mysqldb.query(sql,(err,result)=>{
            if(err) res.status(500).send({message:err,error:'error1'})
            var today = result
            var sql = `SELECT COUNT(*) as COUNTPROJECTS from projectusers where datepost between '${tahun}-${bulan}-01 00:00:00' AND '${tahun}-${bulan}-31 23:59:59';`
            mysqldb.query(sql,(err2,result2)=>{
                if(err2) res.status(500).send({message:err2,error2:'error2'})
                var monthly = result2
                var sql = `SELECT COUNT(*) as COUNTPROJECTS from projectusers where datepost between '${tahun}-01-01 00:00:00' AND '${tahun}-12-31 23:59:59';`
                mysqldb.query(sql,(err3,result3)=>{
                    if(err3) res.status(500).send({message:err,error3:'error3'})
                    var annual = result3
                    return res.status(200).send({today,monthly,annual})
                })
            })

        })
    },
    getStatisticDonation:(req,res)=>{
        const tanggal = moment().format('D');
        const bulan = moment().format('M');
        const tahun = moment().format('Y');
        // console.log(tanggal,bulan,tahun)
        var sql = `SELECT COUNT(*) as COUNTDONATION from donation where datedonate between '${tahun}-${bulan}-${tanggal} 00:00:00' AND '${tahun}-${bulan}-${tanggal} 23:59:59';`

        mysqldb.query(sql,(err,result)=>{
            if(err) res.status(500).send({message:err,error:'error1'})
            var today = result
            var sql = `SELECT COUNT(*) as COUNTDONATION from donation where datedonate between '${tahun}-${bulan}-01 00:00:00' AND '${tahun}-${bulan}-31 23:59:59';`
            mysqldb.query(sql,(err2,result2)=>{
                if(err2) res.status(500).send({message:err2,error2:'error2'})
                var monthly = result2
                var sql = `SELECT COUNT(*) as COUNTDONATION from donation where datedonate between '${tahun}-01-01 00:00:00' AND '${tahun}-12-31 23:59:59';`
                mysqldb.query(sql,(err3,result3)=>{
                    if(err3) res.status(500).send({message:err,error3:'error3'})
                    var annual = result3
                    return res.status(200).send({today,monthly,annual})
                })
            })

        })
    }
}