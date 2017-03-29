var Helpers = require("../Helpers");

exports.code = 0x03;

exports.buildRequest = Helpers.buildAddressQuantity;
exports.parseRequest = Helpers.parseAddressQuantity;

exports.buildResponse = Helpers.blocksToBuffer;
exports.parseResponse = Helpers.bufferToBlocks;
