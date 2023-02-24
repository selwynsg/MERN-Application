const express = require('express');
const router = express.Router();
const data = require('../model/sub');

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

//Getting one
router.get('/:id', getPlayer, function (req, res) {
    res.json(res.player)
})

//Getting one by name.
router.get('/Player/:Player', getPerson, function (req, res) {
    res.json(res.player)
})

//Getting one by name.
router.get('/name/:name', getCommunity, function (req, res) {
    res.json(res.player)
})

router.get('/collage/:collage', getMoreThanOne, function (req, res) {
    res.json(res.player)
})

router.get('/weight/:weight', getMoreThanOneWeight, function (req, res) {
    res.json(res.player)
})

//creating one
router.post('/', async (req, res) => {
    const datainput = new data({
        name: req.body.name,
        height: req.body.height,
        age: req.body.age
    })

    try {
        const newData = await datainput.save()
        res.status(201).json(newData)
        //201 created object sucessfully 
    } catch (err) {
        res.status(400).json({ message: err.message });

    }
})
//update one
router.patch('/:id', getPlayer, async (req, res) => {
    if (req.body.name != null) {
        res.player.name = req.body.name
    }    
    if (req.body.height != null) {
        res.player.height = req.body.height
    }   
    if (req.body.age != null) {
        res.player.age = req.body.age
    }
    try {
        const updatedPlayer = await res.player.save()
        res.json(updatedPlayer)
    } catch (err) {
        res.status(400).json({ message: err.message });
    }

})
//delete one
router.delete('/:id', getPlayer, async function (req, res) {
    try {
        await res.player.remove();
        res.json({ message: "Deleted The Player Successfully" })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

async function getPlayer(req, res, next) {
    let player
    try {
        player = await data.findById(req.params.id);
        if (player == null) {
            return res.status(404).json({ message: 'Player not found' });
        }
    } catch (err) {
            return res.status(500).json({ message: err.message });
    }
    res.player = player
    next()
}
async function getPerson(req, res, next) {
    let player
    try {
        player = await data.findOne({ Player: req.params.Player });
        if (player == null) {
            return res.status(404).json({ message: 'Player not found' });
        }
    } catch (err) {
            return res.status(500).json({ message: err.message });
    }
    res.player = player
    next()
}
async function getCommunity(req, res, next) {
    let player
    try {
        player = await data.findOne({ name: req.params.name });
        if (player == null) {
            return res.status(404).json({ message: 'Player not found' });
        }
    } catch (err) {
            return res.status(500).json({ message: err.message });
    }
    res.player = player
    next()
}

async function getMoreThanOne(req, res, next) {
    let player
    try {
        player = await data.find({ collage: req.params.collage });
        if (player == null) {
            return res.status(404).json({ message: 'Player not found' });
        }
    } catch (err) {
            return res.status(500).json({ message: err.message });
    }
    res.player = player
    next()
}

async function getMoreThanOneWeight(req, res, next) {
    let player
    try {
        player = await data.find({ weight: req.params.weight });
        if (player == null) {
            return res.status(404).json({ message: 'Player not found' });
        }
    } catch (err) {
            return res.status(500).json({ message: err.message });
    }
    res.player = player
    next()
}

module.exports = router
