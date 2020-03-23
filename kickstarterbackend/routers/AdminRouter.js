const express=require('express')
const {AdminController}= require('../controllers')

const router=express.Router()

router.get('/getbukti/:page', AdminController.getBuktidonate)

module.exports=router