var Helpers = require("../Helpers");

exports.code = 0x01;

exports.buildRequest = Helpers.buildStartEndAddress;
exports.parseRequest = Helpers.parseStartEndAddress;

exports.buildResponse = Helpers.bitsToBuffer;
exports.parseResponse = Helpers.bufferToBits;
