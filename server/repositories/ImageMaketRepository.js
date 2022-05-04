const router = require("express").Router();
const ImageMarketController = require("../controllers/ImageMarket.controller");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        const newFileName = (+new Date()).toString() + path.extname(file.originalname);
        cb(null, newFileName);
    }
})

const upload = multer({ storage });

/**
 * @Path /imageMarket
 */
router.route("/")
    .post(upload.single("image"), ImageMarketController.createImageMarket)
    .get(ImageMarketController.getImageMarket);

router.post("/play", ImageMarketController.createImageMarket);

module.exports = router;