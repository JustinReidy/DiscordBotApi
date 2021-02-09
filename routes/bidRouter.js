const express = require("express")
const bidRouter = express.Router()
const Bid = require('../models/Bid')

bidRouter.route('/')
    .get((req, res) => {
        Bid.find((err, bids) => {
            if(err) return res.status(500).send(err)
            return res.status(200).send(bids)
        })
    })

    .post((req, res) => {
        const newBid = new Bid (req.body)
        newBid.save((err, bid) => {
            if(err) return res.status(500).send(err)
            return res.status(201).send(bid)
        })
    })

bidRouter.route('/:userId')
    .get((req, res) => {
        Bid.find({userId: req.params.userId}, (err, bid) => {
            if(err) return res.status(500).send(err)
            return res.status(201).send(bid)
        })
    })

    .put((req, res) => {
        Bid.findOneAndUpdate(
            {userId: req.params.userId},
            req.body,
            {new: true},
            (err, bid) => {
                if(err) return res.status(500).send(err)
                return res.status(200).send(bid)
            }
        )
    })
    
    .delete((req, res) => {
        Bid.findOneAndDelete(
            {userId: req.params.userId},
            (err, bid) => {
                if(err) return res.status(500).send(err)
                return res.status(204).send(bid)
            }
        )
    })

    module.exports = bidRouter