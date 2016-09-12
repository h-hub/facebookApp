/**
 * Created by harsha.kj89@gmail.com on 8/9/2016.
 */
var express = require('express');
var router = express.Router();
var stockCtrl = require('./controllers/stocksCtrl');


router.get('/v1/stock', stockCtrl.getAllStocks);
router.get('/v1', stockCtrl.status);
router.post('/v1/stock/', stockCtrl.saveStock);
//router.put('/api/v1/stock/:id', products.update);
//router.delete('/api/v1/stock/:id', products.delete);


module.exports = router;