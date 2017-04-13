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
