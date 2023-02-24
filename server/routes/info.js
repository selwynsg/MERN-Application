const express = require('express');
const router = express.Router();
const data = require('../model/info');

//Getting all
router.get('/', async (req, res) => {
    try {
        const datajson = await data.find();
        res.json(datajson);
    } catch (err) {
        //error handling :) 500 -> my fault :(
        res.status(500).json({ message: err.message })
    }
})

router.get('/Email/:Email', getEmail, async (req, res) => {
        res.json(res.player);
})

router.get('/Password/:Password', getPass, async (req, res) => {
    res.json(res.player);
})

//creating one
router.post('/', async (req, res) => {
    const datainput = new data({
        Email: req.body.Email,
        Password: req.body.Password
    })

    try {
        const newData = await datainput.save()
        res.status(201).json(newData)
        //201 created object sucessfully 
    } catch (err) {
        res.status(400).json({ message: err.message });

    }
})

async function getEmail(req, res, next) {
    let player
    try {
        player = await data.findOne({ Email: req.params.Email });
        if (player == null) {
            return res.status(404).json({ message: 'Email not found' });
        }
    } catch (err) {
            return res.status(500).json({ message: err.message });
    }
    res.player = player
    next()
}

async function getPass(req, res, next) {
    let player
    try {
        player = await data.findOne({ Password: req.params.Password });
        if (player == null) {
            return res.status(404).json({ message: 'Password is invalid' });
        }
    } catch (err) {
            return res.status(500).json({ message: err.message });
    }
    res.player = player
    next()
}

module.exports = router
