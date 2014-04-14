
module.exports = function Routes (app, models, _) {

	// Route handlers
	function index (req, res) {
		res.render('index', { title: 'Express' });
	}

	function userSandbox (req, res) {
		// remove users
//		models.UserModel.find(function (err, ids) {
//			_.forEach(ids, function (userId) {
//				var user = models.nohm.factory('User');
//				user.id = userId;
//				user.remove();
//			});
//			res.send('removed all users');
//		});
	}

	function createUser (req, res) {
		var newUser = new models.UserModel();
		var newUserData = req.body;
		newUserData.textId = models.UserModel.generateTextId(models.UserModel.textIdLength);
		newUser.p(newUserData);
		newUser.save(function (err) {
			var response = {};
			if (err) {
				var errorMessage = "Error saving user: " + err + " " + newUser.getSavingErrorMessage();
				console.log(errorMessage);
				response.error = {
					type: err,
					message: errorMessage
				};
			}
			else {
				console.log('Successfully created new user with text id ' + newUserData.textId);
				response.data = {
					textId: newUserData.textId
				};
			}
			res.json(response);
		});
	}

	// Routes
	app.get('/', index);
	app.get('/userSandbox', userSandbox);
	app.post('/users', createUser);


};