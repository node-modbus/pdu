## Modbus PDU

[![Build Status](https://secure.travis-ci.org/dresende/node-modbus-pdu.png?branch=master)](http://travis-ci.org/dresende/node-modbus-pdu)
[![](https://badge.fury.io/js/modbus-pdu.svg)](https://npmjs.org/package/modbus-pdu)
[![](https://gemnasium.com/dresende/node-modbus-pdu.png)](https://gemnasium.com/dresende/node-modbus-pdu)

This is a generic module to create all the modbus PDU message types. You should then use another abstraction to TCP, RTU and ASCII.

### Install

```sh
npm i modbus-pdu
```

### Usage

```js
var Modbus = require("modbus-pdu");

console.log(Modbus.readCoils.request.build(13, 20)); // <Buffer 01 00 0d 00 08>
console.log(Modbus.readCoils.request.parse(new Buffer([ 0x01, 0x00, 0x0d, 0x00, 0x08 ]))); // { start: 13, end: 20 }

console.log(Modbus.readFileRecord.exception.build(Modbus.Exceptions.SLAVE_DEVICE_BUSY)); // <Buffer 94 06>
console.log(Modbus.Exceptions.parse(new Buffer([ 0x94, 0x06 ]))); // { code: 'readFileRecord', exception: 'SLAVE_DEVICE_BUSY' }
```

### Function Codes

- `01` READ_COILS
- `02` READ_DISCRETE_INPUTS
- `03` READ_HOLDING_REGISTERS
- `04` READ_INPUT_REGISTERS
- `05` WRITE_SINGLE_COIL
- `06` WRITE_SINGLE_REGISTER
- `0F` WRITE_MULTIPLE_COILS
- `10` WRITE_MULTIPLE_REGISTERS
- `14` READ_FILE_RECORD
- `15` WRITE_FILE_RECORD

### Exceptions

- `01` ILLEGAL_FUNCTION
- `02` ILLEGAL_DATA_ADDRESS
- `03` ILLEGAL_DATA_VALUE
- `04` SLAVE_DEVICE_FAILURE
- `05` ACKNOWLEDGE
- `06` SLAVE_DEVICE_BUSY
- `07` NEGATIVE_ACKNOWLEDGE
- `08` MEMORY_PARITY_ERROR
- `0A` GATEWAY_PATH_UNAVAILABLE
- `0B` GATEWAY_TARGET_DEVICE_FAILED_TO_RESPOND
