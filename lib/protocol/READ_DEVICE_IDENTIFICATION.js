var Helpers = require("../Helpers");
var Buff    = require("../Buffer");

const ObjectIds = {
	0 : "VendorName",
	1 : "ProductCode",
	2 : "MajorMinorRevision",
	3 : "VendorUrl",
	4 : "ProductName",
	5 : "ModelName",
	6 : "UserApplicationName"
};

const AccessTypes = {
	1 : "BasicDeviceIdentification",
	2 : "RegularDeviceIdentification",
	3 : "ExtendedDeviceIdentification",
	4 : "SpecificIdentificationObject"
};

exports.code = 0x2B;

exports.buildRequest = function (type, id) {
	var buffer = Buff.alloc(3);

	if (typeof type == "string") {
		for (var k in AccessTypes) {
			if (AccessTypes[k] == type) {
				type = k;
				break;
			}
		}
	}

	if (typeof id == "string") {
		for (var k in ObjectIds) {
			if (ObjectIds[k] == id) {
				id = k;
				break;
			}
		}
	}

	buffer.writeUInt8(0x0E, 0);
	buffer.writeUInt8(type, 1);
	buffer.writeUInt8(id, 2);

	return buffer;
};

exports.parseRequest = function (buffer) {
	if (buffer.length < 3) return null;

	var req = {
		type : buffer.readUInt8(1),
		id   : buffer.readUInt8(2)
	};

	if (AccessTypes.hasOwnProperty(req.type)) {
		req.type = AccessTypes[req.type];
	}

	if (ObjectIds.hasOwnProperty(req.id)) {
		req.id = ObjectIds[req.id];
	}

	return req;
};

exports.buildResponse = function (type, conformity, more, objects) {
	var object_len = objects.reduce(function (len, object) {
		return len + 2 + object.value.length;
	}, 0);
	var buffer  = Buff.alloc(6 + object_len);
	var offset  = 6;
	var next_id = 0;

	if (typeof type == "string") {
		for (var k in AccessTypes) {
			if (AccessTypes[k] == type) {
				type = k;
				break;
			}
		}
	}

	if (typeof conformity == "string") {
		for (var k in AccessTypes) {
			if (AccessTypes[k] == conformity) {
				conformity = k;
				break;
			}
		}
	}

	buffer.writeUInt8(0x0E, 0);
	buffer.writeUInt8(type, 1);
	buffer.writeUInt8(conformity, 2);
	buffer.writeUInt8(more ? 0xFF : 0x00, 3);
	// index 4 will be in the end
	buffer.writeUInt8(objects.length, 5);

	for (var i = 0; i < objects.length; i++) {
		// make a copy, don't change original
		var id = objects[i].id;

		if (typeof id == "string") {
			for (var k in ObjectIds) {
				if (ObjectIds[k] == id) {
					id = k;
					break;
				}
			}
		}
		buffer.writeUInt8(id, offset);
		buffer.writeUInt8(objects[i].value.length, offset + 1);

		objects[i].value.copy(buffer, offset + 2);

		offset += 2 + objects[i].value.length;
		next_id = id + 1;
	}

	buffer.writeUInt8(more ? next_id : 0x00, 4);

	return buffer;
};

exports.parseResponse = function (buffer) {
	if (buffer.length < 6) return null;

	var data = {
		type       : buffer.readUInt8(1),
		conformity : buffer.readUInt8(2),
		more       : !!buffer.readUInt8(3),
		next       : buffer.readUInt8(4),
		objects    : []
	};
	var total  = buffer.readUInt8(5);
	var offset = 6;

	if (AccessTypes.hasOwnProperty(data.type)) {
		data.type = AccessTypes[data.type];
	}

	if (AccessTypes.hasOwnProperty(data.conformity)) {
		data.conformity = AccessTypes[data.conformity];
	}

	for (var i = 0; i < total; i++) {
		var len = buffer.readUInt8(offset + 1);

		data.objects.push({
			id    : buffer.readUInt8(offset),
			value : buffer.slice(offset + 2, offset + 2 + len)
		});

		offset += 2 + len;
	}

	data.objects.map(function (object) {
		if (ObjectIds.hasOwnProperty(object.id)) {
			object.id = ObjectIds[object.id];
		}
	});

	return data;
};
