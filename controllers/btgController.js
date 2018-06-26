const   gethBTGlocal = require(`${appRoot}/lib/bitcoin_gold/getBTGbitcoin_gold.js`),
    Utils = require(`${appRoot}/lib/bitcoin/utilsBTC`),
    btgConfig = require(`${appRoot}/config/config.json`).BTGRpc;

async function getBalance(address){
    if(!Utils.isAddress(address, btgConfig.network))
        return {error: 'Incorrect address - ' + address};
    try {
        return {balance: await gethBTGlocal.getBalance(address)};
    } catch (error) {
        BtgError.error(`${new Date()} Error: getBalance: ${error}`);
        throw new Error('Service error');
    }
}
async function sendRawTransaction(raw){
    try {
        return {txid: await gethBTGlocal.sendRawTransaction(raw)};
    } catch (error) {
        BtgError.error(`${new Date()} Error: sendRawTransaction: ${error}`);
        if(error.toString().indexOf('Code-114') >= 0) {
            return {error: error.toString()};
        } else throw new Error(error);
    }
}
async function getUTXOs(address){
    if(!Utils.isAddress(address, btgConfig.network))
        return {error: 'Incorrect address - ' + address};
    try{
        return {utxos: await gethBTGlocal.getUTXOs(address)};
    }catch (error){
        BtgError.error(`${new Date()} Error: getUTXOs: ${error}`);
        throw new Error('Service error');
    }
}
async function getTxList(address){
    if(!Utils.isAddress(address, btgConfig.network))
        return {error: 'Incorrect address - ' + address};
    try{
        return {txs: await gethBTGlocal.getTxsByAddress(address)};
    }catch (error){
        BtgError.error(`${new Date()} Error: getTxList: ${error}`);
        throw new Error('Service error');
    }
}
module.exports = {
    getBalance:             getBalance,
    sendRawTransaction:     sendRawTransaction,
    getUTXOs:               getUTXOs,
    getTxList:              getTxList
};