var Helpers = require("../Helpers");

exports.code = 0x01;

exports.request  = Helpers.startEndAddress;
exports.response = Helpers.bitsToBuffer;
exports.parse    = Helpers.bufferToBits;
