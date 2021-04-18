const express = require('express')
const Game = require('../models/game')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/games', auth, async (req, res) => {
    const game = new Game({
        ...req.body,
        owner: req.user._id
    })

    try {
        await game.save()
        res.status(201).send(game)
    } catch (e) {
        res.status(400).send(e)
    }
})

// GET /games?owned=false
// GET /games?wishlist=false
// GET /games?limit=10&skip=0
// GET /games?sortBy=createdAt:desc
router.get('/games', auth, async (req, res) => {
    const match = {}
    const sort = {}

    if (req.query.owned) {
        match.owned = req.query.owned === 'true'
    }

    if (req.query.wishlist) {
        match.wishlist = req.query.wishlist === 'true'
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        await req.user.populate({
            path: 'games',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.games)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/games/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const game = await Game.findOne({ _id, owner: req.user._id })

        if (!game) {
            return res.status(404).send()
        }

        res.send(game)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/games/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'owned', 'wishlist', 'bga_id']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' })
    }

    try {
        const game = await Game.findOne({ _id: req.params.id, owner: req.user._id })

        updates.forEach((update) => game[update] = req.body[update])
        await game.save()

        if (!game) {
            return res.status(404).send()
        }

        res.send(game)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/games/:id', auth, async (req, res) => {
    try {
       const game = await Game.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!game) {
            return res.status(404).send()
        }

        res.send(game)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router