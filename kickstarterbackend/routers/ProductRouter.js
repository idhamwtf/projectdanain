const express =require('express')
const {ProductController} =require('../controllers')
const router=express.Router()

router.post('/addproject', ProductController.postProject)
router.delete('/deleteproject/:id', ProductController.deleteProject)
router.get('/getproject', ProductController.getProject)
router.get('/getprojectuser/:id', ProductController.getProjectUser)
router.get('/getfeatured', ProductController.getFeatured)
router.get('/projectdetail/:id', ProductController.getProjectDetail)
router.get('/getrecommend/:page', ProductController.getProjectRecommended)

module.exports=router