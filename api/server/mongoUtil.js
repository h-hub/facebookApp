/**
 * Created by harsha.kj89@gmail.com on 8/11/2016.
 */
var mongoose = require('mongoose');
var dbURI = "mongodb://localhost:27017/m101";
var _db;

module.exports = {

    connectToServer: function( callback ) {
        mongoose.connect(dbURI,function(err,db){
            _db = db;
            return callback( err );
        } );

        // CONNECTION EVENTS
        // When successfully connected
        mongoose.connection.on('connected', function () {
            console.log('Mongoose default connection open to ' + dbURI);
        });

        // If the connection throws an error
        mongoose.connection.on('error',function (err) {
            console.log('Mongoose default connection error: ' + err);
        });

        // When the connection is disconnected
        mongoose.connection.on('disconnected', function () {
            console.log('Mongoose default connection disconnected');
        });

        process.on('SIGINT', function() {
            mongoose.connection.close(function () {
                console.log('Mongoose default connection disconnected through app termination');
                process.exit(0);
            });
        });
    },

    getDb: function() {
        return _db;
    }
};