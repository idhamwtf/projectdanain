const express=require('express')
const {usersControllers}= require('../controllers')

const router=express.Router()

router.get('/users',usersControllers.getusers)

module.exports=router