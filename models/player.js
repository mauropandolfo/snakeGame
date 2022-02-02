const mongoose = require ('mongoose')

const PlayerSchema = new mongoose.Schema({
        username:{
            type:String,
        },
        score:{
            type:Number,
        }
    },
)

module.exports = mongoose.model('Player', PlayerSchema)