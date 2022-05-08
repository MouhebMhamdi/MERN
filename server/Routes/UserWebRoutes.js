var express = require('express');
var router = express.Router();
const UserController = require('../Controllers/UserWebController')
require('dotenv').config(); 
const upload =require('../middlewares/Upload')
const authenticateToken =require('./VerifyToken')
router.get('/nbrUser',authenticateToken,UserController.countUsers);
router.get('/nbrAdmin',authenticateToken,UserController.countAdmins);

router.get('/nbrProduct',authenticateToken,UserController.countProduct);
router.get('/Age/:age',authenticateToken,UserController.Age);
router.get('/count',UserController.getNbrUserConnect);
router.post('/add',upload.single('profilepic'),UserController.signup)
router.get('/connect',authenticateToken,UserController.getUserConnect)
router.post('/login',UserController.login)
router.put('/edit/:id',authenticateToken,UserController.updateAdmin)
router.delete('/delete/:id',authenticateToken,UserController.deleteuser)
router.get('/all',authenticateToken,UserController.getAdminData);
router.get('/:id',authenticateToken,UserController.getUserById);



module.exports = router;