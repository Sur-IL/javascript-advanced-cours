const express = require('express');
const fs = require('fs');
const handler = require('./handler');
const router = express.Router();

router.get('/', (req, res) => {
    fs.readFile('server/dataBase/getBasket.json', 'utf-8', (error, data) => {
        if (error) {
            res.sendStatus(404, JSON.stringify({ result: 0, text: error }));
        } else {
            res.send(data);
        }
    })
});

router.post('/:id', (req, res) => {
    handler(req, res, 'add', 'server/dataBase/getBasket.json');
});

router.put('/:id', (req, res) => {
    handler(req, res, 'change', 'server/dataBase/getBasket.json');
});

router.delete('/:id', (req, res) => {
    handler(req, res, 'remove', 'server/dataBase/getBasket.json');
});

module.exports = router;