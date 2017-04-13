var Helpers = require("../Helpers");
var Buff    = require("../Buffer");

exports.code = 0x07;

exports.buildRequest = Helpers.buildEmpty;
exports.parseRequest = Helpers.parseEmpty;

exports.buildResponse = function (data) {
	return (Buffer.isBuffer(data) ? data.slice(0, 1) : Buff.from([ data ]));
};
exports.parseResponse = function (buffer) {
	if (buffer.length === 0) return null;

	return {
		data : buffer.readUInt8(0)
	};
};
