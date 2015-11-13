var Helpers = require("../Helpers");

exports.code = 0x03;

exports.buildRequest  = Helpers.buildStartEndAddress;

exports.buildResponse = Helpers.blocksToBuffer;
exports.parseResponse = Helpers.bufferToBlocks;
