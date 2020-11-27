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

handRouter.route('/:_id')
    .get((req, res) => {
        Hand.findById(req.params._id, (err, hand) => {
            if(err) return res.status(500).send(err)
            return res.status(201).send(hand)
        })
    })
    .put((req, res) => {
        Hand.findOneAndUpdate(
            {_id: req.params._id},
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
            {_id: req.params._id},
            (err, hand) => {
                if(err) return res.status(500).send(err)
                return res.status(204).send(hand)
            }
        )
    })

    module.exports = handRouter