var Helpers = require("../Helpers");

exports.code = 0x02;

exports.buildRequest  = Helpers.buildStartEndAddress;

exports.buildResponse = Helpers.bitsToBuffer;
exports.parseResponse = Helpers.bufferToBits;
