/**
 * Created by UJAYAH1 on 7/28/2016.
 */
var express = require('express');
var FileSystem = require('fs');
var Framework = require('framework');
var Config = Framework.Config;


module.exports = (function() {

    var pluginsFolderPath = Config.plugins.folderPath;

    function load(app) {
        if (!FileSystem.existsSync(pluginsFolderPath)) {
            return;
        }

        FileSystem.readdir(pluginsFolderPath, function(err, folders) {
            folders.forEach(function(folder) {
                //if(folder!=='api'){
                    var packageJsonPath = pluginsFolderPath + '/' + folder + '/package.json';
                    if (FileSystem.existsSync(packageJsonPath)) {
                        attach(app, packageJsonPath);
                    }
                //}
            }, this);
        });
    }

    function attach(app, packagePath) {
        var packgeJson = require(packagePath);

        if (packgeJson.plugin) {
            var pth = pluginsFolderPath + '/' + packgeJson.plugin + '/app';
            var runner = require(pth);
            console.log("attaching  "+pth);
            var attributes = runner.locals.attributes;
            app.use(attributes.prefix, runner);
        }
    }

    return{
        load : load
    }
})();