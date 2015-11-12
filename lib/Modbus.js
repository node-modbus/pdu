var symlinks = {
	readInputStatus : "readDiscreteInputs"
};

load();

function load() {
	var files = require("fs").readdirSync(__dirname + "/protocol");

	files.map(function (file) {
		if (file.substr(file.length - 3) != ".js") return;

		var funct     = require("./protocol/" + file);
		var camelName = file.substr(0, file.length - 3).toLowerCase().replace(/_(\w)/g, function (m, c) {
			return c.toUpperCase();
		});

		exports[camelName] = {
			code     : funct.code,
			request  : proxy(funct, "request"),
			response : proxy(funct, "response"),
			parse    : funct.parse.bind(funct)
		};
	});

	for (var k in symlinks) {
		if (typeof exports[symlinks[k]] == "object") {
			exports[k] = exports[symlinks[k]];
		}
	}
}

function proxy(funct, method) {
	return function () {
		var stream = funct[method].apply(funct, arguments);
		var buffer = new Buffer(stream.length + 1);

		buffer[0] = funct.code;

		stream.copy(buffer, 1);

		return buffer;
	};
}
