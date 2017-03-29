var Helpers = require("../Helpers");

exports.code = 0x01;

exports.buildRequest = Helpers.buildAddressQuantity;
exports.parseRequest = Helpers.parseAddressQuantity;

exports.buildResponse = Helpers.bitsToBuffer;
exports.parseResponse = Helpers.bufferToBits;
