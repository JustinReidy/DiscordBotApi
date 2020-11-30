const express = require("express")
const handRouter = express.Router()
const Hand = require('../models/Hand')

handRouter.route('/')
    .get((req, res) => {
        Hand.find((err, hands) => {
            if(err) return res.status(500).send(err)
            return res.status(200).send(hands)
        })
    })

    .post((req, res) => {
        const newHand = new Hand (req.body)
        newHand.save((err, hand) => {
            if(err) return res.status(500).send(err)
            return res.status(201).send(hand)
        })
    })

handRouter.route('/:userId')
    .get((req, res) => {
        Hand.find({userId: req.params.userId}, (err, hand) => {
            if(err) return res.status(500).send(err)
            return res.status(201).send(hand)
        })
    })
    .put((req, res) => {
        Hand.findOneAndUpdate(
            {userId: req.params.userId},
            req.body,
            {new: true},
            (err, hand) => {
                if(err) return res.status(500).send(err)
                return res.status(200).send(hand)
            }
        )
    })
    .delete((req, res) => {
        Hand.findOneAndDelete(
            {userId: req.params.userId},
            (err, hand) => {
                if(err) return res.status(500).send(err)
                return res.status(204).send(hand)
            }
        )
    })

    module.exports = handRouter