
module.exports = function Models (nohm, redisClient, _) {
	var self = this;
	this.nohm = nohm;

	// TODO: Don't use Models until it's actually ready
	redisClient.on('ready', function () {
		nohm.setClient(redisClient);

		self.UserModel = nohm.model('User', {
			properties: {
				iCloudEmail: {
					type: 'string',
					unique: true,
					validations: [
						'notEmpty'
					],
					index: true
				},
				encryptedICloudPassword: {
					type: 'string',
					validations: [
						'notEmpty'
					]
				},
				deviceID: {
					type: 'string',
					unique: true,
					validations: [
						'notEmpty'
					]
				}
			},

			methods: {
				getSavingErrorMessage: function () {
					var errorMessage = 'because: ';
					_.forIn(this.errors, function (errors, property) {
						_.forEach(errors, function (error) {
							errorMessage += '(property: ' + property + ', error: ' + error + '),';
						});
					});
					return errorMessage;
				}
			}
		});

		self.UserModel.generateTextId = function (idLength) {

			function getRandomId (length) {
				function randomIntInclusive (low, high) {
					return Math.floor(Math.random() * (high - low + 1) + low);
				}

				var randNumbers = new Array(length);
				for (var i = 0; i < length; i++) {
					randNumbers[i] = randomIntInclusive(0, 9);
				}
				return randNumbers.join("");
			}
			// TODO: Keep generating random IDs until we find a unique one. Model validation will handle this for now
			return getRandomId(idLength);
		};

		/**
		 * Given an iCloudEmail, password, and deviceID, creates a new user if no user with the same
		 * iCloudEmail exists, or updates an existing user. createOrUpdate always generates a new
		 * textID used to decrypt the stored iCloudPassword.
		 *
		 * createOrUpdate accepts a callback with the header function (err, textID) where textID is the
		 * textID that can be used to decrypt the iCloudPassword, and err may contain an error message if
		 * there was a problem creating or updating a user.
		 *
		 * @param iCloudEmail
		 * @param iCloudPassword
		 * @param deviceID
		 * @param callback
		 */
		self.UserModel.createOrUpdate = function (iCloudEmail, iCloudPassword, deviceID, callback) {
			var errorMessage;
			var textID = self.UserModel.generateTextId(self.UserModel.textIdLength);
			var encryptionKey = textID + deviceID;
			var encryptedPassword = self.UserModel.getEncryptedPassword(iCloudPassword, encryptionKey);
			var user;

			// Look to see if user exists
			self.UserModel.findAndLoad({
				iCloudEmail: iCloudEmail
			}, function (err, users) {
				if (err === null && users.length > 0) { // User exists / no error
					user = users[0];
					user.property({
						encryptedICloudPassword: encryptedPassword,
						deviceID: deviceID
					});
					console.log('Updating user with email: ' + iCloudEmail);
				}
				else { // No user exists, create one!
 					user = new self.UserModel();
					user.property({
						iCloudEmail: iCloudEmail,
						encryptedICloudPassword: encryptedPassword,
						deviceID: deviceID
					});
					console.log('Creating new user with email: ' + iCloudEmail);
				}
				user.save(function (err) {
					if (err) {
						errorMessage = "Error saving user: " + err + " " + user.getSavingErrorMessage();
						callback(errorMessage);
					}
					else {
						callback(null, textID); // success!
					}
				});
			});


		};

		var crypto = require('crypto');
		self.UserModel.getEncryptedPassword = function (rawPassword, key) {
			var cipher = crypto.createCipher('aes256', key);
			return cipher.update(rawPassword, 'utf8', 'hex') + cipher.final('hex');
		};

		self.UserModel.getDecryptedPassword = function (encryptedPassword, key) {
			var decipher = crypto.createDecipher('aes256', key);
			return decipher.update(encryptedPassword, 'hex', 'utf8') + decipher.final('utf8');
		};

		// Text ID Length for User Models is 5 for now
		Object.defineProperty(self.UserModel, 'textIdLength', {
			value: 5,
			writeable: false
		});
	});
};
