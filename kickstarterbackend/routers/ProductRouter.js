const express =require('express')
const {ProductController} =require('../controllers')
const router=express.Router()

router.post('/addproject', ProductController.postProject)
router.delete('/deleteproject/:id', ProductController.deleteProject)

module.exports=router