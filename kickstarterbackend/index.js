const express=require('express')
const app=express()
const BodyParser=require('body-parser')
const cors=require('cors')

const PORT = 1231

app.use(cors())
app.use(BodyParser.urlencoded({ extended: false }));
app.use(BodyParser.json())
app.use(express.static('public'))


const {usersRouters,AuthenticationRouters, ProductRouters, DonateRouters,AdminRouters} = require('./routers')

// app.use('/users',usersRouters)
app.use('/product', ProductRouters)
app.use('/auth',AuthenticationRouters)
app.use('/donate', DonateRouters)
app.use('/admin', AdminRouters)


app.get('/',(req,res)=>{
    return res.status(200).send('<h1>Selamat datang di api ini</h1>')

})




app.listen(PORT,()=>console.log(`aktif di port ${PORT}`))