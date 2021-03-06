**Folder roles**:
- `entities`: Where we store the things related to business and use for the whole system.[Equivalent Entities Layer In Clean Architecture]
- `src/entrypoints`: where the client call in our app: RESTful, websocket, gRPC, eventListeners... [Equivalent Interface Adapters Layer In Clean Architecture]
- `src/infrastructure` where we write the code using external resource like: database, event bus, sdk, other service... [Equivalent Frameworks and Drivers In Clean Architecture]
- `src/usecases`: Where we write the core application logic.[Equivalent Use Cases Layer In Clean Architecture]
- `src/configuration`: where we reverse the dependency

**Where to initiate the instances**:
- `src/app.js` is point start of program. 

## Based on the ideas and code base of developers:
- [Duy Quach](https://github.com/quachduyy)
- [Phu Nguyen](https://github.com/phunguyen19)
- [Cuong Nguyen](https://github.com/CuongNgMan)
