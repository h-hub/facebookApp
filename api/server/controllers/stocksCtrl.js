/**
 * Created by harsha.kj89@gmail.com on 8/9/2016.
 */
var stocksDao = require('../dao/stockDao');

var stocksCtrl = {

    saveStock : function(req,res){
        stocksDao.push(req.body)
        .then(function(data){
            res.status(200).send('Item Saved');
        })
        .catch(function(){
            res.status(503).send('Save failed');
        });
    },
    getAllStocks : function(req,res){
        stocksDao.getAll()
        .then(function(data){
            res.send(data);
        })
        .catch(function(){
            res.status(503).send('Save failed');
        });
    },
    status : function(req,res){
        res.send('stocks controller status okay');
    }
};

module.exports = stocksCtrl;