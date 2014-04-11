

// Requires
var express = require('express');
var path = require('path');
var App = require('./app');
var Routes = require('./routes/routes');

// Initialize Dependencies
var phoundApp = new App(express, path);
var routes = new Routes(phoundApp.app);

var server = phoundApp.app.listen(phoundApp.app.get('port'), function() {
	console.log('Listening on port %d', server.address().port);
});
