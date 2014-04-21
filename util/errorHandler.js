module.exports = function ErrorHandler () {

	/**
	 * Central error handling function logs error message and sends JSON error response
	 *
	 * @param {string} message
	 * @param {string} type
	 * @param {Object} responseObject
	 */
	this.error = function (message, type, responseObject) {
		var fullMessage = 'Error [' + type + ']\t ' + message;
		console.log(fullMessage);
		if (responseObject !== undefined) {
			var errorResponse = {
				error: {
					type: type,
					message: message
				}
			};
			responseObject.json(errorResponse);
		}
	}
};