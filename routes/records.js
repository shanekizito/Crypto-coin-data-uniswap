const router = require('express').Router();
let allTokensRouter = require('../models/alltokens.model');

const dbo = require("../db/conn");

router.route('/').get((req, res) => {
    const dbName=dbo.client.db("CoinsData")
    var coinMatch={ tokensArrays:{id:"0x00000000000045166c45af0fc6e4cf31d9e14b9a"}}
    dbName.collection("Coins").findOne(coinMatch, function (err, result) {
        if (err) throw err;
        res.json(result);
        
    })
})


   
router.route("/Coins").get(function (req, res) {
    let db_connect =dbo.client.db("CoinsData");
    db_connect
      .collection("Coins")
      .find({

        "tokensArrays.id":'0x00000000000045166c45af0fc6e4cf31d9e14b9a'
      })
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
  });


  router.route("/Coins/:id").get(function (req, res) {
    let db_connect =dbo.client.db("CoinsData");

    let myquery = { id: req };
    db_connect.collection("Coins").findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

   

  
  router.route('/add').post((req, res) => {
    const coinsarray=req.body;
    const dbName=dbo.client.db("CoinsData");
    //console.log(dbName.collection('coins').insertOne(coinsarray))
    // let db_connect = dbo.getDb("coinsEntry");

  dbName.collection("Coins").insertOne(coinsarray, function (err, res) {
    if (err) throw err;
    res.json(res);

  });
 // console.log(req.body)
   const newTokensArray = new allTokensRouter({
      coinsarray
    });

  
   newTokensArray.save()
    .then(() => res.json('Exercise added!'))
    .catch(err => res.status(400).json('Error: ' + err));
  });
  

  module.exports = router;