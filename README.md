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

// <Buffer 01 00 0d 00 08>
console.log(Modbus.ReadCoils.Request.build(13, 20));
// { start: 13, end: 20 }
console.log(Modbus.ReadCoils.Request.parse(new Buffer([ 0x01, 0x00, 0x0d, 0x00, 0x08 ])));

// <Buffer 94 06>
console.log(Modbus.ReadFileRecord.Exception.build(Modbus.Exceptions.SlaveDeviceBusy));
// { code: 'ReadFileRecord', exception: 'SlaveDeviceBusy' }
console.log(Modbus.Exceptions.parse(new Buffer([ 0x94, 0x06 ])));

// can also auto detect function code
// { code: "ReadCoils", start: 13, end: 20 }
console.log(Modbus.Request(new Buffer([ 0x01, 0x00, 0x0d, 0x00, 0x08 ])));
// { code: 'ReadCoils', data: [ 1, 0, 1, 1, 0, 1, 0, 1 ] }
console.log(Modbus.Response(new Buffer([ 0x01, 0x01, 0xad ])));
```

### Function Codes

- `01` ReadCoils
- `02` ReadDiscreteInputs
- `03` ReadHoldingRegisters
- `04` ReadInputRegisters
- `05` WriteSingleCoil
- `06` WriteSingleRegister
- `0F` WriteMultipleCoils
- `10` WriteMultipleRegisters
- `14` ReadFileRecord
- `15` WriteFileRecord
- `16` MaskWriteRegister
- `18` ReadFIFOQueue

### Exceptions

- `01` IllegalFunction
- `02` IllegalDataAddress
- `03` IllegalDataValue
- `04` SlaveDeviceFailure
- `05` SlaveDeviceBusy
- `06` Aknowledge
- `07` NegativeAknowledge
- `08` MemoryParityError
- `0A` GatewayPathUnavailable
- `0B` GatewayTargetDeviceFailedToRespond
