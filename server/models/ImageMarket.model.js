const mongoose = require("mongoose")


const ImageMarketSchema = mongoose.Schema({
    AdminAnswer:{
        type:Boolean,
        default:false,
        required:true
    },
    Answer: String,
    winingPrice: Number,
    usePrice: Number,
    image: String,
    Admin:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'Admin'
    }
}, {
    timestamps: true
});

const ImageMarket = mongoose.model("imageMarket", ImageMarketSchema);

module.exports = { ImageMarket };