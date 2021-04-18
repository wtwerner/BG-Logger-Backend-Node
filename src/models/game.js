const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }, 
    owned: {
        type: Boolean,
        default: false
    },
    wishlist: {
        type: Boolean,
        default: false
    },
    bgaId: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Game = mongoose.model('Game', gameSchema)

module.exports = Game