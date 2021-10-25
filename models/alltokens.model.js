const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const alltokensSchema = new Schema({

    tokensArrays : { type : Array , "default" : [] }
    
  



});

const allTokens = mongoose.model('allTokens', alltokensSchema);

module.exports = allTokens;