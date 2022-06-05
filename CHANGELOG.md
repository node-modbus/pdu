## 1.14.0 - 5 Jun 2022

- modbus: removes fs dependency to load protocol parts (@PBrunot)
- deps:
  - mocha@10.0.0

## 1.13.1 - 29 Feb 2019

- deps:
  - mocha@6.2.0

## 1.13.0 - 14 Feb 2019

- format:
  - fixes #6
- deps:
  - mocha@5.2.0

## 1.12.0 - 2 Nov 2018

- minor fixes for NodeJS > 8

## 1.11.1 - 9 May 2018

- helpers:
  - adds support to reply directly with a buffer instead of an Array of 2-byte buffers

## 1.11.0 - 27 Jun 2017

- modbus: properly check for a valid object and not null

## 1.10.0 - 26 Jun 2017

- read-coils: fixes not properly throwing when replying to coils with null/undef
- readme: fixes link to stream module

## 1.9.0 - 23 Jun 2017

- fixes function code for read-write-multiple-registers :(

## 1.8.4 - 21 Jun 2017

- helpers:
  - exposes some helpers
  - fixes blocksToBuffer when a block has length < 2
- test:
  - adds check for out of bounds response sizes
  - ensures read-file-record and write-file-record throw when reaching length limits

## 1.8.3 - 8 Jun 2017

- exceptions:
  - adds a helper function .error()
- test:
  - add node v8
- deps:
  - mocha@3.4.2

## 1.8.2 - 19 May 2017

- fixes buffer not being correctly converted to bits

## 1.8.1 - 27 Apr 2017

- read-write-multiple-registers:
  - fixes minimum buffer length required for requests'

## 1.8.0 - 20 Apr 2017

- modbus:
  - do not throw error on unknown function, return object with code and data

## 1.7.0 - 13 Apr 2017

- READ_FIFO_QUEUE:
  - fixes not checking response size
- GET_COMM_EVENT_LOG:
  - fixes minimum response size

## 1.6.0 - 13 Apr 2017

- return null on invalid data instead of throwing

## 1.5.1 - 13 Apr 2017

- buffer:
    - renames Utils to Buffer
- ci:
    - fixes travis file

## 1.5.0 - 13 Apr 2017

- adds support for at least node 0.10

## 1.4.0 - 12 Apr 2017

- modbus:
    - adds a custom package builder
    - do not throw error on unknown function, return object with code and data
- exception:
    - allow one to build an exception specifying fcode and error code
