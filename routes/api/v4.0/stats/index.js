const express = require('express');
const app = module.exports = express();
const statsController = require(`../../../../controllers/statsController`);

app.get('/BTC-USD/GDAX/:countMonths', (req, res, next) => {
    const countMonths = req.params.countMonths;
    statsController.getGdax('BTC-USD', countMonths)
        .then(list => {
            res.send(list);
        })
        .catch(error => {
            next(error)
        })
});
app.get('/BTC-EUR/GDAX/:countMonths', (req, res, next) => {
    const countMonths = req.params.countMonths;
    statsController.getGdax('BTC-EUR', countMonths)
        .then(list => {
            res.send(list);
        })
        .catch(error => {
            next(error)
        })
});
app.get('/ETH-USD/GDAX/:countMonths', (req, res, next) => {
    const countMonths = req.params.countMonths;
    statsController.getGdax('ETH-USD',countMonths)
        .then(list => {
            res.send(list);
        })
        .catch(error => {
            next(error)
        })
});
app.get('/ETH-EUR/GDAX/:countMonths', (req, res, next) => {
    const countMonths = req.params.countMonths;
    statsController.getGdax('ETH-EUR',countMonths)
        .then(list => {
            res.send(list);
        })
        .catch(error => {
            next(error);
        })
});
