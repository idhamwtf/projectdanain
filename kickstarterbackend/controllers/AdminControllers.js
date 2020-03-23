const {mysqldb} = require('./../connection/index')
const fs = require('fs')
const {uploader} = require('./../helper/uploader')
const paginate = require('jw-paginate')


// module.exports={
//     getBuktidonate:(req,res)=>{
//         var sqlcount=`select count(*) as count from donation`

//         let dataCount
//         mysqldb.query(sqlcount, (err1,result1)=>{
//             if(err1) res.status(500).send({message:error})
//             // console.log(result1[0].count,'asu')
//         dataCount = result1[0].count
//         // console.log(dataCount)
//         //trigger pindah page
//         // console.log(dataCount)
//         const page = parseInt(req.params.page) || 1
//         const pageSize = 10;
//         const pager = paginate(dataCount, page, pageSize)
        
//         //untuk limit database
//         let offset
//         if(page === 1){
//             offset=0
//         }else{
//             offset=pageSize*(page -1)
//         }
//         // console.log(req.params.page)
//         var sql=`select d.*,ps.namaproject,u.username from donation d  left join projectusers ps on d.idproject=ps.id left join users u on d.iddonatur=u.id where confirm=0 limit ? offset ?;`
        
//         mysqldb.query(sql,[pageSize,offset],(err2,result2)=>{
//             if(err2) res.status(500).send({message:err2})
//             const pageOfdata = result2
//             return res.status(200).send({pageOfdata, pager})
//         })
//     }
// }


module.exports={
    getBuktidonate:(req,res)=>{
        var sqlcount=`select count(*) as count from donation`

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
        var sql=`select d.*,ps.namaproject,u.username from donation d  left join projectusers ps on d.idproject=ps.id left join users u on d.iddonatur=u.id where confirm=0 limit ? offset ?;`
        mysqldb.query(sql,[pageSize,offset],(err2,result2)=>{
            if(err2) res.status(500).send({message:err2})
            const pageOfdata = result2
            return res.status(200).send({pageOfdata, pager})
        })

         })
    }
}