## Modbus PDU

[![Build Status](https://secure.travis-ci.org/node-modbus/pdu.png?branch=master)](http://travis-ci.org/node-modbus/pdu)
[![](https://badge.fury.io/js/modbus-pdu.svg)](https://npmjs.org/package/modbus-pdu)

This is a generic module to create all the modbus PDU message types. You should then use another abstraction to TCP, RTU and ASCII.

You should not use this directly, use [stream](https://github.com/node-modbus/stream) instead.

### Install

```sh
npm i modbus-pdu
```

### Examples

```js
var Modbus = require("modbus-pdu");

// <Buffer 01 00 0d 00 14>
console.log(Modbus.ReadCoils.Request.build(13, 20));
// { address: 13, quantity: 20 }
console.log(Modbus.ReadCoils.Request.parse(new Buffer([ 0x01, 0x00, 0x0d, 0x00, 0x14 ])));

// <Buffer 94 06>
console.log(Modbus.ReadFileRecord.Exception.build(Modbus.Exception.ServerDeviceBusy));
// { code: 'ReadFileRecord', exception: 'ServerDeviceBusy' }
console.log(Modbus.Exception.parse(new Buffer([ 0x94, 0x06 ])));

// can also auto detect function code
// { code: "ReadCoils", address: 13, quantity: 20 }
console.log(Modbus.Request(new Buffer([ 0x01, 0x00, 0x0d, 0x00, 0x14 ])));
// { code: 'ReadCoils', data: [ 1, 0, 1, 1, 0, 1, 0, 1 ] }
console.log(Modbus.Response(new Buffer([ 0x01, 0x01, 0xad ])));
```

### Function Codes

- `01` ReadCoils(`address`, `quantity`)
- `02` ReadDiscreteInputs(`address`, `quantity`)
- `03` ReadHoldingRegisters(`address`, `quantity`)
- `04` ReadInputRegisters(`address`, `quantity`)
- `05` WriteSingleCoil(`address`, `value`)
- `06` WriteSingleRegister(`address`, `value`)
- `07` ReadExceptionStatus()
- `0B` GetCommEventCounter()
- `0C` GetCommEventLog()
- `0F` WriteMultipleCoils(`address`, `values`) // `values` should be Array of `1`/`0`
- `10` WriteMultipleRegisters(`address`, `values`) // `values` should be Array of 2-size Buffers
- `14` ReadFileRecord(`requests`) // `requests` should be Array of objects with keys `file`, `address` and `length`
- `15` WriteFileRecord(`requests`) // `requests` should be Array of objects with keys `file`, `address` and `values` (Array of 2-size Buffers)
- `16` MaskWriteRegister(`address`, `andmask`, `ormask`)
- `17` ReadWriteMultipleRegisters(`read_address`, `read_quantity`, `write_address`, `values`) // `values` should be Array of 2-size Buffers
- `18` ReadFIFOQueue(`address`)
- `2B/0E` ReadDeviceIdentification(`code`, `id`)

### Exceptions

- `01` IllegalFunction
- `02` IllegalDataAddress
- `03` IllegalDataValue
- `04` ServerDeviceFailure
- `05` Aknowledge
- `06` ServerDeviceBusy
- `08` MemoryParityError
- `0A` GatewayPathUnavailable
- `0B` GatewayTargetDeviceFailedToRespond

You can create an `Error` object with code and message using the following code:

```js
var err = Modbus.Exceptions.error("GatewayPathUnavailable");
console.log(err.code); // 10 (0x0A)
console.log(err.message); // "GatewayPathUnavailable"
```

You can use this error directly when replying to requests using the [stream](https://github.com/node-modbus/stream) module.
