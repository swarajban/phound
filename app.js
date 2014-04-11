

module.exports = function App (express, path) {
	this.app = express();
	this.app.set('port', process.env.PORT || 3000);
	this.app.set('views', __dirname + '/views');
	this.app.set('view engine', 'jade');
	this.app.use(express.bodyParser());
	this.app.use(express.methodOverride());
	this.app.use(this.app.router);
	this.app.use(express.static(path.join(__dirname, 'public')));

	// development only
	if ('development' == this.app.get('env')) {
		this.app.use(express.errorHandler());
	}
};
