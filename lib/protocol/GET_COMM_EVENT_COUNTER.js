var Helpers = require("../Helpers");
var Utils   = require("../Utils");

exports.code = 0x0B;

exports.buildRequest = Helpers.buildEmpty;
exports.parseRequest = Helpers.parseEmpty;

exports.buildResponse = function (status, event_count) {
	return Utils.allocFrom([ status, event_count ]);
};
exports.parseResponse = function (buffer) {
	return {
		status      : buffer.readUInt8(0),
		event_count : buffer.readUInt8(1)
	};
};
