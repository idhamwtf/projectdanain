const express=require('express')
const {AdminController}= require('../controllers')

const router=express.Router()

router.get('/getbukti/:page', AdminController.getBuktidonate)
router.put('/confirmdonate/:id', AdminController.confirmDonate)
router.put('/declinedonate/:id', AdminController.declineDonate)
router.get('/getlistproject/:page', AdminController.getListProject)
router.put('/deleteprojectadmin/:id', AdminController.deleteProjectAdmin)
router.get('/getlistusers/:page', AdminController.getListUsers)
router.put('/deleteusers/:id', AdminController.deleteUsersAdmin)
module.exports=router