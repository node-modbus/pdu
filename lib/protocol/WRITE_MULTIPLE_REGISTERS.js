var Helpers = require("../Helpers");

exports.code = 0x10;

exports.request  = function (start, end, values) {
	var buffer = new Buffer(5 + (values.length * 2));

	buffer.writeUInt16BE(start, 0);
	buffer.writeUInt16BE(end - start + 1, 2);
	buffer.writeUInt8(values.length * 2, 4);

	for (var i = 0; i < values.length; i++) {
		values[i].copy(buffer, 5 + (i * 2), 0, 2);
	}

	return buffer;
};

exports.response = Helpers.startEndAddress;

exports.parse    = function (buffer) {
	return {
		start : buffer.readUInt16BE(0),
		end   : buffer.readUInt16BE(2) + buffer.readUInt16BE(0) - 1
	};
};
