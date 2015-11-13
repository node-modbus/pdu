var Helpers = require("../Helpers");

exports.code = 0x04;

exports.buildRequest = Helpers.buildStartEndAddress;
exports.parseRequest = Helpers.parseStartEndAddress;

exports.buildResponse = Helpers.blocksToBuffer;
exports.parseResponse = Helpers.bufferToBlocks;
