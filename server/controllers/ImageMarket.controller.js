const { ImageMarket } = require("../models/ImageMarket.model");


module.exports = {
    createImageMarket: async (req, res) => {

        const imageMarket = new ImageMarket({
            ...req.body
        });

        if (req.file) {
            imageMarket.image = req.file.path;
        }

        await imageMarket.save();
        res.status(201).json(imageMarket)


    },

    getImageMarket: async (req, res) => {
        const imageMarket = await ImageMarket.find();
        res.json(imageMarket);
    },



}