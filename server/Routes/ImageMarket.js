var express = require('express');
var router = express.Router();
const ImageMarketController = require('../Controllers/ImageMarketController')
require('dotenv').config(); 
const authenticateToken =require('./VerifyToken')
const upload =require('../middlewares/Upload')

router.post("/add/:id",authenticateToken,upload.single('image'),ImageMarketController.addImageMarket);
router.get("/all",authenticateToken,ImageMarketController.getAll);
router.get("/allForUsers",authenticateToken,ImageMarketController.getAllForSimpleUser);
router.put("/update/:id",authenticateToken,ImageMarketController.updateMarket);

module.exports = router;