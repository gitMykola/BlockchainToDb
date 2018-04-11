const express = require('express');
const app = module.exports = express();

app.use('/ETH', require('./eth'));
app.use('/BTC', require('./btc'));
app.use('/LTC', require('./ltc'));
app.use('/BTC', require('./btc'));
app.use('/BTG', require('./btg'));
app.use('/stats', require('./stats'));
app.get('/', (req, res) => {
    res.status(404).send('wrong query, choose v4.0/ETH');
});