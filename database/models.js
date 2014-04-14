
module.exports = function Models (nohm, redisClient, _) {
	var self = this;
	this.nohm = nohm;

	// TODO: Don't use Models until it's actually ready
	redisClient.on('ready', function () {
		nohm.setClient(redisClient);

		self.UserModel = nohm.model('User', {
			properties: {
				iCloudUsername: {
					type: 'string',
					unique: true,
					validations: [
						'notEmpty'
					],
					index: true
				},
				iCloudPassword: {
					type: 'string',
					validations: [
						'notEmpty'
					]
				},
				deviceId: {
					type: 'string',
					unique: true,
					validations: [
						'notEmpty'
					]
				},
				textId: {
					type: 'string',
					unique: true,
					validations: [
						'notEmpty'
					],
					index: true
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

		// Text ID Length for User Models is 5 for now
		Object.defineProperty(self.UserModel, 'textIdLength', {
			value: 5,
			writeable: false
		});
	});
};
