var Helpers = require("../Helpers");

exports.code = 0x01;

exports.buildRequest  = Helpers.startEndAddress;

exports.buildResponse = Helpers.bitsToBuffer;
exports.parseResponse = Helpers.bufferToBits;
