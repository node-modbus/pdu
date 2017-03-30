var Helpers = require("../Helpers");

exports.code = 0x07;

exports.buildRequest = Helpers.buildEmpty;
exports.parseRequest = Helpers.parseEmpty;

exports.buildResponse = function (data) {
	return (Buffer.isBuffer(data) ? data.slice(0, 1) : Buffer.from([ data ]));
};
exports.parseResponse = function (buffer) {
	return {
		data : buffer.readUInt8(0)
	};
};
