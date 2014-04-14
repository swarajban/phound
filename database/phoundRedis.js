
module.exports = function PhoundRedis(redis) {
	this.client = redis.createClient();
};