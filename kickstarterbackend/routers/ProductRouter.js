const express =require('express')
const {ProductController} =require('../controllers')
const router=express.Router()


router.get('/getcategory',ProductController.getCategory)
router.post('/addproject', ProductController.postProject)
router.put('/editproject/:id', ProductController.editProject)
router.delete('/deleteproject/:id', ProductController.deleteProject)
router.get('/getproject', ProductController.getProject)
router.get('/getnewest', ProductController.getNewestProject)
router.get('/getprojectuser/:id', ProductController.getProjectUser)
router.get('/getfeatured', ProductController.getFeatured)
router.get('/projectdetail/:id', ProductController.getProjectDetail)
router.get('/getrecommend/:page', ProductController.getProjectRecommended)
router.post('/getsearch/:page',ProductController.getProjectSearch)
router.put('/gethistorydonate/:id/:page', ProductController.getHistoryDonate)
router.put('/gethistorysupporterproject/:id/:page', ProductController.getHistorySupporterProject)

module.exports=router