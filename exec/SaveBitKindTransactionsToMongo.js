const mongoose = require('mongoose');
global.mongoose = (global.mongoose ? global.mongoose : mongoose.createConnection(require('../config/config.json').mongodbConnectionString));
const path = require('path');
global.appRoot = path.resolve(__dirname);
global.appRoot = global.appRoot.replace('/exec','');
const bitSave = require('./BitKindTransactionsToMongo');
bitSave.saveBlockTransactionFromTo(86000, 92211, 10, 'ZEC');