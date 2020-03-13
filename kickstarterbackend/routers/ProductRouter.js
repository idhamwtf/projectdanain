const express =require('express')
const {ProductController} =require('../controllers')
const router=express.Router()

router.post('/addproject', ProductController.postProject)
router.delete('/deleteproject/:id', ProductController.deleteProject)
router.get('/getproject', ProductController.getProject)
router.get('/getprojectuser/:id', ProductController.getProjectUser)

module.exports=router