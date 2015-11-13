var Helpers = require("../Helpers");

exports.code = 0x06;

exports.request  = function (address, value) {
	var buffer = new Buffer(4);

	buffer.writeUInt16BE(address, 0);
	value.copy(buffer, 2, 0, 2);

	return buffer;
};

exports.response = exports.request;
exports.parse    = function (buffer) {
	return {
		address : buffer.readUInt16BE(0),
		value   : buffer.slice(2, 4)
	};
};
