var Helpers = require("../Helpers");

exports.code = 0x05;

exports.request  = function (address, state) {
	var buffer = new Buffer(4);

	buffer.writeUInt16BE(address, 0);

	buffer[2] = (state ? 0xFF : 0x00);
	buffer[3] = 0x00;

	return buffer;
};

exports.response = exports.request;
exports.parse    = function (buffer) {
	return {
		address : buffer.readUInt16BE(0);
		value   : (buffer[2] == 0xFF && buffer[3] == 0x00 ? 1 : 0)
	};
};
