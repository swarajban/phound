

// External Dependencies
var express = require('express');
var path = require('path');
var redis = require('redis');
var nohm = require('nohm');
var _ = require('lodash');

// Internal Modules
var ErrorHandler = require('./util/errorHandler');
var App = require('./app');
var PhoundRedis = require('./database/phoundRedis');
var Models = require('./database/models');
var FindIPhone = require('./findIPhone/findIphone');
var Routes = require('./routes/routes');

// Initialize Dependencies
var errorHandler = new ErrorHandler();
var phoundApp = new App(express, path);
var phoundRedis = new PhoundRedis(redis);
var models = new Models(nohm.Nohm, phoundRedis.client, _);
var findIPhone = new FindIPhone();
var routes = new Routes(phoundApp.app, models, findIPhone, errorHandler);

var server = phoundApp.app.listen(phoundApp.app.get('port'), function() {
	console.log('Listening on port %d', server.address().port);
});
