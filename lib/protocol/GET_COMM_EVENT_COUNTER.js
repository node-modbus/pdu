var Helpers = require("../Helpers");
var Buff    = require("../Buffer");

exports.code = 0x0B;

exports.buildRequest = Helpers.buildEmpty;
exports.parseRequest = Helpers.parseEmpty;

exports.buildResponse = function (status, event_count) {
	return Buff.from([ status, event_count ]);
};
exports.parseResponse = function (buffer) {
	if (buffer.length < 2) return null;

	return {
		status      : buffer.readUInt8(0),
		event_count : buffer.readUInt8(1)
	};
};
