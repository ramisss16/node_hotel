const express = require('express');
const router = express.Router();
const Person = require('./../models/menuItem');
const menuItem = require('./../models/menuItem');

// post method to add menuItem
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newmenu = new menuItem(data);
        const response = await newmenu.save();
        console.log('data saved')
        res.status(200).json(response);

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'internal error' });
    }
});

// get method to get menuItems
router.get('/', async(req, res) =>{
    try{
        const data = await menuItem.find();
         console.log('data fetch')
        res.status(200).json(data);
    }
    catch(err){
         console.log(err);
        res.status(500).json({ error: 'internal error' });

    }
})

module.exports = router;