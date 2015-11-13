var Helpers = require("../Helpers");

exports.code = 0x2B;

exports.buildRequest = function (code, id) {
	var buffer = new Buffer(3);

	buffer.writeUInt8(0x0E, 0);
	buffer.writeUInt8(code, 1);
	buffer.writeUInt8(id, 2);

	return buffer;
};

exports.parseRequest = function (buffer) {
	return {
		code : buffer.readUInt8(1),
		id   : buffer.readUInt8(2)
	};
};

exports.buildResponse = function (code, conformity, more, objects) {
	var object_len = objects.reduce(function (len, object) {
		return len + 2 + object.value.length;
	}, 0);
	var buffer  = new Buffer(6 + object_len);
	var offset  = 6;
	var next_id = 0;

	buffer.writeUInt8(0x0E, 0);
	buffer.writeUInt8(code, 1);
	buffer.writeUInt8(conformity, 2);
	buffer.writeUInt8(more ? 0xFF : 0x00, 3);
	// index 4 will be in the end
	buffer.writeUInt8(objects.length, 5);

	for (var i = 0; i < objects.length; i++) {
		buffer.writeUInt8(objects[i].id, offset);
		buffer.writeUInt8(objects[i].value.length, offset + 1);

		objects[i].value.copy(buffer, offset + 2);

		offset += 2 + objects[i].value.length;
		next_id = objects[i].id + 1;
	}

	buffer.writeUInt8(more ? next_id : 0x00, 4);

	return buffer;
};

exports.parseResponse = function (buffer) {
	var data = {
		code       : buffer.readUInt8(1),
		conformity : buffer.readUInt8(2),
		more       : !!buffer.readUInt8(3),
		next       : buffer.readUInt8(4),
		objects    : []
	};
	var total  = buffer.readUInt8(5);
	var offset = 6;

	for (var i = 0; i < total; i++) {
		var len = buffer.readUInt8(offset + 1);

		data.objects.push({
			id    : buffer.readUInt8(offset),
			value : buffer.slice(offset + 2, offset + 2 + len)
		});

		offset += 2 + len;
	}

	return data;
};
