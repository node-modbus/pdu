var Helpers = require("../Helpers");

exports.code = 0x16;

exports.buildRequest = function (address, andmask, ormask) {
	var buffer = Buffer.alloc(6);

	buffer.writeUInt16BE(address, 0);
	andmask.copy(buffer, 2, 0, 2);
	ormask.copy(buffer, 4, 0, 2);

	return buffer;
};
exports.parseRequest = function (buffer) {
	return {
		address : buffer.readUInt16BE(0),
		andmask : buffer.slice(2, 4),
		ormask  : buffer.slice(4, 6)
	};
};

exports.buildResponse = exports.buildRequest;
exports.parseResponse = exports.parseRequest;
