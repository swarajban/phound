
module.exports = function Routes (app) {

	// Route handlers
	function index (req, res) {
		res.render('index', { title: 'Express' });
	}

	// Routes
	app.get('/', index);
};