require('../../models/BitcoinGoldTransactionModel');
const BTGTransaction = mongoose.model('btgtransactions');

async function getTransactionsList(address) {
    return new Promise((resolve, reject) => {
        try {
            BTGTransaction
                .find()
                .where({'to': address })
                .select('-_id -__v')
                .then(res => {
                    res ? resolve(res) : reject(new Error(`function getTransactionsList no block number`));
                })
                .catch(e => reject(e));
        } catch (error) {
            reject(error);
        }
    })
}
async function saveBTGTransactionsToMongoDb(tx) {
    return new Promise((resolve, reject) => {
        try {
            const blockData = new BTGTransaction(tx);
            blockData.save()
                .then(() => {
                    return resolve(true);
                })
                .catch(e => {
                    return reject(e);
                });
        } catch (error) {
            return reject(error)
        }
    })
}
function getLastBlock() {
    return new Promise((resolve, reject) => {
        try {
            BTGTransaction.find()
                .sort({'blockheight': -1})
                .limit(1)
                .then(lastBlockN => {
                    return lastBlockN.length ?
                        resolve(lastBlockN[0].blockheight)
                        : reject('Empty collection');
                })
                .catch(error => {
                    return reject(error);
                })
        } catch (err) {
            return reject(err);
        }
    })
}
module.exports = {
    getTransactionslist:           getTransactionsList,
    saveBTGTransactionsToMongoDb:  saveBTGTransactionsToMongoDb,
    getLastBlock:                  getLastBlock
};