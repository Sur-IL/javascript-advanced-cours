const express = require('express');
const fs = require('fs');
const app = express();
const router = require('./cartRouter');

app.use(express.json());
app.use('/', express.static('public'));
app.use('/api/cart', router);

app.get('/api/products', (req, res) => {
    fs.readFile('server/dataBase/catalogData.json', 'utf-8', (error, data) => {
        if (error) {
            res.sendStatus(404, JSON.stringify({ result: 0, text: error }));
        } else {
            res.send(data);
        }
    })
});

app.listen(3000, () => console.log('Communication with the server is established. Listen on port 3000'));