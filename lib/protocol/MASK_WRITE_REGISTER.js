var Helpers = require("../Helpers");
var Buff    = require("../Buffer");

exports.code = 0x16;

exports.buildRequest = function (address, andmask, ormask) {
	var buffer = Buff.alloc(6);

	buffer.writeUInt16BE(address, 0);

	Helpers.numberToBuffer(andmask).copy(buffer, 2, 0, 2);
	Helpers.numberToBuffer(ormask).copy(buffer, 4, 0, 2);

	return buffer;
};
exports.parseRequest = function (buffer) {
	if (buffer.length < 6) return null;

	return {
		address : buffer.readUInt16BE(0),
		andmask : buffer.slice(2, 4),
		ormask  : buffer.slice(4, 6)
	};
};

exports.buildResponse = exports.buildRequest;
exports.parseResponse = exports.parseRequest;
