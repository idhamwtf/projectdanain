const express=require('express')
const {DonateController}= require('../controllers')

const router=express.Router()

router.post('/postdonate', DonateController.postDonate)

module.exports=router