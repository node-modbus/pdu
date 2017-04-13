var Helpers = require("../Helpers");
var Buff    = require("../Buffer");

exports.code = 0x0C;

exports.buildRequest = Helpers.buildEmpty;
exports.parseRequest = Helpers.parseEmpty;

exports.buildResponse = function (status, event_count, message_count, events) {
	var buffer = Buff.alloc(events.length + 7);

	buffer.writeUInt8(buffer.length - 1, 0);
	buffer.writeUInt16BE(status, 1);
	buffer.writeUInt16BE(event_count, 3);
	buffer.writeUInt16BE(message_count, 5);

	events.copy(buffer, 7);

	return buffer;
};
exports.parseResponse = function (buffer) {
	if (buffer.length < 7) return null;

	return {
		status        : buffer.readUInt16BE(1),
		event_count   : buffer.readUInt16BE(3),
		message_count : buffer.readUInt16BE(5),
		events        : buffer.slice(7, buffer.readUInt8(0) + 1)
	};
};
