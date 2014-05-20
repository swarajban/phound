
module.exports = function Routes (app, models, findIPhone, errorHandler) {

	// Route handlers
	function index (req, res) {
		res.render('index', { title: 'Express' });
	}

	function renderSignupPage (req, res) {
		res.render('signup', {title: 'Signup'});
	}

	function getDevices (req, res) {
		var iCloudEmail = req.body.iCloudEmail;
		var iCloudPassword = req.body.iCloudPassword;
		findIPhone.getDevices(iCloudEmail, iCloudPassword, function (devices) {
			if (devices !== null) {
				devices = JSON.parse(devices);
				var response = {
					data: {
						devices: devices
					}
				};
				res.json(response);
			}
			else {
				var errorMessage = "Error finding devices for iCloud user " + iCloudEmail;
				errorHandler.error(errorMessage, 'GetDevicesError', res);
			}
		});
	}


	function twilioSandbox (req, res) {
		var twilioData = req.body;
		var incomingNumber = twilioData.From;
		var message = twilioData.Body;
		console.log('received message from ' + incomingNumber + '\t with message: ' + message);
		res.send('OK');
	}

	function userSandbox (req, res) {
//		models.UserModel.createOrUpdate('swaraj@maildrop.cc', 'pass', 'devID', function (err, textID) {
//			console.log('sup');
//		});

		models.UserModel.findAndLoad({
			iCloudEmail: 'swaraj@maildrop.cc'
		}, function (err, users) {
			var user = users[0];
			console.log('removed');
//			var props = user.allProperties(true);
//			console.log(props);
		});
		res.send('ok');


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

	function signUpUser (req, res) {
		var userParams = req.body;
		models.UserModel.createOrUpdate(userParams.iCloudEmail,
										userParams.iCloudPassword,
										userParams.deviceID,
			function (err, textID) {
				if (err === null) {
					// Successfully created or updated user
					var response = {
						data: {
							textID: textID
						}
					};
					res.json(response);
				}
				else {
					errorHandler.error(err, 'SignupError', res);
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
	app.post('/alertPhone/:textId', alertPhone);
	app.get('/signup', renderSignupPage);
	app.post('/getDevices', getDevices);
	app.post('/signup', signUpUser);


};