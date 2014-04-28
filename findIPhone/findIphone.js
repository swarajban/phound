module.exports = function FindIPhone (errorHandler, exec) {

	this.findIPhone = function (username, password, deviceId, onComplete) {
		var findIPhoneCommand = 'php ' + __dirname + '/findIphone.php --action sendMessage --username ' + username +
			' --password ' + password +
			' --deviceID ' + deviceId +
			' --subject Phound --message Phound your phone';
		exec(findIPhoneCommand, function (error, stdout) {
			if (error) {
				errorHandler.error('Could not find iPhone: ' + JSON.stringify(error), 'SosumiError');
				onComplete(null);
			}
			else {
				onComplete(stdout);
			}
		});
	};

	this.getDevices = function (username, password, onResult) {
		var getDevicesCommand = 'php ' + __dirname + '/findIphone.php --action getDevices --username ' + username + ' --password ' + password;
		exec(getDevicesCommand, function (error, stdout) {
			if (error) {
				errorHandler.error('Could not get devices: ' + JSON.stringify(error), 'SosumiError');
				onResult(null);
			}
			else {
				onResult(stdout);
			}
		});
	};
};