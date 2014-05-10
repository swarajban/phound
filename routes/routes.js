
module.exports = function Routes (app, models, findIPhone, errorHandler) {

	// Route handlers
	function index (req, res) {
		res.render('index', { title: 'Express' });
	}

	function signup (req, res) {
		res.render('signup', {title: 'Signup'});
	}


	function twilioSandbox (req, res) {
		var twilioData = req.body;
		var incomingNumber = twilioData.From;
		var message = twilioData.Body;
		console.log('received message from ' + incomingNumber + '\t with message: ' + message);
		res.send('OK');
	}

	function userSandbox (req, res) {
//		findIPhone.findIPhone('swarajban@gmail.com', 'sav1age26', 'Xkp7hQme6pWsobxGZ/KI1s0mj+q0e2RsEmrG3YZfFKaenip5EkA6sOHYVNSUzmWV',
//			function (result) {
//				res.send(result);
//			}
//		);
//		findIPhone.getDevices('swarajban@gmail.com', 'sav1age26',
//			function onResult (devices) {
//				res.json(devices);
//			}
//		);
//		res.send('OK');
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
				errorHandler.error(errorMessage, err, res);
			}
			else {
				console.log('Successfully created new user with text id ' + newUserData.textId);
				response.data = {
					textId: newUserData.textId
				};
				res.json(response);
			}

		});
	}

	function alertPhone (req, res) {
		var textId = req.params.textId;
		var iCloudUsername = req.body.iCloudUsername;
		var message = null;
		var response = {};
		models.UserModel.find({
			iCloudUsername: iCloudUsername
		}, function (err, ids) {
			if (err === null) {
				if (ids.length > 0) {
					models.UserModel.load(ids[0],
					function (err) {
						if (err === null) {
							var iCloudPassword = this.p('iCloudPassword');
							var deviceId = this.p('deviceId');
							var findErrorMessage = findIPhone.findIPhone(iCloudUsername, iCloudPassword, deviceId);
							if (findErrorMessage === null) {
								response.data = {
									foundIPhone: true
								};
								res.json(response);
							}
							else {
								message = 'could not find iPhone. error: ' + findErrorMessage;
								errorHandler.error(message, 'FindIPhoneError', res);
							}
						}
						else {
							message = 'could not load user with id: ' + ids[0] + '. error: ' + JSON.stringify(err);
							errorHandler.error(message, 'LoadUserError', res);
						}
					});
				}
				else {
					message = 'could not find user id from user name: ' + iCloudUsername;
					errorHandler.error(message, 'LoadUserError', res);
				}
			}
			else {
				message = 'could not find users with username. error: ' + JSON.stringify(err);
				errorHandler.error(message, err, res);
			}
		});
	}

	// Routes
	app.get('/', index);
	app.post('/twilioSandbox', twilioSandbox);
	app.get('/userSandbox', userSandbox);
	app.post('/users', createUser);
	app.post('/alertPhone/:textId', alertPhone);
	app.get('/signup', signup);


};