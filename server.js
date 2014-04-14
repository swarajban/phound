

// External Dependencies
var express = require('express');
var path = require('path');
var redis = require('redis');
var nohm = require('nohm');
var _ = require('lodash');

// Internal Modules
var App = require('./app');
var PhoundRedis = require('./database/phoundRedis');
var Models = require('./database/models');
var Routes = require('./routes/routes');

// Initialize Dependencies
var phoundApp = new App(express, path);
var phoundRedis = new PhoundRedis(redis);
var models = new Models(nohm.Nohm, phoundRedis.client, _);
var routes = new Routes(phoundApp.app, models, _);

var server = phoundApp.app.listen(phoundApp.app.get('port'), function() {
	console.log('Listening on port %d', server.address().port);
});
