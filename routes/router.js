const express = require('express')
const userController = require('../controllers/userController')
const ProjectController = require('../controllers/projectController')
const jwtMiddleware = require('../middlewares/jwsMiddleware')
const multerMiddleware = require('../middlewares/multerMiddleware')

const router = new express.Router()

//register-post
router.post('/register',userController.registerController)
//login-post
router.post('/login',userController.loginController)
//add-project-post
router.post('/add-project',jwtMiddleware,multerMiddleware.single('projectImage'),ProjectController.addProjectController)
//home-project-get
router.get('/home-projects',ProjectController.getHomeProjectsController)
//user-project-get
router.get('/user-projects',jwtMiddleware,ProjectController.getUserProjectsController)
//all-project-get
router.get('/all-projects',jwtMiddleware,ProjectController.getAllProjectsController)
//edit-project-put
router.put('/projects/:id/edit',jwtMiddleware,multerMiddleware.single("projectImage"),ProjectController.editProjectController)
//delete-project-put
router.delete('/projects/:id/remove',jwtMiddleware,ProjectController.removeProjectController)
//edit-user-put
router.put('/user/edit',jwtMiddleware,multerMiddleware.single("profilePic"),userController.editUserController)

module.exports = router