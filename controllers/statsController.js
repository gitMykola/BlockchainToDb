const exchange = require(`${appRoot}/lib/mongodb/exchange`);
//Intel logger setup
const intel = require('intel');
const StatsError = intel.getLogger('StatsError');
StatsError.setLevel(StatsError.ERROR).addHandler(new intel.handlers.File(`${appRoot}/logs/stats/eror.log`));

/**
 * Return exchange from mongodb from now DateTime to - countMonths
 * @param {string} pair pairs for exchange like BTC-USD
 * @param {number} countMonths count months from 1 to 12
 * @return {(object|Error)} list pairs
 */
async function getGdax(pair, countMonths){
    if(!countMonths || countMonths<1 || countMonths>12)
         throw new Error('Months can be from 1 to 12'); 
    try {
        let from = new Date();
        let to = new Date();
        to = to.setMonth(to.getMonth() - countMonths);
        from = Math.floor(from/1000);
        to = Math.floor(to/1000);
        let list = await exchange.getExchangeList(1, pair, from, to);
        return list;
    } catch (error) {
        StatsError.error(`Error: getGdax: ${error}`)
    }
}
module.exports = {
    getGdax:        getGdax
}