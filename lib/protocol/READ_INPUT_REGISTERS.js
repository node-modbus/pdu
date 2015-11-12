var Helpers = require("../Helpers");

exports.code = 0x04;

exports.request  = Helpers.startEndAddress;
exports.response = Helpers.blocksToBuffer;
exports.parse    = Helpers.bufferToBlocks;
